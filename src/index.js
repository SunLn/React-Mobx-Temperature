import React, { Component } from "react";
import { render } from "react-dom";
import { observer, Provider } from "mobx-react";
import { observable, computed, action, transaction, when } from "mobx";
import Devtools from "mobx-react-devtools";

class Temperature {
  id = Math.random();
  @observable unit = "C";
  @observable temperatureCelsius = 25;
  @observable location = "Amsterdam, NL";
  @observable loading = true;

  constructor(location) {
    this.location = location;
    this.fetch();
  }

  @action
  fetch() {
    window
      .fetch(
        `http://api.openweathermap.org/data/2.5/weather?appid=abcdef
&q=${this.location}`
      )
      .then(res => res.json())
      .then(
        action(json => {
          console.log("sewewewewewewe");
          this.temperatureCelsius = json.main.temp - 273.15;
          this.loading = false;
        })
      )
      .catch(error => {
        console.log("========, failed to get weather");
        this.temperatureCelsius = Math.random() * 1000 - 273.15;
        this.loading = false;
      });
  }
  @computed
  get temperatureKelvin() {
    console.log("calculating temperatureKelvin ++++++++++++++");
    return this.temperatureCelsius * (9 / 5) + 32;
  }
  @computed
  get temperatureFahrenheit() {
    console.log("calculating temperatureFahrenheit ----------------");
    return this.temperatureCelsius + 273.15;
  }
  @computed
  get temperature() {
    console.log("calculating temperature =========");
    switch (this.unit) {
      case "K":
        return this.temperatureKelvin + " K";
      case "F":
        return this.temperatureFahrenheit + " F";
      case "C":
        return this.temperatureCelsius + " C";
    }
  }
  @action
  setCelsius(degrees) {
    this.temperatureCelsius = degrees;
  }

  @action("UPDATE UNIT WARNING")
  setUnit(newUnit) {
    this.unit = newUnit;
  }

  @action
  setTemperatureAndUnit(degrees, unit) {
    this.setUnit(unit);
    this.setCelsius(degrees);
  }

  @action
  inc() {
    this.setCelsius(this.temperatureCelsius + 1);
  }
}
const t = new Temperature("Amsterdam, NL");

const temps = observable([]);

@observer
class TView extends React.Component {
  render() {
    const t = this.props.termperature;
    return (
      <li key={t.id} onClick={() => t.inc()}>
        {t.location} : {t.loading ? "loading..." : t.temperature}
      </li>
    );
  }
}

@observer(["temperatures"])
class TemperatureInput extends React.Component {
  @observable input = "";
  @action
  onChange = e => {
    e.persist();
    this.input = e.target.value;
  };

  @action
  onSubmit = e => {
    e.persist();
    this.props.temperatures.push(new Temperature(this.input));
    this.input = "";
  };

  render() {
    return (
      <li>
        Destination:
        <input onChange={this.onChange} value={this.input} />
        <button onClick={this.onSubmit}> Add </button>
      </li>
    );
  }
}

const App = observer(["temperatures"], ({ temperatures }) => (
  <div>
    <ul>
      <TemperatureInput />
      {temps.map(t => (
        <TView key={t.id} termperature={t} />
      ))}
    </ul>
    <Devtools />
  </div>
));
window.Temperature = Temperature;
window.temps = temps;
window.t = t;

render(
  <Provider temperatures={temps}>
    <App />
  </Provider>,
  document.getElementById("root")
);

function isNice(t) {
  return t.temperatureCelsius > 500;
}

when(
  () => temps.some(isNice),
  () => {
    const t = temps.find(isNice);
    alert("Book now!" + t.location);
  }
);
// transaction(() => {
//   t.unit = "F";
//   t.unit = "C";
// });

// t.unit = "F";
// t.unit = "C";

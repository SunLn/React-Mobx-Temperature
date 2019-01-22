import React, { Component } from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import { observable, computed, action, transaction } from "mobx";
import Devtools from "mobx-react-devtools";

class Temperature {
  @observable unit = "C";
  @observable temperatureCelsius = 25;

  constructor(unit, temperature) {
    this.unit = unit;
    this.temperatureCelsius = temperature;
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
const t = new Temperature("C", 100);
const t1 = new Temperature("K", 100);
const t2 = new Temperature("F", 100);
const temps = observable([]);
temps.push(t);
temps.push(t1);
temps.push(t2);

@observer
class TView extends React.Component {
  render() {
    const t = this.props.termperature;
    return (
      <li key={t.id} onClick={() => t.inc()}>
        {t.temperature}
      </li>
    );
  }
}

const App = observer(({ temperatures }) => (
  <div>
    <ul>
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

render(<App temperatures={temps} />, document.getElementById("root"));

// transaction(() => {
//   t.unit = "F";
//   t.unit = "C";
// });

// t.unit = "F";
// t.unit = "C";

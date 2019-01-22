import React, { Component } from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import { observable, computed, asMap } from "mobx";
import Devtools from "mobx-react-devtools";

class Temperature {
  @observable unit = "C";
  @observable temperatureCelsius = 25;
  @computed
  get temperatureKelvin() {
    console.log("calculating temperatureKelvin ++++++++++++++");
    return this.temperatureCelsius * (9 / 5) + 32;
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
  @computed
  get temperatureFahrenheit() {
    console.log("calculating temperatureFahrenheit ----------------");
    return this.temperatureCelsius + 273.15;
  }
}
const t = new Temperature();

const temps = observable([]);
temps.push(t);

const App = observer(({ temperatures }) => (
  <div>
    <div>
      {temps.map(t => (
        <div key={Math.random()}>{t.temperature}</div>
      ))}
    </div>
    <Devtools />
  </div>
));
window.Temperature = Temperature;
window.temps = temps;

render(<App temperatures={temps} />, document.getElementById("root"));

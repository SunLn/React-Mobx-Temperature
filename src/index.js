import React, { Component } from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
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

const App = observer(({ temperature }) => (
  <div>
    <div>{temperature.temperature}</div>
    <Devtools />
  </div>
));

window.t = t;

render(<App temperature={t} />, document.getElementById("root"));

console.log("=========");

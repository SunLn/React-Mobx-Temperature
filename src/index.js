import React, { Component } from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
import Devtools from "mobx-react-devtools";

const t = observable({
  unit: "C",
  temperatureCelsius: 25,
  temperatureKelvin: function() {
    console.log("calculating temperatureKelvin ++++++++++++++");
    return this.temperatureCelsius * (9 / 5) + 32;
  },
  temperature: function() {
    console.log("calculating temperature =========");
    switch (this.unit) {
      case "K":
        return this.temperatureKelvin() + " K";
      case "F":
        return this.temperatureFahrenheit() + " F";
      case "C":
        return this.temperatureCelsius + " C";
    }
  },
  temperatureFahrenheit: function() {
    console.log("calculating temperatureFahrenheit ----------------");
    return this.temperatureCelsius + 273.15;
  }
});

const App = observer(({ temperature }) => (
  <div>
    <div>{temperature.temperature()}</div>
    <Devtools />
  </div>
));

window.t = t;

render(<App temperature={t} />, document.getElementById("root"));

console.log("=========");

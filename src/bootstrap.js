import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { loadPreferences, applyPreferences } from "./utils/accessibility";

import "./style/main.scss";

// Aplico las preferencias de accesibilidad antes de pintar nada
applyPreferences(loadPreferences());

function main() {
  ReactDOM.render(
    <App />,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);

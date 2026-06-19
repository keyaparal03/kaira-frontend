import React from "react";

import { createRoot } from "react-dom/client";

import App from "./app/App";

import "./styles/main.scss";

import { Provider } from "react-redux";

import { store } from "./redux/store/store";

import {
  ThemeProvider
} from "./context/ThemeContext";

import "./i18n";

const root = createRoot(
  document.getElementById(
    "root"
  )!
);


root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
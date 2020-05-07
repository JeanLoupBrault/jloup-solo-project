import React from "react";
import ReactDOM, { render } from "react-dom";
import { Provider } from "react-redux";
import AppProvider from './AuthenticationFe/AppContext';
import configureStore from "./store";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <AppProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AppProvider>,
  document.getElementById("root")
);

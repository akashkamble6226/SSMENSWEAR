import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import messages from "../src/messages/home.json";
import { ConfigProvider } from "antd";
import marathiLocale from "./localization/mr_IN";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <ConfigProvider locale={ml_IN}> */}
    <IntlProvider locale="mr" messages={messages}>
      <App />
    </IntlProvider>
    {/* </ConfigProvider> */}
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

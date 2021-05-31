import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from "react-intl";
import localesEsMessages from "./locales/es";
import localesEnMessages from "./locales/en";

const getBrowserLang = () => {
  return navigator.language || navigator.userLanguage;
};

const getLocales = () => {
  return getBrowserLang().includes("en")
    ? localesEnMessages
    : localesEsMessages;
};


ReactDOM.render(
  <IntlProvider locale={getBrowserLang()} messages={getLocales()}>
    <App />
  </IntlProvider>,
  document.querySelector("#root")
);



reportWebVitals();


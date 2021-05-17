import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './routers';
import reportWebVitals from './reportWebVitals';
import { configureLocalStateStore } from './store';

const app = async () => {
  const store = await configureLocalStateStore();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>{App()}</Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );

  reportWebVitals();
};

app();

import React from 'react';
import firebaseApp from "./firebase/config";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { AppAlertProvider } from './contexts/alertContext';
const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppAlertProvider>
        <App />
      </AppAlertProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

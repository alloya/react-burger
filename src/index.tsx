import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { socketMiddleware } from './services/websocket/socketMiddleware';
import { wsActions } from './services/actions/websocket';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions))));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  //<React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

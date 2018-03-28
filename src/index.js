import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import reducers from './reducers';
import App from './containers/app';
import './style/main.scss';

let middleware = [promise];
let store;

if (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  store = createStore(reducers, {}, enhancer);
} else {
	store = createStore(reducers, {}, applyMiddleware(...middleware));
}

const Index = () => (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>
);

render(<Index />, document.getElementById('app'));

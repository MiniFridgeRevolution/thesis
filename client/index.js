import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './Components/routes';

//redux experiment
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';
// import App from './Components/App';

const middleware = applyMiddleware(logger());

let store = createStore(reducers, middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('app'));
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'; // to avoid importing the whole bundle

// const persistedState = {
//   todos: [{
//     id: '0',
//     text: 'Welcome back!',
//     completed: false,
//   }],
// }

const persistedState = loadState();

const store = createStore(
  todoApp,
  persistedState
);

// throttle comes from lodash, avoids subscribe from being called more than once a second
store.subscribe(throttle(()=>{
  saveState({
    todos: store.getState().todos
  });
}, 1000));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


import { v4 } from 'node-uuid';
import {getIsFetching } from '../reducers';
import * as api from '../api';

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

// called a thunk
export const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetching(getState(), filter)){ // recall: getisfetching is a selector
    return;
  }

  dispatch(requestTodos(filter)); // dispatch becomes store.dispatch because of middleware
  
  return api.fetchTodos(filter).then(response => { 
    dispatch(receiveTodos(filter, response));
  });
};

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),
    // id: (nextTodoId++).toString(),
    text,
  };
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};

// export const setVisibilityFilter = (filter) => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter,
//   };
// };


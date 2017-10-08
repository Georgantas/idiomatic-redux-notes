
import { v4 } from 'node-uuid';
import {getIsFetching } from '../reducers';
import * as api from '../api';

// const requestTodos = (filter) => ();

// const receiveTodos = (filter, response) => ();

// called a thunk
export const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetching(getState(), filter)){ // recall: getisfetching is a selector
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  }); // dispatch becomes store.dispatch because of middleware
  
  return api.fetchTodos(filter).then(response => { 
    dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response,
    });
  }, error => {
    dispatch({
      type: 'FETCH_TODOS_FAILURE',
      filter,
      message: error.message || "Something went wrong."
    })
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


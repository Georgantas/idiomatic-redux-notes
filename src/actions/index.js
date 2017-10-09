
import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../reducers';
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
    // console.log('normalized response', normalize(response, schema.arrayOfTodos));
    dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      filter,
      response: normalize(response, schema.arrayOfTodos),
    });
  }, error => {
    dispatch({
      type: 'FETCH_TODOS_FAILURE',
      filter,
      message: error.message || "Something went wrong."
    })
  });
};

export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {
    // console.log('normalized response', normalize(response, schema.todo))
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    })
  })

export const toggleTodo = (id) => (dispatch) => {
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  })
}

  //   return {
//     type: 'TOGGLE_TODO',
//     id,
//   };
// };

// export const setVisibilityFilter = (filter) => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter,
//   };
// };


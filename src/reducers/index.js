

import {combineReducers} from 'redux';
// import todo from './todo';
import byId, * as fromById from './byId'
import createList, * as fromList from './createList'

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({
  byId,
  // allIds,
  listByFilter
})

export default todos;

// selectors

// const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));

  // no longer filtering on client
  // const allTodos = getAllTodos(state);
  // switch (filter) {
  //   case 'all':
  //     return allTodos;
  //   case 'completed':
  //     return allTodos.filter(t => t.completed);
  //   case 'active':
  //     return allTodos.filter(t => !t.completed);
  //   default:
  //     throw new Error(`Unknown filter: ${filter}.`);
  // }

};

export const getIsFetching = (state, filter) => fromList.getIsFetching(state.listByFilter[filter])

export const getErrorMessage = (state, filter) => fromList.getErrorMessage(state.listByFilter[filter])


import {combineReducers} from 'redux';
// import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.response.forEach( todo => {
        nextState[todo.id] = todo; // stays pure
      });
      return nextState;
    // case 'ADD_TODO':
    // case 'TOGGLE_TODO':
    //   return {
    //     ...state,
    //     [action.id]: todo(state[action.id], action),
    //   }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if( action.filter !== 'all'){
    return state;
  }
  switch(action.type){
    // case 'ADD_TODO':
    //   return [...state, action.id];
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
}

const activeIds = (state = [], action) => {
  if(action.filter !== 'active'){ // will only update when active is selected
    return state;
  }
  switch(action.type){
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
}

const completedIds = (state = [], action) => {
  if(action.filter !== 'completed'){ // will only update when active is selected
    return state;
  }
  switch(action.type){
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id); // prefiltered by server
    default:
      return state;
  }
}

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
})

const todos = combineReducers({
  byId,
  // allIds,
  idsByFilter
})

export default todos;

// selectors

// const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
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
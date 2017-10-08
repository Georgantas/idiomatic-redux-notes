

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

  export default byId;

  export const getTodo = (state, id) => state[id];
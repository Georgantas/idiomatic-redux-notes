import { createStore, applyMiddleware } from 'redux';
// import throttle from 'lodash/throttle'; // to avoid importing the whole bundle
// import promise from 'redux-promise';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import todoApp from './reducers';
// import { loadState, saveState } from './localStorage'

// const logger = (store) => {
//     return (next) => {
//         if(!console.group){
//             return next;
//         }
//         return (action) => {
//             console.group(action.type);
//             console.log('%c prev state', 'color: gray', store.getState());
//             console.log('%c action', 'color: blue', action);
//             const returnValue = next(action);
//             console.log('%c next state', 'color: green',store.getState());
//             console.groupEnd(action.type);
//             return returnValue;
//         }
//     }
// }

// const promise = (store) => {
//     return (next) => {
//         return (action) => {
//             if(typeof action.then === 'function'){ //is a Promise
//                 return action.then(next);
//             }
//             return next(action);
//         };
//     };
// };


// const thunk = (store) => (next) => (action) =>
//     typeof action === 'function' ?
//         action(store.dispatch, store.getState) :
//         next(action);

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//     middlewares.slice().reverse().forEach(middleware =>
//         store.dispatch = middleware(store)(store.dispatch)
//     )
// }

const configureStore = () => {
    
    // const persistedState = {
    //   todos: [{
    //     id: '0',
    //     text: 'Welcome back!',
    //     completed: false,
    //   }],
    // }

    // const persistedState = loadState();
    
    const middlewares = [thunk];
    //const middlewares = [promise];
    
    if(process.env.NODE_ENV !== 'production'){
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        //persistedState
        applyMiddleware(...middlewares) // persisted state is skipped
    );    

    // throttle comes from lodash, avoids subscribe from being called more than once a second
    // store.subscribe(throttle(()=>{
    // saveState({
    //     todos: store.getState().todos
    // });
    // }, 1000));

}

export default configureStore;
import {createStore, applyMiddleware} from 'redux';
// import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';

import promiseMiddleware from './middleware/promiseMiddleware'

// let store = createStore(combineReducers);

/* 引入thunkMiddleware中间件 */
// let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

/* 引入promiseMiddleware中间件 */
let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

export default store;
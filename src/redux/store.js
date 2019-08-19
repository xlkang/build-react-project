import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';

// let store = createStore(combineReducers);

/* 引入thunkMiddleware中间件 */
let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

export default store;
import {combineReducers} from "redux";

import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';

/*
*自己实现的combineReducers方法
*export default function combineReducers(state = {}, action) {
*	return {
*		counter: counter(state.counter, action),
*		userInfo: userInfo(state.userInfo, action)
*	}
*}
*/
/* redux提供的combineReducers方法 */
export default combineReducers({
	counter,
	userInfo
});
/*
*当前文件夹执行命令：
*webpack testRedux.js build.js
*node build.js
*
*输出了state变化：
*
*{ counter: { count: 0 } }
*{ counter: { count: 1 } }
*{ counter: { count: 0 } }
*{ counter: { count: 0 } }
*
*做这个测试，就是为了说明，redux和react没关系，虽说他俩能合作。
*/

import {increment, decrement, reset} from 'actions/counter';

import store from './store';

// 打印初始状态
console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

// 发起一系列 action
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

// 停止监听 state 更新
unsubscribe();
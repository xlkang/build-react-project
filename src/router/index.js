import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound';
import Loading from 'components/Loading';

/* 柯里化 createComponent(Home)相当于 (props)=>() : 2个连续箭头函数柯里化了1次 */
const createComponent = (component) => (props) => (
	<Bundle load={component}>
		{
			(Component) => Component ? <Component {...props} /> : <Loading/>
		}
	</Bundle>
);

const getRouter = () => (
	<Switch>
		<Route exact path="/" component={createComponent(Home)}/>
		<Route path="/page1" component={createComponent(Page1)}/>
		<Route path="/counter" component={createComponent(Counter)}/>
		<Route path="/userinfo" component={createComponent(UserInfo)}/>
		<Route component={createComponent(NotFound)}/>
	</Switch>
);

export default getRouter;
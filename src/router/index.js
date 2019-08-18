import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from 'pages/Home';
import Page1 from 'pages/Page1';
import Counter from 'pages/Counter';


const getRouter = () => (
	<Router>
		<div>
			<ul>
				<li><Link to="/">首页</Link></li>
				<li><Link to="/page1">Page1</Link></li>
				<li><Link to="/counter">Counter</Link></li>
			</ul>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/page1" component={Page1}/>
				<Route path="/counter" component={Counter}/>
			</Switch>
		</div>
	</Router>
);

export default getRouter;
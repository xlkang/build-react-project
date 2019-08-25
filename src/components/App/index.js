import React, {Component} from 'react';

import Nav from 'components/Nav';
import getRouter from 'router';

export default class App extends Component {
	render() {
		return (
			<div>
				<Nav/>
				{getRouter()}
			</div>
		)
	}
}
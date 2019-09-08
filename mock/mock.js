// import Mock from 'mockjs';
 
// let Random = Mock.Random;
 
// Mock.mock('/api/user', {
// 'name': '@cname',
// 'intro': '@word(20)'
// });

let Mock = require('mockjs');

var Random = Mock.Random;

module.exports = function () {
	var data = {};
	data.user = {
		'name': Random.cname(),
		'intro': Random.word(20)
	};
	return data;
};
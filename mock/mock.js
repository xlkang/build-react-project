// import Mock from 'mockjs';
 
// let Random = Mock.Random;
 
// Mock.mock('/api/user', {
// 'name': '@cname',
// 'intro': '@word(20)'
// });

const Mock = require('mockjs');
const { Random } = Mock;

/** 
 * 使用json-server以后，只用mockjs产生数据
 */
module.exports = function () {
	let data = {};

	data.user =  Mock.mock({
		'name': '@cname',
		'intro': '@word(20)'
	});

	// var data = Mock.mock({
  //   'course|227': [
  //     {
  //       // 属性 id 是一个自增数，起始值为 1，每次增 1
  //       'id|+1': 1000,
  //       course_name: '@ctitle(5,10)',
  //       autor: '@cname',
  //       college: '@ctitle(6)',
  //       'category_Id|1-6': 1
  //     }
  //   ],
  //   'course_category|6': [
  //     {
  //       "id|+1": 1,
  //       "pid": -1,
  //       cName: '@ctitle(4)'
  //     }
  //   ]
  // });
	
	return data;
};
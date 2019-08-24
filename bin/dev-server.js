'use strict'

const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.dev.config');
const webpack = require('webpack');
const path = require('path');
const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
	contentBase: path.resolve(__dirname, '../dist'), //默认会以根文件夹提供本地服务器，这里指定文件夹
	historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
	port: 8081, //如果省略，默认8080
	publicPath: "/",
	// hot: true,  // 通过命令行--hot替代
	/* 代理配置
	* proxy: {
	* 	"/api": "http://localhost:3000"
	* }
	*/
});

server.listen(8081, 'localhost', function (err) {
	if (err) throw err
})
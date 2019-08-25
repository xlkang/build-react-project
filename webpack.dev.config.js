const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config.js');
const webpack = require('webpack');

const devConfig = {
	mode: 'development', // 'production' | 'development' | 'none'
	devtool: 'inline-source-map',
	entry: {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, 'src/index.js')
		]
	},
	output: {
		/*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
		filename: '[name].[hash].js'
	},
	module: {
		/* 
		* css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能 
		* style-loader将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
		*/
		// rules: [{
		// 	test: /\.css$/,
		// 	use: ["style-loader", "css-loader"]
		// }]
	},
	devServer: {
		port: 8081,
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true,
		host: '0.0.0.0',
	}
	/*
	* 模块热替换：通过命令行 --hot代替
	* plugins:[
	*   new webpack.HotModuleReplacementPlugin()
	* ]
	*/
};

module.exports = merge({
	customizeArray(a, b, key) {
			/*entry.app不合并，全替换*/
			if (key === 'entry.app') {
					return b;
			}
			return undefined;
	}
})(commonConfig, devConfig);
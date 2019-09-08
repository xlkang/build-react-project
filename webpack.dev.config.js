const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

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
		rules: [{
			test: /\.css$/,
			use: [
				"style-loader", 
				// "css-loader?modules&localIdentName=[local]-[hash:base64:5]", 
				/* css-loader 3支持option配置，移除了localIdentName配置项，替换为localConvention */
				{
					loader: 'css-loader', 
					options: { 
						sourceMap: true, 
						importLoaders: 2, 
						localsConvention: 'camelCase',
						// localIdentName: '[name]__[local]___[hash:base64:5]', 
						modules: true
					}
				},
				"postcss-loader"
			]
		}]
	},
	devServer: {
		proxy: {
			/** API请求，代理到json-server服务器:8090,端口配置在命令行参数中 */
			"/api/*": "http://localhost:8090/$1"
		},
		port: 8081,
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true,
		host: '0.0.0.0',
	},
	/*
	* 模块热替换：通过命令行 --hot代替
	* plugins:[
	*   new webpack.HotModuleReplacementPlugin()
	* ]
	*/
	/** 使用json-server替代mock.js */
	// plugins:[
	// 	new webpack.DefinePlugin({
	// 		MOCK: true
	// 	})
	// ]
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
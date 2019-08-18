const path = require('path');
const webpack = require('webpack');

module.exports = {
    /*入口*/
    entry: [
			'react-hot-loader/patch',
			path.join(__dirname, 'src/index.js')
		],
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
			path: path.join(__dirname, './dist'),
			filename: 'bundle.js'
		},
		devServer: {
			port: 8081,
			contentBase: path.join(__dirname, './dist'),
			historyApiFallback: true,
			host: '0.0.0.0'
		},
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader?cacheDirectory=true', // 提出.babelrc配置文件
					include: path.join(__dirname, 'src')
				}
			]
		},
		resolve: {
			alias: {
				pages: path.join(__dirname, 'src/pages'),
				component: path.join(__dirname, 'src/component'),
				router: path.join(__dirname, 'src/router'),
				actions: path.join(__dirname, 'src/redux/actions'),
				reducers: path.join(__dirname, 'src/redux/reducers'),
				// redux: path.join(__dirname, 'src/redux')
			}
		}
		/*
		* 模块热替换：通过命令行 --hot代替
		* plugins:[
		*   new webpack.HotModuleReplacementPlugin()
		* ]
		*/
};
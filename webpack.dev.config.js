const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    /*入口*/
    entry: [
			'react-hot-loader/patch',
			path.join(__dirname, 'src/index.js')
		],
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
			path: path.join(__dirname, './dist'),
			// filename: 'bundle.js',
			filename: '[name].[hash].js',   // 使用chunkhash或者contenthash时与webpact-dev-server --hot冲突报错，见 https://github.com/webpack/webpack-dev-server/issues/377
			chunkFilename: '[name].[chunkhash].js', // 不配置默认是[name].[filename]了,chunkhash每次打包生成不同hash值文件名防止缓存
		},
		/*
		*	webpack4的作法，废弃了webpack.optimize.CommonsChunkPlugin
		* 分离runtime文件和mode_modules中的vendor
		*/
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
			  cacheGroups: {
			    vendor: {
			      test: /[\\/]node_modules[\\/]/,
			      name: 'vendors',
			      chunks: 'all'
		      }
		    }
			}
		},
		devtool: 'inline-source-map',
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
				},
				/*  
				* css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能 
				* style-loader将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
				*/
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				/*
				* 编译图片
				*/
				{
					test: /\.(png|jpg|gif)$/,
					use: [{
						loader: 'url-loader',
						options: {
							limit: 8192 // options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
						}
					}]
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
		},
		/*
		* 模块热替换：通过命令行 --hot代替
		* plugins:[
		*   new webpack.HotModuleReplacementPlugin()
		* ]
		*/
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: path.join(__dirname, 'src/index.html')
			}),
		],
};
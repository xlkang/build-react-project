const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

commonConfig = {
	entry: {
		app: [
			path.join(__dirname, 'src/index.js')
		],
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: "/"
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
		},
	},
	module: {
		 /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
		rules: [{
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192 // options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
				}
			}]
		}, 
		// {
		// 	test: /\.css$/,
		// 	use: ["style-loader", "css-loader"]
		// }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html')
		}),
	],
	resolve: {
		alias: {
			pages: path.join(__dirname, 'src/pages'),
			components: path.join(__dirname, 'src/components'),
			router: path.join(__dirname, 'src/router'),
			actions: path.join(__dirname, 'src/redux/actions'),
			reducers: path.join(__dirname, 'src/redux/reducers')
		}
	}
};

module.exports = commonConfig;
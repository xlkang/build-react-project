const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩
// const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离CSS
const webpack = require('webpack');

module.exports = {
	mode: 'production', // 'production' | 'development' | 'none'
	devtool: 'cheap-module-source-map',
	entry: {
		app: [
			path.join(__dirname, 'src/index.js')
		],
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath : '/'
	},
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
		moduleIds: 'hashed',
		minimizer: [
			// js mini
			new UglifyJSPlugin({
				cache: true,
				parallel: true,
				sourceMap: false // set to true if you want JS source maps
			}),
			// css mini
			new OptimizeCSSPlugin({})
		]
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({  // 自动把js等注入html
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html')
		}),
		new UglifyJSPlugin(),  // 压缩文件
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.HashedModuleIdsPlugin({
			hashFunction: 'sha256',
			hashDigest: 'hex',
			hashDigestLength: 20
		}),
		new CleanWebpackPlugin(),   // 自动清理dist目录
	],
	resolve: {
		alias: {
			pages: path.join(__dirname, 'src/pages'),
			component: path.join(__dirname, 'src/component'),
			router: path.join(__dirname, 'src/router'),
			actions: path.join(__dirname, 'src/redux/actions'),
			reducers: path.join(__dirname, 'src/redux/reducers')
		}
	}
};
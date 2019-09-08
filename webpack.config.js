const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩
// const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离CSS
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	optimization: {
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
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					// "css-loader?modules&localIdentName=[local]-[hash:base64:5]", 
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
			})
		}]
	},
	plugins: [
		new CleanWebpackPlugin({
			// 在Webpack编译之前删除文件一次
			cleanOnceBeforeBuildPatterns: ['**/*', '!api', '!api/*.*'],
			// 在每次构建（包括监视模式）后删除与此模式匹配的文件。
			// cleanAfterEveryBuildPatterns: ['*.*', '!api'],
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	]
};

module.exports = merge(commonConfig, publicConfig);
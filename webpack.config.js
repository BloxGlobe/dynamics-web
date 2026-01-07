const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
	const isProd = argv && argv.mode === 'production';

	return {
		mode: isProd ? 'production' : 'development',
		entry: path.resolve(__dirname, 'src', 'main.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
			clean: true,
			assetModuleFilename: 'images/[hash][ext][query]'
		},
		devtool: isProd ? 'source-map' : 'eval-source-map',
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					type: 'asset/resource'
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'index.html'),
				inject: 'body'
			})
		],
		resolve: {
			extensions: ['.js', '.json']
		},
		devServer: {
			static: {
				directory: path.resolve(__dirname, 'dist')
			},
			port: 3000,
			open: true,
			hot: true,
			compress: true
		},
		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		}
	};
};


const path = require('path')
const fs = require('fs')

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

global.PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
}

module.exports = {
	externals: {
		paths: PATHS,
		jquery: 'jQuery'
	},
	devtool: 'source-map',
	resolve: {
		fallback: {
			"fs": false,
			"tls": false,
			"net": false,
			"path": false,
			"zlib": false,
			"http": false,
			"https": false,
			"stream": false,
			"crypto": false,
			"crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
		}
	},
	entry: {
		index: PATHS.src + '/js/index.js',
		module: PATHS.src + '/js/module.js',
		// app: PATHS.src + '/js/app.js',
	},
	output: {
		path: PATHS.dist,
		filename: '[name].js',
	},
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	},
	plugins: [
		new NodePolyfillPlugin()
	]
};

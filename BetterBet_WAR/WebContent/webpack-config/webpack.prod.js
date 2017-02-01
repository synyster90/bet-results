var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var root = require('./helpers').root;

module.exports = {
	devtool : 'cheap-module-source-map',

	output : {
		path : root('dist'),
		publicPath : '',
		filename : '[name].[hash].js',
		chunkFilename : '[id].[hash].chunk.js'
	},

	plugins : [ new webpack.optimize.UglifyJsPlugin({
		compress : {
			warnings : false
		},
		output : {
			comments : false
		}
	}), new ExtractTextPlugin('style.[hash].css'), new ForkCheckerPlugin() ]
}
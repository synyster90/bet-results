var ExtractTextPlugin = require('extract-text-webpack-plugin');
var root = require('./helpers').root;

module.exports = {
	devtool : 'cheap-module-source-map',

	output : {
		path : root('dist'),
		publicPath : '',
		filename : '[name].js',
		chunkFilename : '[id].chunk.js'
	},

	plugins : [ new ExtractTextPlugin('style.css') ]
}
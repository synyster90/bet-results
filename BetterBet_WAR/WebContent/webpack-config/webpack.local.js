var ExtractTextPlugin = require('extract-text-webpack-plugin');
var root = require('./helpers').root;

module.exports = {
	devtool : 'cheap-module-source-map',

	output : {
		path : root('dist'),
		publicPath : 'http://localhost:8080/dist/',
		filename : '[name].js',
		chunkFilename : '[id].chunk.js'
	},

	plugins : [ new ExtractTextPlugin('style.css') ],

	devServer : {
		historyApiFallback : true,
		stats : 'minimal'
	}
}
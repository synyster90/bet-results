var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var JspWebpackPlugin = require('./webpack.jsp-plugin')

var root = require('./helpers').root;

var advancedConfig = require(process.argv.indexOf('-p') > -1 ? './webpack.prod.js' : './webpack.dev.js');
var ENV = process.env.NODE_ENV = process.env.ENV = process.argv.indexOf('-p') > -1 ? 'production' : 'develop';

module.exports = webpackMerge(advancedConfig, {
    entry : {
        'polyfills' : './app/polyfills.ts',
        'vendor' : './app/vendor.ts',
        'app' : './app/main.ts'
    },

    resolve : {
        alias : {
	        jquery : "jquery/src/jquery"
        },
        extensions : [
                '.js', '.ts'
        ]
    },

    module : {
    	rules : [
            {
                test : /\.ts$/,
                loader : 'awesome-typescript-loader'
            }, {
                test : /\.html$/,
                loader : 'html-loader?minimize=false'
            }, {
                test : /\.json$/,
                loader : 'json-loader'
            }, {
                test : /\.css$/,
                loader : ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            }, {
                test : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                exclude : root('node_modules'),
                loader : 'file-loader?name=assets/[path][name].[ext]&context=app/assets/'
            }, {
                test : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                include : root('node_modules'),
                loader : 'file-loader?name=assets/[path][name].[ext]&context=node_modules/'
            }, {
                test : /\\CVS\\/,
                loader : 'null-loader'
            }
	    ]
    },

    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : [
            	'app', 'vendor', 'polyfills'
            ]
        }), 
        new webpack.BannerPlugin({
        	banner: 'CSE Web Application',
        	raw : false,
            entryOnly : false
        }), 
        new webpack.ProvidePlugin({
            "$" : "jquery",
            "jQuery" : "jquery",
            "moment" : "moment",
            "CodeMirror" : "codemirror"
        }),
        new webpack.DefinePlugin({
            'process.env' : {
	            'ENV' : JSON.stringify(ENV)
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([{
			from: root('app', 'assets', 'i18n'),
			to: 'assets/i18n'
        }]),
        new JspWebpackPlugin({
        	pages: [
        		{
	                path : './index.html',
	            }
	        ],
        	scriptOrder: [
            	'polyfills', 'vendor', 'app'
            ]
        })
    ]
})
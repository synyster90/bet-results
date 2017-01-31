var fs = require('fs'), options = [], pages = [], chunks = []

// var Log = require('log'), log = new Log('debug', fs.createWriteStream('jspplugin.log'));

function JspWebpackPlugin(initOptions) {
	options = initOptions
}

function cleanOutputPath(assetDir) {
	if (fs.existsSync(assetDir) && fs.lstatSync(assetDir).isDirectory())
		fs.readdirSync(assetDir).forEach(function(file, index) {
			var assetPath = assetDir + "/" + file;
			if (!fs.lstatSync(assetPath).isDirectory())
				fs.unlinkSync(assetPath);
		});
}

function insertStyle(asset) {
	setImport('Style', '\t<link rel="stylesheet" href="' + asset + '">\r\n')
}

function insertChunks() {
	for (var i = 0; i < options.scriptOrder.length; i++)
		for (var j = 0; j < chunks.length; j++)
			if (new RegExp(options.scriptOrder[i] + '\.(.*)js$').test(chunks[j]))
				setImport('Script', '\t<script type="text/javascript" src="' + chunks[j] + '"></script>\r\n')
}

function setImport(type, asset) {
	var content = ''
	if (type == 'Style')
		content = '\t<link rel="stylesheet" href="' + asset + '">\r\n'
	else
		content = '\t<script type="text/javascript" src="' + asset + '"></script>\r\n'

	for (var j = 0; j < pages.length; j++) {
		// Insert new import
		if (pages[j].content.indexOf('\t<!-- JspWebpackPlugin ' + type + ': end -->') > -1)
			pages[j].content = pages[j].content.substr(0, pages[j].content.indexOf('\t<!-- JspWebpackPlugin ' + type + ': end -->')) + content
			        + pages[j].content.substr(pages[j].content.indexOf('\t<!-- JspWebpackPlugin ' + type + ': end -->'))
	}
}

function setImport(type, content) {
	for (var j = 0; j < pages.length; j++) {
		// Insert new import
		if (pages[j].content.indexOf('\t<!-- JspWebpackPlugin ' + type + ': end -->') > -1)
			pages[j].content = pages[j].content.substr(0, pages[j].content.indexOf('\t<!-- JspWebpackPlugin ' + type + ': end -->')) + content
			        + pages[j].content.substr(pages[j].content.indexOf('\t<!-- JspWebpackPlugin ' + type + ': end -->'))
	}
}

JspWebpackPlugin.prototype.apply = function(compiler) {
	compiler.plugin("compile", function(params) {
		for (var i = 0; i < options.pages.length; i++) {
			var data = fs.readFileSync(options.pages[i].path, "utf8")
			// Remove prev import
			if (data.indexOf('\t<!-- JspWebpackPlugin Style: start -->') == -1)
				data = data.substr(0, data.indexOf('</head>')) + '\t<!-- JspWebpackPlugin Style: start -->\r\n' + data.substr(data.indexOf('</head>'))

			if (data.indexOf('\t<!-- JspWebpackPlugin Style: end -->') == -1)
				data = data.substr(0, data.indexOf('</head>')) + '\t<!-- JspWebpackPlugin Style: end -->\r\n' + data.substr(data.indexOf('</head>'))

			data = data.substr(0, data.indexOf('\t<!-- JspWebpackPlugin Style: start -->\r\n')) + '\t<!-- JspWebpackPlugin Style: start -->\r\n'
			        + data.substr(data.indexOf('\t<!-- JspWebpackPlugin Style: end -->\r\n'))

			if (!options.pages[i].noScript) {
				if (data.indexOf('\t<!-- JspWebpackPlugin Script: start -->') == -1)
					data = data.substr(0, data.indexOf('</body>')) + '\t<!-- JspWebpackPlugin Script: start -->\r\n' + data.substr(data.indexOf('</body>'))

				if (data.indexOf('\t<!-- JspWebpackPlugin Script: end -->') == -1)
					data = data.substr(0, data.indexOf('</body>')) + '\t<!-- JspWebpackPlugin Script: end -->\r\n' + data.substr(data.indexOf('</body>'))

				data = data.substr(0, data.indexOf('\t<!-- JspWebpackPlugin Script: start -->\r\n')) + '\t<!-- JspWebpackPlugin Script: start -->\r\n'
				        + data.substr(data.indexOf('\t<!-- JspWebpackPlugin Script: end -->\r\n'))
			}
			pages.push({
			    page : options.pages[i],
			    content : data
			})
		}
	});

	compiler.plugin("emit", function(compilation, callback) {
		var relativeOutputPath = compilation.options.output.path.replace(compilation.options.context + '\\', '')
		if(relativeOutputPath == '')
			relativeOutputPath = '.';

		cleanOutputPath(relativeOutputPath)
		chunks = []

		for (var i = 0; i < Object.keys(compilation.assets).length; i++) {
			var currentAsset = relativeOutputPath + '/' + Object.keys(compilation.assets)[i]

			if (new RegExp('\.css$').test(currentAsset))
				insertStyle(currentAsset)
			else if (new RegExp('\.js$').test(currentAsset))
				chunks.push(currentAsset)
		}
		insertChunks()
		for (var j = 0; j < pages.length; j++)
			fs.writeFileSync(pages[j].page.path, pages[j].content);
		callback();
	});
};

module.exports = JspWebpackPlugin;
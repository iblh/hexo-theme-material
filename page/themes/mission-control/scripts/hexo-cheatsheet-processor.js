//https://github.com/hgcummings/hexo-processor-types
var Promise = require('hexo/node_modules/bluebird');
var yfm = require('hexo/node_modules/hexo-front-matter');
var slugize = require('hexo/node_modules/hexo-util').slugize;


var cs = require('./hexo-cheatsheet-model');

hexo.locals.set('cheatsheets', function() {
	return hexo.database.model('Cheatsheet', cs.Cheatsheet(hexo));
});


hexo.extend.processor.register('_cheatsheets/:file', function(file) {

	var Model = this.model("Cheatsheet");
	var doc = Model.findOne({
		source: file.path
	});


	if (file.type === 'skip' && doc) {
		return;
	}

	if (file.type === 'delete') {
		if (doc) {
			return doc.remove();
		} else {
			return;
		}
	}

	return Promise.all([
		file.stat(),
		file.read()
	]).spread(function(stats, content) {
		var data = yfm(content);
		data.source = file.path;
		data.raw = content;

		if (data.permalink) {
			data.slug = data.permalink;
			delete data.permalink;
		} else {
			data.slug = createSlug(file.path);
		}

		data.path = 'cheatsheets/' + data.slug + '.html';

		if (doc) {
			return doc.replace(data);
		} else {
			return Model.insert(data);
		}
	});


});


function createSlug(path) {
	var parts = path.split('/');
	var filename = parts[parts.length - 1];
	var namePart = filename.substring(0, filename.lastIndexOf('.'));
	return slugize(namePart);
}

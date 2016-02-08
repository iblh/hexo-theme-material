//https://github.com/hgcummings/hexo-processor-types
var Schema = require('warehouse').Schema;
var Promise = require('bluebird');
var yfm = require('hexo-front-matter');
var slugize = require('hexo-util').slugize;

hexo.locals.set('cheatsheets', function() {
	return hexo.database.model('Cheatsheet');
});

hexo.extend.processor.register('_cheatsheets/:file', function(file) {

	var Model = this.model("Cheatsheet", new Schema());
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
    data.layout = "cheatsheet";

		if (data.permalink) {
			data.slug = data.permalink;
			delete data.permalink;
		} else {
			data.slug = createSlug(file.path);
		}

		data.path = 'cheatsheets/' + data.slug + '/';

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

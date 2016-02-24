//https://github.com/hgcummings/hexo-processor-types
var Promise = require('hexo/node_modules/bluebird');
var yfm = require('hexo/node_modules/hexo-front-matter');
var slugize = require('hexo/node_modules/hexo-util').slugize;


//var model = require('./hexo-cheatsheet-model');

hexo.locals.set('cheatsheets', function() {
	//return hexo.database.model('Cheatsheet', model.Cheatsheet(hexo));
	return hexo.database.model('Cheatsheet', require('./hexo-cheatsheet-model')(hexo));
});

hexo.locals.get('cheatsheets');

hexo.extend.processor.register('_cheatsheets', function(file) {
	var Cheatsheet = hexo.model("Cheatsheet");
	var doc = Cheatsheet.findOne({
		source: file.path
	});
	/*
	console.dir(Model);
	console.dir(doc);
	console.dir(file.path);
	*/
	console.dir(Cheatsheet);
	console.dir(doc);
	console.dir(file);

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

	/*
	return file.changed().then(function(changed) {
		if (!changed && doc) return;
		*/
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
			}

			return Cheatsheet.insert(data);
		});

	//});

});


function createSlug(path) {
	var parts = path.split('/');
	var filename = parts[parts.length - 1];
	var namePart = filename.substring(0, filename.lastIndexOf('.'));
	return slugize(namePart);
}

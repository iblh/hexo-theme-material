/*
box.addProcessor('_cheatsheets/:file.md', function(file){
//	file.source
//	file.path
//	file.type
//	file.params
});
*/

hexo.extend.processor.register('_cheatsheets/:file.md', function(file){
 	console.log(file);
});

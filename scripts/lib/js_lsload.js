'use strict';

var path_for = require("./path_for");
var get_file_hex = require("./get_file_hex");
var fs = require('fs');

function jsHelper() {
  var result = '';
  var path = '';

  for (var i = 0, len = arguments.length; i < len; i++) {
    path = arguments[i];

    if (i) result += '\n';

    var localpath = path_for.call(this,path);

    if (Array.isArray(path)) {
      result += jsHelper.apply(this, path);
    } else {
      if (path.indexOf('?') < 0 && path.substring(path.length - 3, path.length) !== '.js') path += '.js';
      result += '<script>lsloader.load("' + path + '","' +
        require("../../../../node_modules/hexo/lib/plugins/helper/url_for").call(this,path) +
        (fs.existsSync(localpath)?'?' + get_file_hex(localpath):'') + '")</script>'
    }
  }
  return result;
}

module.exports = jsHelper;
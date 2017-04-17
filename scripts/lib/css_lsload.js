'use strict';

var path_for = require("./path_for");
var get_file_hex = require("./get_file_hex");

function cssHelper() {
  var result = '';
  var path = '';

  for (var i = 0, len = arguments.length; i < len; i++) {
    path = arguments[i];

    if (i) result += '\n';

    if (Array.isArray(path)) {
      result += jsHelper.apply(this, path);
    } else {
      if (path.indexOf('?') < 0 && path.substring(path.length - 4, path.length) !== '.css') path += '.css';
      result += '<style id="' + path + '"></style><script>if(typeof window.lsLoadCSSMaxNums === "undefined")window.lsLoadCSSMaxNums = 0;' +
        'window.lsLoadCSSMaxNums++;' +
        'lsloader.load("' + path + '","' +
        require("../../../../node_modules/hexo/lib/plugins/helper/url_for").call(this,path) + '?' +
        get_file_hex(path_for.call(this,path)) + '",function(){if(typeof window.lsLoadCSSNums === "undefined")window.lsLoadCSSNums = 0;' +
        'window.lsLoadCSSNums++;' +
        'if(window.lsLoadCSSNums == window.lsLoadCSSMaxNums)document.documentElement.style.display="";' +
        '})</script>'
    }
  }
  return result;
}

module.exports = cssHelper;
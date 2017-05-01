'use strict';

hexo.extend.tag.register('note', function(args, content) {
  var calloutType = '';
  var header = '';
  var result = '';
  if (args.length) {
    if (args[0]=='default'||args[0]=='primary'||args[0]=='success'||args[0]=='danger'||args[0]=='warning'||args[0]=='info'){
      if (args[1]) {
        calloutType += args.shift();
        header += '<div class="md-callout-title">' + args.join(' ') + '</div>';
      }
      else {
        calloutType += args[0];
      }
    }
    else {
      calloutType += 'default';
      header += '<div class="md-callout-title">' + args.join(' ') + '</div>';
    }
  }
  else {
    calloutType += 'default';
  }
  result += '<div class="md-callout md-callout-' + calloutType + '">' + header;
  result += hexo.render.renderSync({text: content, engine: 'markdown'});
  result += '</div>';
  return result;
}, true);

//'use strict';

var Schema = require('warehouse').Schema;
var moment = require('moment');
var pathFn = require('path');
var Promise = require('bluebird');
var _ = require('lodash');
var Moment = require('hexo/lib/models/types/moment');

function pickID(data) {
  return data._id;
}

function removeEmptyTag(tags) {
  return tags.filter(function(tag) {
    return tag != null && tag !== '';
  }).map(function(tag) {
    return tag + '';
  });
}

module.exports = function(ctx) {
  var Cheatsheet = new Schema({
    id: String,
    title: {type: String, default: ''},
    date: {
      type: Moment,
      default: moment,
      language: ctx.config.languages,
      timezone: ctx.config.timezone
    },
    updated: {
      type: Moment,
      default: moment,
      language: ctx.config.languages,
      timezone: ctx.config.timezone
    },
    comments: {type: Boolean, default: true},
    layout: {type: String, default: 'cheatsheet'},
    _content: {type: String, default: ''},
    source: {type: String, required: true},
    slug: {type: String, required: true},
    photos: [String],
    link: {type: String, default: ''},
    raw: {type: String, default: ''},
    published: {type: Boolean, default: true},
    content: {type: String},
    excerpt: {type: String},
    more: {type: String}
  });

  Cheatsheet.virtual('path').get(function() {
    var path = ctx.execFilterSync('cheatsheet_permalink', this, {context: ctx});
    return typeof path === 'string' ? path : '';
  });

  Cheatsheet.virtual('permalink').get(function() {
    var url_for = ctx.extend.helper.get('url_for');
    return ctx.config.url + url_for.call(ctx, this.path);
  });

  Cheatsheet.virtual('full_source').get(function() {
    return pathFn.join(ctx.source_dir, this.source || '');
  });

  Cheatsheet.virtual('asset_dir').get(function() {
    var src = this.full_source;
    return src.substring(0, src.length - pathFn.extname(src).length) + pathFn.sep;
  });

  return Cheatsheet;
};

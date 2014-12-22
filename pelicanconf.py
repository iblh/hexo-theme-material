#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'iocast'
SITENAME = u'iocast'
SITEURL = 'http://iocast.github.io'

PATH = 'content'

TIMEZONE = 'Europe/Zurich'

DEFAULT_LANG = u'en'

# Do not publish articles set in the future
WITH_FUTURE_DATES = True
TEMPLATE_PAGES = { 'blog.html': 'blog.html', 'cheatsheets.html': 'pages/cheatsheets.html' }
STATIC_PATHS = ['assets',]
#EXTRA_PATH_METADATA = {}

PAGE_EXCLUDES = ['wiki', 'projects', '_to_write']
ARTICLE_EXCLUDES = ['wiki', 'projects', '_to_write']

# Feed generation is usually not desired when developing
FEED_RSS = 'feed/index.html'
FEED_ATOM = 'feed/atom/index.html'
FEED_ALL_RSS = False
FEED_ALL_ATOM = False
TRANSLATION_FEED_RSS = False
TRANSLATION_FEED_ATOM = False


# Blogroll
#LINKS = (('GitHub', 'https://github.com/iocast'),
#         ('Twitter', 'https://twitter.com/MichelOtt2'),)


# Social widget
SOCIAL = (('github', 'https://github.com/iocast'),
          ('twitter', 'https://twitter.com/MichelOtt2'),)


DEFAULT_PAGINATION = 3
PAGINATED_DIRECT_TEMPLATES = ('blog-index',)
DIRECT_TEMPLATES = ['categories', 'index', 'blog-index', 'blog']

POST_LIMIT = 3

#DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True


# Formatting for dates

DEFAULT_DATE_FORMAT = ('%d/%b/%Y %a')


# Formatting for urls

ARTICLE_URL = "blog/{date:%Y}/{date:%m}/{date:%d}-{slug}.html"
ARTICLE_SAVE_AS = "blog/{date:%Y}/{date:%m}/{date:%d}-{slug}.html"


MD_EXTENSIONS = ['codehilite(css_class=highlight)', 'extra', 'headerid', 'toc']

# Plugins

PLUGIN_PATHS = ['plugins']
PLUGINS = ['sitemap', 'neighbors', 'related_posts', 'extract_toc']


### Plugin-specific settings

RELATED_POSTS_MAX = 20

# TODO: align default SITEMAP config to http://wordpress.org/extend/plugins/google-sitemap-generator/stats/
SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly'
    }
}


# Specify theme
THEME = "themes/BT3-Flat"


# GOOGLE_SEARCH = '013542728820335073314:dcpel18vrey'
#SWIFTYPE = ''
SITE_THUMBNAIL = 'assets/images/logo_icon.png'
#SITE_THUMBNAIL_TEXT = 'Network Tsukkomi'
#SITESUBTITLE = 'Not only about network'

DISQUS_SITENAME = 'iocast'
#GOOGLE_ANALYTICS = ''
#GOOGLE_ANALYTICS_DOMAIN = 'networktsukkomi.me'


FAVICON = 'assets/images/logo_icon.png'
ICON = 'assets/images/logo_icon.png'
SHORTCUT_ICON = 'assets/images/logo_icon.png'

#PERSONAL_PHOTO = "https://dl.dropboxusercontent.com/u/299446/thumb-400x400.png"
PERSONAL_INFO = """In principio erat Verbum et Verbum erat ...

IOCAST: I'm using this site to write down some of my thoughts and solutions to problems which I'm facing in my daily work. This site does not have a specific purpose, such as a project documentation or information on a specific topic, it is just a collection of things I'm interesting in."""

# work
WORK_DESCRIPTION = ''
# items to descripe a work, "type", "cover-image link", "title", "descption", "link"
WORK_LIST = (('link', 'assets/work/swl-calendar.png', 'swl-calendar', 'A HTML5 semantic web event calendar', 'https://github.com/iocast/semantic-web-library'),
('link', 'assets/work/bottle-i18n.png', 'bottle-i18n', 'Internationalization plugin for your Bottle application', 'https://github.com/iocast/bottle-i18n'),
('link', 'assets/work/hook-server.png', 'hook-server', 'Listen on POST events and installs updates on the application server', 'https://github.com/iocast/hook-server'),)

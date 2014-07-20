BT3-Flat
=======

**For some reasons, I won't update this theme for a long time except for bug fix. And I'll try to rewrite it in AngularJS in next commit**

BT3-Flat is a theme built on bootstrap 3 for [Pelican](http://getpelican.com) 3.2.

I'm using it as my personal blog theme and you can take a look at [networktsukkomi.me](http://networktsukkomi.me)

the following part is my config file:
==========

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Ken Lai'
SITENAME = u'Network Tsukkomi'
SITEURL = ''

TIMEZONE = 'Asia/Hong_Kong'

DEFAULT_LANG = u'en'

# Do not publish articles set in the future
WITH_FUTURE_DATES = False
TEMPLATE_PAGES = {'blog.html': 'blog.html'}
STATIC_PATHS = ['images', 'extra/CNAME']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'}}

# Feed generation is usually not desired when developing
FEED_RSS = 'feed/index.html'
FEED_ATOM = 'feed/atom/index.html'
FEED_ALL_RSS = False
FEED_ALL_ATOM = False
TRANSLATION_FEED_RSS = False
TRANSLATION_FEED_ATOM = False

# Blogroll
LINKS = (('Ken M. Lai\'s Note', 'http://kenmlai.blogspot.com'),
         ('Martian Z', 'http://blog.martianz.cn/'))

# Social widget
SOCIAL = (('google-plus', 'https://plus.google.com/+KenLaimercus'),
          ('linkedin', 'http://www.linkedin.com/in/kenmercuslai'),
          ('githuB', 'https://github.com/KenMercusLai'),
          ('envelope', 'mailto:ken.mercus.lai@gmail.com')
          )


DEFAULT_PAGINATION = True
PAGINATED_DIRECT_TEMPLATES = ('blog-index',)
DIRECT_TEMPLATES = ('categories', 'index', 'blog-index', 'blog')

POST_LIMIT = 3

# PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# Formatting for dates

DEFAULT_DATE_FORMAT = ('%d/%b/%Y %a')

# Formatting for urls

ARTICLE_URL = "{date:%Y}/{date:%m}/{slug}/"
ARTICLE_SAVE_AS = "{date:%Y}/{date:%m}/{slug}/index.html"

# Plugins

PLUGIN_PATH = 'plugins'
PLUGINS = ['sitemap', 'neighbors', 'related_posts']


# Specify theme

# THEME = "theme/BT3-Flat"
THEME = "/Users/KenMercusLai/Documents/Projects/BT3-Flat"
# GOOGLE_SEARCH = '013542728820335073314:dcpel18vrey'
SWIFTYPE = ''
SITE_THUMBNAIL = 'https://dl.dropboxusercontent.com/u/299446/logo.png'
SITE_THUMBNAIL_TEXT = 'Network Tsukkomi'
SITESUBTITLE = 'Not only about network'

DISQUS_SITENAME = 'networktsukkomime'
GOOGLE_ANALYTICS = ''
GOOGLE_ANALYTICS_DOMAIN = 'networktsukkomi.me'

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


#===theme settings===========================

FAVICON = 'https://dl.dropboxusercontent.com/u/299446/logo.png'
ICON = 'https://dl.dropboxusercontent.com/u/299446/logo.png'
SHORTCUT_ICON = 'https://dl.dropboxusercontent.com/u/299446/logo.png'

# About ME
PERSONAL_PHOTO = "https://dl.dropboxusercontent.com/u/299446/thumb-400x400.png"
PERSONAL_INFO = """My name is Ken Lai, a network engineer who is working & living in Shenzhen, China. I've spent about 10 years in network industry from doing operational routines at first, to work as a tech consultant with my sales partner in one of the greatest company in this world. I also do program work a lot as a personal hobby in my part-time. I learnt variety of languages, like C, C++, ASM, Object-Pascal since 6th grade in elementary school. But Python has been my favorite since I knew it for the first time in 2006. Also, English is my second language while my mother tongue is Madrin. I can speak some Japanese, and now is  preparing for the official Japanese certification."""

# work
WORK_DESCRIPTION = ''
# items to descripe a work, "type", "cover-image link", "title", "descption", "link"
WORK_LIST = (('link', 'https://dl.dropboxusercontent.com/u/299446/BT3-Flat.png', 'BT3-Flat', 'A BT3 flat theme for pelican', 'https://github.com/KenMercusLai/plumage'),)
```

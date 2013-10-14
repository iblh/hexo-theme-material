---
layout: default
title: iocast ~ bottle-i18n
zip_url: https://github.com/iocast/bottle-i18n/zipball/master
issue_url: https://github.com/iocast/bottle-i18n/issues/new
repository_url: http://github.com/iocast/bottle-i18n
---

The bottle-i18n plugin integrates the multilingual internationalization services ```gettext``` from Python with your Bottle application.

Usage Example:

``` python
#!/usr/bin/python

import bottle
from bottle.ext.i18n import I18NPlugin, I18NMiddleware, i18n_defaults

i18n_defaults(bottle.SimpleTemplate, bottle.request)

def get():
	app = bottle.Bottle()
	
	@app.route('/')
	def index():
		return bottle.template("<b>{{_('hello')}} I18N<b/>?")
	
	sub_app = bottle.Bottle()

	@sub_app.route('/')
	def sub():
		return bottle.template("current language is {{lang()}}")

	app.mount(app = sub_app , prefix = '/sub', skip = None)

	return I18NMiddleware(app, I18NPlugin(domain='messages', default='en', locale_dir='./locale'))
	
if __name__ == '__main__':
	bottle.run(app=get(), host='localhost', port='8000', quiet=False, reloader=True)
```

Running the above example it automatically loads the default language ```en``` if in the URL the langauge code or the ```HTTP_ACCEPT_LANGUAGE``` sent from the browser is missing.

The URL structure is as follow
```
http://localhost:8000/<language-code>/<route>
```


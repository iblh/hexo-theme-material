---
layout: default
title: iocast ~ bottle-i18n
zip_url: https://github.com/iocast/bottle-i18n/zipball/master
issue_url: https://github.com/iocast/bottle-i18n/issues/new
repository_url: http://github.com/iocast/bottle-i18n
---

# bottlle-i18n

The bottle-i18n plugin integrates the multilingual internationalization services `gettext` from Python with your Bottle application.

Usage Example:

```python
#!/usr/bin/python

import bottle, os
from bottle.ext.i18n import I18NPlugin, I18NMiddleware, i18n_defaults, i18n_view, i18n_template

i18n_defaults(bottle.SimpleTemplate, bottle.request)

def get():
    app = bottle.Bottle()
    
    @app.route('/')
    def index():
    return bottle.template("<b>{ {_('hello')} } I18N<b/>?")
    
    @app.route('/world')
    def variable():
        return bottle.template("<b>{ {_('hello %(variable)s', {'variable': world})} }<b/>?", {'world': app._('world')})
    
    @app.route('/view')
    @i18n_view('hello', function="i18n_view")
    def tmpl_app_hello():
        return {}
    
    @app.route('/tmpl')
    def tmpl_app_hello():
        return i18n_template('hello', function="i18n_template")
    
    
    lang_app = bottle.Bottle()
    
    @lang_app.route('/')
    def sub():
        return bottle.template("current language is { {lang()} }")
    
    app.mount(app = lang_app, prefix = '/lang', skip = None)
    
    return I18NMiddleware(app, I18NPlugin(domain='messages', default='en', locale_dir='./locale'))

if __name__ == '__main__':
    bottle.run(app=get(), host='localhost', port='8000', quiet=False, reloader=True, debug=True)
```

Running the above example it automatically loads the default language `en` if in the URL the langauge code or the `HTTP_ACCEPT_LANGUAGE` sent from the browser is missing.

The URL structure is as follow

```bash
curl http://localhost:8000/<language-code>/<route>
```
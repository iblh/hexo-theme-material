Title: Sphinx
Type: cheatsheet
Date: 2014-12-23 08:54
Modified: 2014-12-22 08:54
Slug: cheatsheet/sphinx
Authors: iocast
Summary: Sphinx

## Errors

### ValueError: unknown locale: UTF-8

If you try to build your documentation (`sphinx-build -b html -a . _build/`) and get the following error

```bash
...
  File ".../virtualenv/publishing/lib/python2.7/locale.py", line 443, in _parse_localename
    raise ValueError, 'unknown locale: %s' % localename
ValueError: unknown locale: UTF-8
```

then try the following. Add the the below lines to your `$HOME/.bash_profile`

```bash
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```

Do

```bash
source $HOME/.bash_profile
```

and try it again. Or simply export the **locale** settings before running the `sphinx-build`.

Title: node-webkit desktop application and 3rd party libraries
Author: iocast
Date: ongoing
Summary: In this post I want to describe how you create a platform independent application using node-webkit including 3rd party libraries such as node-sqlite3. It shows you, how you setup a development environment, rebuild your dependencies and build your platform specific versions of your application on the basis of the [time edition project][]
Category: Desktop Application
Tags: development, javascript, nodejs, node-webkit, node-sqlite3, sqlite
Slug: node-webkit-desktop-application


**To the readers**: I anticipate, that you know what nodejs, node-webkit is and there concept behind it.

## Preparation

Sadly, before we can start to code, we need to setup our environment. First download the desired version of the node-webkit from [rogerwangs' GitHub repository][node-webkit] and extract the archive file to the place you want to have it. Then do the same for the [nodejs][]. If you **do not** want to install nodejs, consider downloading the **binaries** and NOT the installer.

Now we are almost ready to code. Lets have a short look at the folder structure.

```
../
 |- project/
      |- nodejs/
	  |    |- bin/
	  |    |- ...
      |- node-webkit/
	       |- node-webkit.app
	       |- ...
```

Now we need to create the necessary subdirectories for our project. So create the following folders

```bash
mkdir -p project/node-webkit/node_modules project/node-webkit/app
```


## First steps




### Configuration


### Creating your own modules




### Using a template engine

[swig][]

```bash
cd project/node-webkit
project/nodejs/bin/npm install swig --save
```


## 3rd party libraries

Third party libraries needs normally a rebuild for your target. [nw-gyp][] is needed to do a rebuild of a prebuilt library to your installed target system. Hence we need to install [nw-gyp][] globally.

```bash
project/nodejs/bin/npm install -g nw-gyp
```

Now we are ready to install the desired 3rd party libraries. First you need to install the library

```bash
cd project/node-webkit
project/nodejs/bin/npm install sqlite3@2.2.0 --save
```

and then rebuild the library for your target system

```bash
cd project/node-webkit/node_modules/sqlite3
project/nodejs/bin/node project/nodejs/lib/node_modules/nw-gyp/bin/nw-gyp.js rebuild --target=0.8.5
```

where target is the version number of the node-webkit you have downloaded.


```bash
project/nodejs/bin/npm cache clean
```

```bash
project/nodejs/bin/npm install -g bower
project/nodejs/bin/node project/nodejs/lib/node_modules/bower/bin/bower init
bower install --save Polymer/polymer
```


## Distribute


Script / Config                       | Purpose
:-------------------------------------|:----------------------------------------
/usr/libexec/qgis/qgis_mapserv.fcgi   | main fast cgi script (OGC capabilities)
/etc/httpd/conf.d/qgis-mapserver.conf | qgis mapserver httpd configuration file





[time edition project]:		/projects/abc.html								"Time Edition Project"
[node-webkit]:				https://github.com/rogerwang/node-webkit		"node-webkit is an app runtime based on Chromium and node.js"
[nw-gyp]:					https://github.com/rogerwang/nw-gyp				"Native addon build tool for node-webkit"
[nodejs]:					http://nodejs.org								"Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications."
[swig]:						https://github.com/paularmstrong/swig			"Swig is an awesome, Django/Jinja-like template engine for node.js."



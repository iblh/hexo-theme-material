---
layout: post
title: qgis-server on CentOS
author: iocast
excerpt: 
categories: blog
tags:
- osx
- bash
- rsync
---


## Setting up qgis-web-client on CentOS

Download the latest version from [qgis/QGIS-Web-Client](https://github.com/qgis/qgis-web-client).

Copy the file ```apache-conf/qgis-web-client.conf.tmpl``` to ```apache-conf/qgis-web-client.conf``` and change the directories and server names according to your server setup or you could add an entry like this ```127.0.0.1 qgis-web-client.localhost``` to ```/etc/hosts```.

In addition you need to change the log pathes as follow

<% highlight apache %>
ErrorLog /var/log/httpd/qgis-web-client-error.log
CustomLog /var/log/httpd/qgis-web-client-access.log combined
<% endhighlight %>

Copy the whole project to the defined path in the ```qgis-web-client.conf``` (it e.g. to ```/var/www/qgis-web-client/```).

<% highlight bash %>
mkdir /var/www/qgis-web-client
cp -R Downloads/QGIS-Web-Client-master/* /var/www/qgis-web-client/
<% endhighlight %>

Now create a symlink of the configuration file to ```/etc/httpd/conf.d/``` as follow

<% highlight bash %>
ln -s /var/www/qgis-web-client/apache-conf/qgis-web-client.conf /etc/httpd/conf.d/
<% endhighlight %>

Reload the server configuration

sudo service httpd reload
sudo service httpd restart


if you get a error in ```/var/log/httpd/qgis-web-client-error.log``` like this
Premature end of script headers: qgis_mapserv.fcgi

you need to create a symlink

ln -s /usr/libexec/qgis/qgis_mapserv.fcgi /usr/local/bin/



and add the line

LoadModule fcgid_module modules/mod_fcgid.so

to /etc/httpd/conf/httpd.conf


yum install mod_wsgi





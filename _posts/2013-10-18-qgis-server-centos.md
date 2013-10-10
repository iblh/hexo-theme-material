---
layout: post
title: Setting up a QGIS server on CentOS 6
author: iocast
excerpt: asdf
categories: blog
tags:
- osx
- bash
- rsync
---

QGIS server provides a web map server (WMS) by simply copying a QGIS project int the server directory.

## Installation

First you need a running CentOS on a machine. In the default CentOS software repository ```qgis-server``` is not available. So you need first to add extra packages for enterprise linux (EPEL) repository as follow:

{% highlight bash %}
wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-<version>.noarch.rpm
rpm -Uvh epel-release-<version>.noarch.rpm
{% endhighlight %}

where the version I have tested it was ```6-8```.


Add the ELGIS repositories

```Shell
wget http://elgis.argeo.org/repos/6/elgis-release-<version>.noarch.rpm
rpm -Uvh elgis-release-6-6_0.noarch.rpm
```

where the version I have tested it was ```6-6_0```.


Now install QGIS server:

<% highlight bash %>
yum install qgis-mapserver.x86_64
<% endhighlight %>


If you want to have QGIS libraries, QGIS Desktop run the following command

```bash
yum install qgis*
```


The files are installed on CentOS:

Script / Config                      | Purpose
:-----------------------------------  |:----------------------------------------
/usr/libexec/qgis/qgis_mapserv.fcgi    | main fast cgi script (OGC capabilities)
/etc/httpd/conf.d/qgis-mapserver.conf  | qgis mapserver httpd configuration file


```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```




## Setting up qgis-web-client on CentOS

Download the latest version from [qgis/QGIS-Web-Client](https://github.com/qgis/qgis-web-client).

Copy the file ```apache-conf/qgis-web-client.conf.tmpl``` to ```apache-conf/qgis-web-client.conf``` and change the directories and server names according to your server setup or you could add an entry like this ```127.0.0.1 qgis-web-client.localhost``` to ```/etc/hosts```.

In addition you need to change the log paths as follow

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





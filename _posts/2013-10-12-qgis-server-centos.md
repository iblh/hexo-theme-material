---
layout: post
title: Setting up a QGIS server and PostGIS on CentOS 6
author: iocast
excerpt: asdf
categories: blog
tags:
- centos
- qgis
- server
- postgresql
- postgis
---

QGIS server provides a web map server (WMS) by simply copying a QGIS project int the server directory. If you want to depend on newer ```postgresql-libs``` you need first to install the desired version of PostgreSQL and PostGIS as described bellow.


## PostgreSQL and PostGIS

The following instructions are adapted from {% cite wiki:aa %} and {% cite PostGIS:aa %}

source: based on [YUM installation - PostgreSQL wiki](http://wiki.postgresql.org/wiki/YUM_Installation#Configure_your_YUM_repository) and [UsersWikiuPostGIS20CentOS6pgdg - PostGIS](http://trac.osgeo.org/postgis/wiki/UsersWikiPostGIS20CentOS6pgdg)

### Configuration

Configure yum repository

{% highlight bash %}
vi /etc/yum.repos.d/CentOS-Base.repo
{% endhighlight %}

and add the following excludes to ```base``` and ```updates``` sections:

{% highlight yaml %}
exclude=postgresql*
{% endhighlight %}


### Install PGDG RPM file

A PGDG file is available for each distribution/architecture/database version combination at http://yum.postgresql.org 

{% highlight bash %}
wget http://yum.postgresql.org/<version>/<distribution>/<architecture>/pgdg-<database>.noarch.rpm
{% endhighlight %}

where version is ```9.3```, distribution is ```redhat```, architecture is ```rhel-6-x86_64``` and database is ```centos93-9.3-1```.

Install RPM distribution:

{% highlight bash %}
rpm -ivh pgdg-centos93-9.3-1.noarch.rpm
{% endhighlight %}


### Installation of PostgreSQL and PostGIS

List the available packages:

{% highlight bash %}
yum list postgres*
{% endhighlight %}


Installation:

{% highlight bash %}
yum install postgresql93-libs.x86_64 postgresql93-server.x86_64 postgis2_93
{% endhighlight %}

### Configuration

Now perform a few post-installation setup commands, in the order: (1) Initialize the database cluster (required), (2) start database (recommended, if you want to use it straight away), (3) allow it to start-up automatically on reboot (recommended):

{% highlight bash %}
service postgresql-9.2 initdb
service postgresql-9.2 start
chkconfig postgresql-9.2 on
{% endhighlight %}


Some important files

File / Application                       | Purpose
:----------------------------------------|:------------------------------------
/var/lib/pgsql/9.3/data/postgresql.conf  | changing host etc.
/var/lib/pgsql/9.3/data/pg_hba.conf      | client authentication configuration


In the ```pg_hba.conf``` file comment out the ```ident``` lines except for unix domain socket and add two new lines for ```md5 encryption```

{% highlight conf %}
# IPv4 local connections:
#host    all             all             127.0.0.1/32            ident
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
#host    all             all             ::1/128                 ident
host    all             all             ::1/128                 md5
{% endhighlight %}

###  Database and User

Before we can start, we need to create a new database and user.

Login as ```postgres``` superuser and create a new database

{% highlight bash %}
su -l postgres
createdb gis
{% endhighlight %}


Login into the database create a user and set a encrypted password

{% highlight bash %}
psql gis
CREATE USER gis WITH SUPERUSER LOGIN PASSWORD 'gis';
ALTER USER gis WITH ENCRYPTED PASSWORD 'gis
{% endhighlight %}


Now test your configuration and install PostGIS extension

{% highlight bash %}
psql -h localhost -d gis -U gis -W
CREATE EXTENSION postgis;
{% endhighlight %}



## Installation QGIS

First you need a running CentOS on a machine. In the default CentOS software repository ```qgis-server``` is not available. So you need first to add extra packages for enterprise linux (EPEL) repository as follow:

{% highlight bash %}
wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-<version>.noarch.rpm
rpm -Uvh epel-release-<version>.noarch.rpm
{% endhighlight %}

where the version I have tested it was ```6-8```.


Add the ELGIS repositories

{% highlight bash %}
wget http://elgis.argeo.org/repos/6/elgis-release-<version>.noarch.rpm
rpm -Uvh elgis-release-6-6_0.noarch.rpm
{% endhighlight %}

where the version I have tested it was ```6-6_0```.


Now install QGIS server:

{% highlight bash %}
yum install qgis-mapserver.x86_64
{% endhighlight %}


If you want to have QGIS libraries, QGIS Desktop run the following command

{% highlight bash %}
yum install qgis*
{% endhighlight %}


The scripts and configs are installed on CentOS:

Script / Config                       | Purpose
:-------------------------------------|:----------------------------------------
/usr/libexec/qgis/qgis_mapserv.fcgi   | main fast cgi script (OGC capabilities)
/etc/httpd/conf.d/qgis-mapserver.conf | qgis mapserver httpd configuration file


{% bibliography --cited %}


---
title: Ubuntu 12.04, PGSQL 9.3, PostGIS 2.1 and PL/R against libgdal1h from scratch
author: iocast
date: 2013/11/11
excerpt: In this post I am going to describe how you could install PostgreSQL 9.3 and compile PostGIS 2.1 against libgdal1h on Ubuntu 12.04. It also describes how to install the latest R environment 3.0.2 and the PL/R extension for PostgreSQL.
categories:
- GIS
tags:
- server
- ubuntu
- ubuntugis
- postgresql
- postgis
- libgdal
---

## Removing preinstalled packages

First we need to check which PostgreSQL, PostGIS and GDAL versions are installed. To do so check your Debian package management system (dpkg).

```bash
dpkg -l | grep 'postgres\|gdal'
```

You should get a list like the following one:

```bash
ii  libgdal-dev                        1.10.0-1~precise1                 Geospatial Data Abstraction Library - Development files
ii  libgdal1-dev                       1.10.0-1~precise1                 Geospatial Data Abstraction Library - Development files
ii  libgdal1h                          1.10.0-1~precise1                 Geospatial Data Abstraction Library
ii  postgresql-9.1                     9.1.10-0ubuntu12.04               object-relational SQL database, version 9.1 server
ii  postgresql-9.1-postgis-2.0         2.0.3-2~precise4                  Geographic objects support for PostgreSQL 9.1
ii  postgresql-9.1-postgis-2.0-scripts 2.0.3-2~precise4                  Geographic objects support for PostgreSQL 9.1 -- scripts
ii  postgresql-client-9.1              9.1.10-0ubuntu12.04               front-end programs for PostgreSQL 9.1
ii  postgresql-client-common           129ubuntu1                        manager for multiple PostgreSQL client versions
ii  postgresql-common                  129ubuntu1                        PostgreSQL database-cluster manager
ii  postgresql-contrib-9.1             9.1.10-0ubuntu12.04               additional facilities for PostgreSQL
```

If you want, you could remove these packages as follow:

```bash
apt-get purge libgdal-dev libgdal1-dev libgdal1h postgresql-9.1 postgresql-9.1-postgis-2.0 postgresql-9.1-postgis-2.0-scripts postgresql-client-9.1 postgresql-client-common postgresql-common
apt-get autoremove
apt-get autoclean
```

## Installing PostgreSQL 9.3

First you need to find out your release code name:

```bash
lsb_release -c
```

which get you something like that `Codename:	precise`

Create a new file `codename-pgdg.list` in `/etc/apt/sources.list.d` according to the [PostgreSQL wiki page][pgsql].

```bash
vi /etc/apt/sources.list.d/precise-pgdg.list
```

and add the following line

```bash
deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main
```

Now we need to import the repository key from

```bash
wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
```

Now we can a update the repository and install the required packages from the PostgreSQL repository.

```bash
apt-get update
apt-get install postgresql-9.3 postgresql-contrib-9.3 postgresql-server-dev-9.3
```


## Compiling PostGIS 2.1 against libgdal >= 1.10.0

To install PostGIS 2.1 it is important that `postgresql-server-dev-x.x` is installed, because we need to compile PostGIS against these source files. We are going the install the precompiled `libgdal` 1.10.0 version from **ubuntugis**.

Install `python-software-properties` and add the apt sources (repositories):

```bash
apt-get install python-software-properties
add-apt-repository ppa:ubuntugis/ubuntugis-unstable
apt-get update
```

Now install the new GDAL library called `libgdal1h` and its' development package

```bash
apt-get install libgdal1h
apt-cache showpkg libgdal-dev*
```

which gets you something like that:

```bash
...
Provides:
1.10.0-1~precise1 -
1.9.0-3.1~pgdg12.4+1 -
...
```

You can install a version using the ```-f``` flag

```bash
apt-get install -f libgdal-dev=1.10.0-1~precise1
```

Before installing the PostGIS from source we install the required dependencies.

```bash
apt-get install make gcc checkinstall libxml2-dev libproj-dev libgeos-dev
```

Download the latest PostGIS source and compile it

```bash
wget http://download.osgeo.org/postgis/source/postgis-2.1.0.tar.gz
tar xzvf postgis-2.1.0.tar.gz
cd postgis-2.1.0
./configure
```

```bash
 PostGIS is now configured for x86_64-unknown-linux-gnu

-------------- Compiler Info -------------
 C compiler:           gcc -g -O2
 C++ compiler:         g++ -g -O2
 SQL preprocessor:     /usr/bin/cpp -traditional-cpp -P

-------------- Dependencies --------------
 GEOS config:          /usr/bin/geos-config
 GEOS version:         3.3.8
 GDAL config:          /usr/bin/gdal-config
 GDAL version:         1.10.0
 PostgreSQL config:    /usr/bin/pg_config
 PostgreSQL version:   PostgreSQL 9.3.1
 PROJ4 version:        48
 Libxml2 config:       /usr/bin/xml2-config
 Libxml2 version:      2.8.0
 JSON-C support:       no
 PostGIS debug level:  0
 Perl:                 /usr/bin/perl

--------------- Extensions ---------------
 PostGIS Raster:       enabled
 PostGIS Topology:     enabled
 SFCGAL support:       disabled

-------- Documentation Generation --------
 xsltproc:             
 xsl style sheets:     
 dblatex:              
 convert:              
 mathml2.dtd:          http://www.w3.org/Math/DTD/mathml2/mathml2.dtd
```

use `checkinstall`, which runs `make install` and registers the package in `dpkg`.

```bash
make
checkinstall
```


## R 3.0.2 and PL/R for PostgreSQL

Before we can install PL/R extension for PostgreSQL 9.3 we need to install R 3.0.2 as describe on the [R-Project][cran] site. First edit the

```bash
vi /etc/apt/sources.list
```
and add the following line and do a update

```bash
deb http://cran.r-project.org/bin/linux/ubuntu precise/
```
as well as the key

```bash
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
apt-get update
```


The search for the 3.0.2 R package version and install it.

```bash
apt-cache showpkg r-base
apt-get install -f r-base=3.0.2-1precise0
```


Lastly we can install the PL/R extension for PostgreSQL from the PostgreSQL apt repository

```bash
apt-get install postgresql-9.3-plr
```

So ... we are ready ... have fun.


[pgsql]: https://wiki.postgresql.org/wiki/Apt       "Apt - PostgreSQL wiki"
[cran]: http://cran.r-project.org                   "The Comprehensive R Archive Network"

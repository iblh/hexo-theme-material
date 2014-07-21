Title: Python 2.7.x and mod_wsgi on a CentOS 6
Author: iocast
Date: 2013-10-16
Summary: Read how to install Python 2.7.x on CentOS 6 and compile mod_wsgi against Python 2.7.x.
Category: Web Application
Tags: centos, server, apache, httpd, python
Slug: python-mod_wsgi-centos


When you have installed CentOS 6 using the minimal image we need first to do some preparation. Fist login into your system and enable your ```eth0``` at startup.

```bash
vi /etc/sysconfig/network-scripts/ifcfg-eth0
```

and set ```ONBOOT``` to ```yes```.

## Getting Python 2.7.x

The following explanations are based on a blog of [Asim Teeshan][asim] and a post on [Fire3Net][fir3net].

First we need some development tools. Install the following once

```bash
yum install gcc make zlib-devel bzip2-devel openssl-devel
```

Now download the latest 2.7.x Python release and enable shared library during the configuation

```bash
cd /opt/
wget http://python.org/ftp/python/2.7.5/Python-2.7.5.tgz
```

Extract and install it:

```bash
tar -zxvf Python-2.7.5.tgz
cd Python-2.7.5
./configure --enable-shared
make && make altinstall
```


Install Python setuptools for using ```easy_setup```

```bash
wget http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11-py2.7.egg
sh setuptools-0.6c11-py2.7.egg
```


Before we can install ```mod_wsgi``` we need to install the http development libraries

```bash
yum install httpd httpd-devel
```

Now we are ready to compile ```mod_wsgi``` against Python 2.7.x

Download and unpack the latest version

```bash
wget http://modwsgi.googlecode.com/files/mod_wsgi-3.4.tar.gz
tar -zxvf mod_wsgi-3.4.tar.gz
cd mod_wsgi-3.4.tar.gz
./configure --with-python=/usr/local/bin/python2.7
```

Make sure you specify the path to the python binary. You can find out where your Python binary is by issuing the following command:

```bash
whereis python
```

Once the configuration completed you can install it:

```bash
make && make install
```

If you run into problems along the lines **cannot load shared library libpython2.7...** then you need run the ```ldconfig``` first to tell where the ```libpython2.7.so*``` files are:

```bash
ln -s /usr/local/lib/libpython2.7.so.1.0 /usr/lib/
ln -s /usr/local/lib/libpython2.7.so /usr/
ldconfig
```

Lastly we can install ```virtualenv``` as follow:

```bash
wget http://pypi.python.org/packages/source/v/virtualenv/virtualenv-1.10.1.tar.gz
tar -zxvf virtualenv-1.10.1.tar.gz
cd virtualenv-1.10.1
python2.7 setup.py install
```


install psycopg2

```bash
wget --no-check-certificate https://pypi.python.org/packages/source/p/psycopg2/psycopg2-2.5.1.tar.gz
tar -zxvf psycopg2-2.5.1.tar.gz
cd psycopg2-2.5.1
vi setup.cfg
```

and add the following line

```
pg_config=/usr/pgsql-9.3/bin/pg_config
````


now install it

```bash
/usr/local/bin/python2.7 setup.py install
```


now creating a virtual env for you web application do it as follow

```bash
virtualenv-2.7 --system-site-packages ENV
```


[asim]: http://blog.nickhowell.co.uk/2010/11/30/setup-osqa-on-centos-5-5                        "Setup OSQA on CentOS 5.5 | nickhowell.co.uk"
[fir3net]: http://www.fir3net.com/Redhat-/-Fedora/how-do-i-compile-modwgsi-for-python-27.html   "How do I compile mod_wsgi for Python 2.7"

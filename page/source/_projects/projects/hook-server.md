---
layout: default
title: iocast ~ hook-server
zip_url: https://github.com/iocast/hook-server/zipball/master
issue_url: https://github.com/iocast/hook-server/issues/new
repository_url: http://github.com/iocast/hook-server
---

# hook-server

hook-server is a Python server which updates a git repository triggered by a post hook comming from [GitHub](https://developer.github.com/webhooks/) or [Bitbucket](https://confluence.atlassian.com/display/BITBUCKET/Manage+Bitbucket+hooks).

## installation

For both methods described below you could use a virtual environment. So lets first create a ```virtualenv``` and install the necessary dependencies:

```
virtualenv /opt/virtualenv/hook-server-hook
source /opt/virtualenv/hook-server/bin/activate
pip install bottle
deactivate
```

### standalone

A script is provided to run this server in standalone mode.

```
sudo -u www-data python hook-server_standalone.py --port 8080 --host localhost --virtualenv /opt/virtualenv/hook-server
```

### nginx, uwsgi

In the ```hook-server_nginx_site.conf``` change the ```server_name```, ```root``` which is your home directory of the application, as well as the ```listen``` parameter.

Now change i nthe ```hook-server_uwsgi_vassal.xml``` the path to your virtual environement which is the key ```virtualenv``` and if necessary the path to the log ```daemonize```.

In my environment I use ```upstart``` to control my services. For uwsgi I have craeted a ```uwsgi.conf``` in ```/etc/init``` with the following content

```
# uWSGI - manage uWSGI application server
#

description     "uWSGI Emperor"

start on (filesystem and net-device-up IFACE=lo)
stop on runlevel [!2345]

respawn

env LOGTO=/var/log/uwsgi/uwsgi.log
env BINPATH=/usr/bin/uwsgi

pre-start script
        mkdir -p -m0755 /var/run/uwsgi
end script

exec $BINPATH --emperor /opt/www/vassals/ --pidfile /var/run/uwsgi/emperor.pid --stats 127.0.0.1:9191 --logto $LOGTO
```

that creates a ```/var/run/uwsgi``` folder for the ```pid``` files and starts the applications using the configuration file in ```/opt/www/vassals/```.

In this case, create a link of the **nginx site configuration** to the nginxs' site directory and a link of the **vassal** file to the emperor directory.

```
ln -s /opt/www/hook-server_nginx_site.conf /etc/nginx/sites-available/hook-server
ln -s /etc/nginx/sites-available/hook-server /etc/nginx/sites-enabled/
ln -s /opt/www/hook-server_uwsgi_vassal.xml /opt/www/vassals/hook-server.xml
```


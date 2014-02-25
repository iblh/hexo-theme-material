---
layout: default
title: iocast ~ database-server-management
zip_url: https://github.com/iocast/database-server-management/zipball/master
issue_url: https://github.com/iocast/database-server-management/issues/new
repository_url: http://github.com/iocast/database-server-management
---

# Database Server Management Tool

The repository holds a bunch of script to manage databases. Currently you are able to automatically backup **PostgreSQL** and **MariaDB** as well as **MySQL** database servers. These scripts are based on the example scripts found in the [PostgreSQL wiki](http://wiki.postgresql.org/wiki/Automated_Backup_on_Linux) from Thom, Chronos, Kesslernetworks and Marcp.

## Databases

Currently I support PostgreSQL and MariaDB. Both are based on the same logic and more or less same configuration file.

### PostgreSQL

First we need to change the permission of the ```pgpass.conf``` file, because otherwise PostgreSQL would not consider it and the username and password.

``` bash
chmod 0600 postgresql/pgpass.conf
vi postgresql/pgpass.conf
```

Now change the configuration file according to your needs. Note that the user defined in ```pgpass.conf``` should be the same as the one in the configuration file

``` bash
vi postgresql/pg_backup.conf
```


### MariaDB

Change the configuration file according to your needs

``` bash
vi mariadb/mariadb_backup.config
```

Now define the password for the configured user in the ```my.cnf``` file. If you do not have defined a user, then the scripts takes the default user ```root```.

``` bash
vi mariadb/my.cnf
```


## Scheduling

To run automatic backups you could use your preferred the schedulling management engine installed on your system. In my cause, I use ```cron``` under a Linux system. Because of simplycity I directly change the master ```crontab``` file and add my changes there. You could also you the **daily**, **weekly** directory under ```/etc``` if you system provides that.

``` bash
vi /etc/crontab
```

and add the following lines for a daily backup on 5 mintues after midnight

```
# m h dom mon dow user  command
5  0    * * *   root    /opt/repos/database-server-management/<database>/<db>_backup_rotated.sh
```

where ```<database>``` is *postgresql* or **mariadb** and ```<db>``` could be **pg** or **mariadb**.

Lastly we need to restart ```cron```

``` bash
service cron restart
```


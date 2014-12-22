Title: PostgreSQL
Type: cheatsheet
Date: 2014-12-22 10:30
Modified: 2014-12-22 11:41
Slug: cheatsheet/postgresql
Authors: iocast
Summary: PostgreSQL commands


[TOC]

## Basics

login as postgres use r

	sudo su postgres - 


run sql command

	psql -U postgres -c "<sql>"


### List
lists all databases

	psql --list


### Create

create database

`-O`
: owner
`-U`
: username
`-E`
: encoding
`-e`
: echo
`--locale=<locale>`
: (This is equivalent to specifying both --lc-collate and --lc-ctype)

: --lc-collate='<locale>'`

: `--lc-ctype='<locale>'`

: `-T` template

	createdb -U postgres <database>


### Drop

	dropdb -U <user> -h <host> -i -e <database>


### Log into database

`-W` to force password prompt

	psql -U <user> -W -d <database>


### User

create user

`-D`
: (The new user will not be allowed to create databases.)

`-P`
: (If given, createuser will issue a prompt for the password of the new user. This is not necessary if you do not plan on using password authentication.)

`-S`
: (The new user will not be a superuser.)

`-E`
: (Encrypts the user's password stored in the database. If not specified, the default password behavior is used.)


	createuser -D -S -E -P <name>


### Export To File

`\h copy` tells you what are the parameters for export

	COPY (<sql>) TO '<file>' CSV

## Commands

load environment

	psql

list all users

	\dg

list all databases

	\list

list all tables

	\dp

table schema

	\d <table>

cancel/go out

	CTRL+D


## Extensions

Connect to the PostgreSQL server

	psql -h localhost

create a database

	CREATE DATABASE mydatabase;

and connect to it

	\c mydatabase

### Hstore

creates / loads hstore extension for the current database

	CREATE EXTENSION hstore;

### PostGIS

creates / load postgis extension for the current database

	CREATE EXTENSION postgis;

## SQL

grant access

	ALTER DATABASE <name> OWNER TO <user>


## Issues

### Full Disk

Locate the directory which uses that much space on the disk. On a standard installation it is somewhere in the `/var/lib/` directory. If found the PostgreSQL data directory (here as example `/var/lib/pgsql` run the following command to find out which directory needs how much space on the disk

	du -h

First stop PostgreSQL

	/etc/init.d/postgresql stop

Then move a "big" directory to a partition/disk that has space free.

	mv /var/lib/pgsql/main/ /media/tmp/

Now create a symlink to this directory

	ln -s /medai/tmp/main /var/lib/pgsql/main

Start PostgreSQL

	/etc/init.d/postgresql start

and VACUUM FULL

	psql -c "VACUUM FULL"

Shutdown the database.

	/etc/init.d/postgresql stop

Remove the symbolic link

	unlink /var/lib/pgsql/main

and move the files back onto the `/var/lib/pgsql` filesystem again

	mv /media/tmp/main/ /var/lib/pgsql/

Now you are finished. Start the database.

	/etc/init.d/postgresql start


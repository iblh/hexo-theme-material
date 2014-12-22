Title: Linux
Type: cheatsheet
Date: 2014-12-22 10:30
Modified: 2014-12-22 11:41
Slug: cheatsheet/linux
Authors: iocast
Summary: Linux commands


[TOC]

## User & Group Management


Purpose            | Command
------------------ | -------------------------------
new group          | `groupadd sambashare`
new user           | `useradd -m -g users -G sambashare -s /bin/bash unix_user`
change password    | `passwd unix_user`



## Samba Management


Purpose            | Command
------------------ | -------------------------------
new user           | `pdbedit -a -u samba_user`
change password    | `smbpasswd samba_user`


## File and Directory Handling


### Find & Remove

specific files

	find <path> -name '<file-name>' -delete


If something ''more portable'' needed then you're better off with

	find <directory name> -name '*.pyc' -exec rm {} \;


### File Manipulation

search the line which begins with `var feature server` and replaces the whole line with `var featureserver = "http://featureserver.org/fs"`

	sed -e 's%^var featureserver.*%var featureserver = "http://featureserver.org/fs"%g' featureserver.org/assets/js/map.js > ${tmp}/website/assets/js/map.js

template command is as follow, where the first character after `s` is used as separator and afterwards it comes a regex. Use `-i` to do an ''in place'' replacement (no need for pipe)

	sed -ie 's/$search_for/$replace_with/g' $file


### Folder size

`-h`
: human readable file size

`-s`
: sum all subfolders

```bash
du <directory>
```

### Compression

	tar -cvzf <file.tar.bz2> --exclude-vcs --exlude='*.svn' folder/


### Extraction

	tar -zxvf <file.tar.bz2>



### Synchronization

Synchronization

	:::bash
	#! /bin/bash
	rsync -av --delete <from> <to> > <log> &


### Cloning
burning image to disk (also usb drives)

optional use `bs=8192`

	dd if=<path>.iso of=<disk>



## Job / Programs

Keep job running despite of a logout

	nohup <command> &


## System information

	dmidecode -t [bios, system, baseboard, chassis, processor, memory, cache, connector, slot] | more


### Packages
getting installed packages including version number

	time dpkg -l | perl -lane 'print "$F[1] : $F[2]" if m/^ii/'

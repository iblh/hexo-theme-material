---
layout: default
title: iocast ~ file-server-management
zip_url: https://github.com/iocast/file-server-management/zipball/master
issue_url: https://github.com/iocast/file-server-management/issues/new
repository_url: http://github.com/iocast/file-server-management
---

# File Server Migration Tool

This bash scripts connects to a server, syncs all configured folders to the local machines and sets on the local folders the defined permissions. The intention of this tool is to automate a migration or "data clone" of a Mac OS X file server, e.g. to move to a Active Directory based login mechanism.

The cornerstones are ```rsync``` and bash json reader called [jq][] which is included in this repository.

NOTE: This script can also be used to **propagate the posix and/or ACLs** on a system without using the sync and share mechanism.

## Preparation

The following steps need to be done antecedent:

1. rsa key creation
	* ```cd ~/.ssh/``` (goes to the default key location)
	* ```ssh-keygen -t rsa -C "mail address"``` (creates a new rsa key pair)
	* ```pbcopy < ~/.ssh/id_rsa.pub``` (copies the public key to the clipboard)
2. configuration of the source server
	* ```vim ~/.ssh/authorized_keys``` (edits/creates a new authorized key file)
	* paste the clipboard (rsa public key) to the ```authorized_keys``` file
3. changing rsync rights on the source server
	* ```sudo visudo``` (edits the sudoers)
	* ```<user> ALL= NOPASSWD:/usr/bin/rsync``` (add this to the appropriate position in the file)


## Configuration

The configuration file is a ```json``` file, which consists of four sections. First the ```source``` need to be defined which is the server from where you want to copy. Next thing is the ```destination``` from where you run this script and want to sync the files to. Then we have some configuration parts like ```rsa``` which holds the path to the private key created in the [preparation section](#preparation) and the prefix for the ```log``` file.

The last section defines all the folders/shares to be synced from the source to the destination server. The ```folder``` defines the folder name on the source system, ```name``` the share name to be created. If it is empty it will use the ```folder``` name as share name. Next you define a list of ACLs. Here you define the ```owner```, ```access```, and ```permisson``` according to the [chmod man page](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/chmod.1.html).

In addition you can define for each folder/share if it need to be synced from the source to the destination, if the posix or ACLs rights need to be propagated or if you want to create a share. Set for that the desired boolean value on the appropriate attribute. For more information about OS X sharing consider the [sharing man page](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/sharing.1.html).

Following a example how to define a configuration file:

```json
{
	"source": {
		"uri": "<server>:/<path>",
		"user": "root"
	},
	"destination": {
		"uri": "/<path>",
		"user": "root",
		"group": "staff",
		"modus": {
			"rsync": "Du=rwx,Dg=,Do=,Fu=rwx,Fg=,Fo=",
			"chmod": "0700"
		}
	},
	"rsa": "/<path-to-private-rsa-key>",
	"log": "./<log-prefix>",
	"shares": [
		{
			"folder": "test_folder",
			"name": "test",
			"acls" : [
				{
					"owner": "group:D\\group-admin",
					"access": "allow",
					"permission": "readattr,writeattr,readextattr,writeextattr,readsecurity,writesecurity,list,search,add_file,add_subdirectory,delete_child,read,write,append,execute,file_inherit,directory_inherit,chown"
				},
				{
					"owner": "group:D\\group-employees",
					"access": "allow",
					"permission": "readattr,readextattr,readsecurity,list,search,add_file,add_subdirectory,read,file_inherit,directory_inherit"
				}
			],
			"sync": true,
			"posix": true,
			"share": true,
			"acl": true
		},
		{
			"folder": "other_folder",
			"name": "",
			"acls" : [
				{
					"owner": "group:D\\group-employees",
					"access": "allow",
					"permission": "readattr,writeattr,readextattr,writeextattr,readsecurity,writesecurity,list,search,add_file,add_subdirectory,delete_child,read,write,append,execute,file_inherit,directory_inherit,chown"
				}
			],
			"sync": true,
			"posix": true,
			"share": true,
			"acl": true
		}
	]
}
```


  [jq]: http://stedolan.github.io/jq/        "./jq"


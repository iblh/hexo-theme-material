---
layout: default
title: iocast ~ file-server-management
zip_url: https://github.com/iocast/file-server-management/zipball/master
issue_url: https://github.com/iocast/file-server-management/issues/new
repository_url: http://github.com/iocast/file-server-management
---


# File Server Migration Tool

This repository is a collection of several "helper" scripts for analyzing directory structures, migrating a file server, creating automatic user network directories based on a active directory group, propagating POSIX and ACL permissions, and refresh applications using a git repository. Each task is assigned to an individual bash script, which can be glued together by creating an own wrapper.

The following scripts (tasks) are available:

* **[directory analyses](#directory_analyses)**: currently only determining directory size (script: ```folder_size.sh```)
* **[file server migration](#file_server_migration)**: using ```rsync``` to migrate data. Defining network shares only available for OS X Servers (script: ```migrate_data.sh```)
* **[permission propagation](#permission_propagation)**: Propagating permission and manage shares (script: ```perms_share_mgmt.sh```)
* **[share management](#share_management)**: Propagating permission and manage shares (script: ```perms_share_mgmt.sh```)
* **[user network directory](#user_network_share)**: connects to a active directory and checks if network share is available (script: ```user_network_share.sh```)
* **[application update](#application_updater)**: connects to git repositories and clones it to the local directory (scrip: ```git_repo_udpater.sh```)


## <a name="directory_analyses"></a>Directory Analyses

The ```folder_size.sh``` script analysis a directory structure and excerpts each directory size. Run it as follow

```bash
./folder_size.sh --config configs/folders.json
```

where the configuration json file consists of all folders to analyze including the depth. Let say you want to get the sizes of all folders in the directory ```/home``` with different depth for each folder you can do it like that.

```json
{
	"source": "/home",
	"folders": [
		{ "folder": "bob", "depth": 0 },
		{ "folder": "tom", "depth": 2 },
		{ "folder": "clark", "depth": 1 }
	],
	"subfolders": [
		{
			"parent": "bob",
			"folders": [
				{ "folder": "projects", "depth": 1 }
			]
		}
	]
}
```

In the ```"subfolders"``` attribute you can define subdirectories of a parent folder that need to be listed separately in the output.

## <a id="file_server_migration"></a>File Server Migration

The file server migration script ```migrate_data.sh``` synchronizes directories from a remote server to the local server using ```rsync```. In addition it can automatically set new POSIX rights, adding extended ACL attributes ([permission propagation](#permission_propagation)) and [creating a shares](#share_management).

### Preparation for unattended synchronization

The following steps need to be done antecedent:

1. rsa key generation
	* ```cd ~/.ssh/``` (goes to the default key location)
	* ```ssh-keygen -t rsa -C "mail address"``` (creates a new rsa key pair)
	* ```pbcopy < ~/.ssh/id_rsa.pub``` (copies the public key to the clipboard)
2. configuration of the remote server
	* ```vim ~/.ssh/authorized_keys``` (edits/creates a new authorized key file)
	* paste the clipboard (rsa public key) to the ```authorized_keys``` file
3. changing rsync rights on the remote server
	* ```sudo visudo``` (edits the sudoers)
	* ```<user> ALL= NOPASSWD:/usr/bin/rsync``` (add this to the appropriate position in the file)


### Configuration

The configuration file is a ```json``` file, which consists of four sections. First the ```source``` need to be defined which is the server from where you want to copy (remote server). Next is the ```destination``` from where you run this script and want to sync the files to. Then we have some configuration parts like ```rsa``` which holds the path to the private key created in the [preparation section](#preparation) and the prefix for the ```log``` file.

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
			"acls" : [{
					"owner": "group:D\\group-admin",
					"access": "allow",
					"permission": "readattr,writeattr,readextattr,writeextattr,readsecurity,writesecurity,list,search,add_file,add_subdirectory,delete_child,read,write,append,execute,file_inherit,directory_inherit,chown"
				}, {
					"owner": "group:D\\group-employees",
					"access": "allow",
					"permission": "readattr,readextattr,readsecurity,list,search,add_file,add_subdirectory,read,file_inherit,directory_inherit"
			}],
			"sync": true,
			"posix": true,
			"share": true,
			"acl": true
		},
		{
			"folder": "other_folder",
			"name": "",
			"acls" : [{
					"owner": "group:D\\group-employees",
					"access": "allow",
					"permission": "readattr,writeattr,readextattr,writeextattr,readsecurity,writesecurity,list,search,add_file,add_subdirectory,delete_child,read,write,append,execute,file_inherit,directory_inherit,chown"
			}],
			"sync": true,
			"posix": true,
			"share": true,
			"acl": true
		}
	]
}
```

### Run it

Now you can run it as follow:

```bash
./migrate_data.sh --config configs/shares.json --exclude configs/excludes.txt
```

where the ```excludes.txt``` consists of files and folders the be excluded during the synchronization process.


## <a id="permission_propagation"></a>Permission propagation

Maybe you have seen in the [file server migration](#file_server_migration) description that for each folder the attributes ```posix``` and ```acl``` as well as the ```acls``` exists. If you want for example to propagate your POSIXs and ACLs again, you can simple set the attributes ```sync``` and ```share``` to ```false``` for all folders and run the script again.

When using the ```migrate_data.sh``` script as described in [file server migration](#file_server_migration) the problem is, that it always asks for confirmation. Because of that, the ```perms_share_mgmt.sh``` script is also able to propagate permissions and create new shares, based on the same configuration file as in [file server migration](#file_server_migration).

```bash
./perms_share_mgmt.sh --config configs/shares.json
```

## <a id="share_management"></a>Share Management

The same procedure as in [permission propagation](#permission_propagation) takes place here. To (re-)create the shares on a OS X Server you simple need to set the attributes ```sync```, ```posix```, and ```acl``` to ```false``` for all folders and run this script again.

## <a id="user_network_share"></a>User Network Share

The idea of this script is create a folder for each user in a active directory group named by its username and propagate POSIX and ACL rights. All you need to do is to run the script ```user_network_share.sh``` an follow the onscreen prompts.

```bash
./user_network_share.sh
```

Optionally you could also silently run this script using a configuration  file.

```bash
./user_network_share.sh --config configs/network_share.json
```

where ```network_share.json``` holds all the configuration information which you need to provide when using the onscreen prompt mode.

```json
{
	"datasource" : {
		"credentials": {
			"username": "ad_user",
			"password": "ad_password"
		},
		"path": "/Active Directory/D/All Domains",
		"group": "employee-group",
		"home": "/home/",
		"archive": "/media/archive/"
	},
	"posix": {
		"username": "root",
		"group": "root",
		"modus": "0700",
	},
	"propagation": {
		"posix": true,
		"acl": true
	}
}
```

If you want, you could automate this script using a ```cron``` job or under Mac OS X Server using the provided property list configuration file ```configs/iocast.network.share.active-directory.plist```.

Before you can install it, you need to change the working directory, to the path where you have installed this application.

```xml
...
<key>WorkingDirectory</key>
<string>/opt/file-server-management</string>
...
```

Then **install** and load it as follow.

```bash
ln -s /opt/file-server-management/configs/iocast.network.share.active-directory.plist /Library/LaunchDaemons/
launchctl load -w /Library/LaunchDaemons/iocast.network.share.active-directory.plist
launchctl start iocast.network.share.active-directory
```

To **uninstall** it run these commands

```bash
launchctl unload /Library/LaunchDaemons/iocast.network.share.active-directory.plist
rm -f /Library/LaunchDaemons/iocast.network.share.active-directory.plist
```


## <a id="application_updater"></a>Application Updater

```git_repo_updater.sh``` scans a defined directory for each subfolder and runs a ```git pull``` inside each folder.

You can automate this script by adding the following line to the ```crontab```

```
# m h dom mon dow user  command
0  *    * * *   root    /opt/repos/git_repo_updater.sh
```

If you are using ssh to login to a git server do not add a passphrase when creating the rsa key files, because this script updates all repos unattended.

In addition the ```ssh-agent``` need to be running in the background. Running these lines

```
echo 'eval $(ssh-agent)' >> /etc/profile
echo `eval $(ssh-add)'` >> ~/.bash_profile
```

automatically starts the ```ssh-agent``` in the background.


[jq]: http://stedolan.github.io/jq/        "./jq"


Title: Joining a Active Directory on Linux - the easiest way!
Author: iocast
Date: 2013-11-30
Summary: This post shortly outlines how you could join a Active Directory under linux.
Category: Server Management
Tags: active directory, likewise-open, ubuntu, server
Slug: ad-on-linux-the-easiest-way


The easiest way, at least for me, is to use the ```likewise-open``` package. You can find the official documentation [here](https://help.ubuntu.com/community/LikewiseOpen). Under Ubuntu you can simple install this package using ```apt-get```.

```bash
apt-get install likewise-open
```

Once you have installed it, you can join a Active Directory (AD) as follow.

```bash
domainjoin-cli join --ou Hosting/<path>/<to>/<your>/<organization-unit> <server> <login-user>
```

where you need to define the path to your organization unit, which is displayed in the AD as a folder. The second parameter is the server and the last parameter is the user, that have rights to add new things in the AD.

Without any configuration, all AD users have login rights to your server. At first login, each user is getting a personal user folder under ```/home/likewise-open``` and then a subfolder named as his username.


## Restricting access to specific groups

By default, LikewiseOpen allows all AD users to logon. To limit this to specific groups you need to add required membership settings as follow:

```bash
lwconfig RequireMembershipOf "<server>\\<group-1>" "<erver>\\<group-2>"
lw-update-dns
```


If you forget which groups have access to you server, you could check it by running the following command:

```bash
lwconfig --detail RequireMembershipOf
```

## Login

Now you are able to login to your server using active directory authentication:

```bash
ssh <ad_domain>\\<user>@<server>
```


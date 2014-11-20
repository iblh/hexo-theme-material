Title: My personal file server on a Cubox from SolidRun using Arch Linux
Author: iocast
Date: 2014-11-09
Summary: Who does not dream from a fast electric saving home server. In this blog I'm going to describe, how to setup a headless file server using Arch Linux on the Cubox from SolidRun.
Category: server
Tags: server, arch linux, file server, samba, dyndns
Slug: cubox-fileserver-archlinux


For my file server I have the following requirements:

1. it should consume as less as possible electricity
2. it should be very silent, means no active cooling
3. the operation system should use OpenSSH

Thus, for the hardware I have decided to use a [Cubox from SolidRun](http://www.solid-run.com/) because it has a very good value for money. Notice that I use the first revision of the Cubox and not the Cubox-i serie. For the operation system I use [Arch Linux](http://archlinuxarm.org/platforms/armv7/marvell/cubox) because it is more up-to-date then the Debian or Ubuntu distribution.


# Installation

Download the latest version of Arch Linux for the [Marvell ARMv7 platform](http://archlinuxarm.org/platforms/armv7/marvell/cubox) from the official site. Next, plug your MicroSD into your computer and find out which drive (`/dev/sdx`) it is

	df -ah

Clear your disk and create **one** `ext3` partition.

	mkfs.ext3 /dev/sdx1

Know mount it and extract Arch Linux onto your MicroSD partition

	mkdir /media/arch
	mount /dev/sdx1 /media/arch
	tar -xzvf ArchLinuxARM-cubox-latest.tar.gz -C /media/arch
	umount /media/arch
	rm -rf /media/arch

The default login is user `root` with password `root`.


# Configuration

Now lets configure some basic stuff, like date and time, DHCP, etc.

## Clientid

If you are on a network with DHCPv4 that filters Client IDs based on MAC addresses, you may need to change the following line in `/etc/dhcpcd.conf`:

	# Use the same DUID + IAID as set in DHCPv6 for DHCPv4 Client ID as per RFC4361. 
	duid

to:

	# Use the hardware address of the interface for the Client ID (DHCPv4).
	clientid

Else, you may not obtain a lease since the DHCP server may not read your DHCPv6-style Client ID correctly. See RFC 4361 for more information.

To automatically start the DCHP daemon at start up you have to enable it.

	systemctl enable dhcpcd
	systemctl enable dhcpcd@eth0.service



## System Upgrade

	pacman -Syu

## Bad experience with `vi`

If you have bad experience or strange behaviour with the standard `vi` simply install `vim`.

	pacman -S vim-minimal


## Locale and Date/Time

Change your timezone to the one your are living at. All time zones can be found in the folder `/etc/timezones`.

	# To check the current zone defined for the system:
	timedatectl status
	# To list available zones:
	timedatectl list-timezones
	# To change your time zone:
	timedatectl set-timezone Europe/Zurich


Also do not forget to change your `locale`

	localectl status
	ls /usr/share/i18n/locales
	localectl set-locale LANG=de_CH.UTF-8





# Samba

For internal file sharing you could use Samba. Tips and tricks can be found on [Arch Linux Samba site](https://wiki.archlinux.org/index.php/Samba/Tips_and_tricks)

	pacman -S samba

Your can restart the service using the follwing

	systemctl enable smbd.service
	systemctl enable nmbd.service


Create a new samba group

	groupadd sambashare


and add user to it

	# add user to the samba grup
	pdbedit -a -u samba_user
	# changing samba password
	smbpasswd samba_user


Adding a user to the samba group

	usermod -a -G sambashare unix_user_name


On my Cubox I use the following configuration (`/etc/samba/smb.conf`):
	
	[global]
	workgroup = iocast
	server string = file server
	security = user
	create mask = 0775
	force create mode = 0775
	directory mask = 02775
	force directory mode = 02775
	force group = sambashare
	
	[michel]
	comment = data disk
	path = /storage/data/
	public = no
	writable = yes
	guest ok = no
	valid users = michel
	write list = michel
	
	[michel backup]
	comment = data disk backup
	path = /storage/backup/
	public = no
	writable = no
	guest ok = no
	valid users = michel
	write list = michel
	
	[ninalaki]
	comment = data disk1
	path = /storage/data1/
	public = no
	writable = yes
	guest ok = no
	valid users = michel karolina
	write list = michel karolina
	
	[ninalaki backup]
	comment = data disk1 backup
	path = /storage/backup1/
	public = no
	writable = no
	guest ok = no
	valid users = michel karolina
	write list = michel karolina


# Disks management

To automatically mount disks on startup, you need to add them to the `/etc/fstab` configuration file. Also use the option `nofail` to not report any error if the disk is absent. For more information read the [manual on Arch Linux](https://wiki.archlinux.org/index.php/fstab)

Run `lsblk -f` or `ls -l /dev/disk/by-uuid` to list the partitions / disks. Edit the `/etc/fstab` and prefix the values in the UUID column with `UUID=`:

	# <file system>                           <dir>            <type>  <options>                        <dump>  <pass>
	UUID=54940062-befb-4127-b1fc-15584cd4c2ea /storage/data/   ext4    nofail,rw,relatime,data=ordered  0       0
	UUID=e786913c-ee77-4e04-a0d6-1b70b2b4ff69 /storage/backup/ ext4    nofail,rw,relatime,data=ordered  0       0
	UUID=92e833e1-ecc4-4cd3-9874-969867eb5848 /storage/data1/  ext4    nofail,rw,relatime,data=ordered  0       0


# Dynamic DNS

If you use [afraid.org](http://www.afraid.org) as your dynamic DNS service you can get an example `cron` entry from the **Dynamic DNS** menu entry. It look likes the following

	PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin
	
	3,8,13,18,23,28,33,38,43,48,53,58 * * * * sleep 37 ; wget -O - http://freedns.afraid.org/dynamic/update.php?key= >> /tmp/freedns_pasithee_mooo_com.log 2>&1 &

On Arch Linux you need to do the following changes to use it with `systemd/Timers` (see [here](https://wiki.archlinux.org/index.php/Systemd/Timers)). First we need to create a new timer `vim /etc/systemd/system/afraid.org.timer` and add the following lines

	[Unit]
	Description=timer for service afraid.org.timer
	Requires=network-online.target
	Requires=network.target
	After=dhcpcd.service
	
	[Timer]
	OnCalendar=*:3,8,13,18,23,28,33,38,43,48,53,58
	
	[Install]
	WantedBy=multi-user.target


Then create a service file of the same name `/etc/systemd/system/afraid.org.service` and add the following lines

	[Unit]
	Description=service for afraid.org for pasithee.mooo.com
	
	[Service]
	Type=simple
	ExecStart=/usr/bin/curl -k http://freedns.afraid.org/dynamic/update.php?key= >> /tmp/freedns_pasithee_mooo_com.log 2>&1


Now you can test the service.

	# test service
	systemctl start afraid.org.service
	systemctl stop afraid.org.service

As soon as it works you can enable the timer

	systemctl enable afraid.org.timer
	systemctl start afraid.org.timer


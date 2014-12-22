Title: Windows
Type: cheatsheet
Date: 2014-12-22 10:30
Modified: 2014-12-22 11:41
Slug: cheatsheet/windows
Authors: iocast
Summary: Windows commands



[TOC]

## Desktop

For all the command in this section I used ''command line prompt''.

### Sharing

remove a network share

	net use /delete <drive name or network path>


## Server

For all the command below I used ''PowerShell''.

### Sharing

''list'' of all connected users

	Get-SmbSession


for ''command line'' use

	net session


''closing'' a session can be done using the session id, computer name or user name as follow:

	Close-SmbSession -SessionId 171798691989
	Close-SmbSession –ClientComputerName \\192.168.0.20
	Close-SmbSession –ClientUserName Domain\Username


## Miscellaneous

### Synchronization

''mirror''

	robocopy <source> <destination> /MIR /XD "<source>/<path>/<to>/<folder>"

`XD`: exluding directories




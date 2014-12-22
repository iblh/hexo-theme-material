Title: IRC
Type: cheatsheet
Date: 2014-12-22 10:30
Modified: 2014-12-22 11:41
Slug: cheatsheet/irc
Authors: iocast
Summary: IRC commands

[TOC]

## User

### Register

	/msg NickServ register <password> <email>

### Login

	/msg nickserv identify <password>


## Administering Channel

You cannot administer a channel until you become an operator with the op command. Only an operator can create other operators. If no operators are left in a channel, the channel can no longer be administered. You shouldn't be operator any longer than you have to, as it creates an unhelpful class distinction among channel users and not knowing who is operator can help keep trolls from causing trouble. Once you have finished, drop to normal user status with the deop command.

You can see all the flags assigned to all users in a channel with:

	/msg chanserv access #<channel> list


### Register a Channel

	/msg chanserv register #<channel>

### Becoming Founder

	/msg ChanServ flags #vectorformats iocast +*F
	/msg ChanServ flags #vectorformats iocast -OV

The first command grants all flags to a user, including the founder flag `F` which must be explicitly granted (it isn't part of the `*`).

The second command removes two flags which normally should not be used. `O` automatically makes the user an operator when they join the channel, which should be avoided as previously explained. `V` automatically voices a user when they join the channel. Voicing is only needed on moderated channels where new users cannot speak upon joining without the voice flag. An open channel for community participation should not require this, and not having the `V` flag makes it easier to identify a problem with the channel.

### Becoming Operator

	/msg chanserv op #<channel> <username>
	/msg chanserv flags #<channel> <username> <flags>
	/msg chanserv deop #<channel> <username>

Title: Tunneling over an intermediate to overcome demilitarized zone
Author: iocast
Date: 2011-12-03
Summary: Often you want to connect to a computer inside a network that is hidden from the outside. This "private" network, aka demilitarized zone (DMZ), can be overcome by having a computer inside the DMZ that opens a connection to an other "open" network or computer. This article describes roughly how to do that using Linux.
Tags: linux, bash, networking, ssh
Slug: tunelling-over-an-intermediat


Source code: <a href="resources/code/shell/tunneling.sh">shell script</a>

Tunneling over a intermediar is often used to connect to a server which is e.g. in a DMZ. In the following case we have a server that is the company network and does only allow connections on port 22 from the DMZ. Means the server cannot be connection over the internet. In addition, we have a server in the DMZ which allows connection on port 22 from outside (internet) and can connect to the company network over port 22. Last but not least, every time a server restarts we want that the tunnels automatically opens, means that we need to have an {{{cron}}} job that checks, whether an open connection exists from the server to the intermediary or not, and if the server opens a connection to the intermediary the system does not need to prompt for password. Solution is here to register the public key of the server on the intermediary.

## Client

### Opening a tunnel from client to intermediary

```bash
ssh -L 22000:127.0.0.1:22000 -N root@152.96.56.32
```

### Connecting to server

```bash
ssh -P 22000 michel@127.0.0.1
```

### Copy files (SCP)

```bash
#get
scp -P 22000 michel@127.0.0.1:/home/michel/tunelling.sh /Users/michel/Public/Drop\ Box/

#put
scp /Users/michel/Public/Drop\ Box/tunelling.sh -P 22000 michel@127.0.0.1:/home/michel/
```

## Intermediary

### Register GPG key from server

```bash
apt-key add <file>
```

## Server

### Export GPG key

```bash
apt-key export <key> > <file>
```

### Open a connection to intermediary from server
Save the following script as e.g. tunneling.sh

```bash
#!/bin/sh

cmd="ssh -R 22000:127.0.0.1:22 -N root@152.96.56.32"

match=$(ps -aef | grep "${cmd}" | grep -v grep)
if [ -z "${match}" ] ; then
$cmd &
fi
```

### Register cron job

Edit crontab

```bash
crontab -e
```

Adding a new job to the crontab. The following entry executes the defined script `tunneling.sh` every 5 minutes.

```bash
5 * * * * /<path>/tunnelilng.sh
```

Crontab is structured as follow:

```bash
* * * * * command to be executed
- - - - -
| | | | |
| | | | ----- Day of week (0 - 7) (Sunday=0 or 7)
| | | ------- Month (1 - 12)
| | --------- Day of month (1 - 31)
| ----------- Hour (0 - 23)
------------- Minute (0 - 59)
```

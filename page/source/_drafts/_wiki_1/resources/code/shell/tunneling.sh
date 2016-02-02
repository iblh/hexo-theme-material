#!/bin/sh

cmd="ssh -R 22000:127.0.0.1:22 -N root@152.96.56.32"

match=$(ps -aef | grep "${cmd}" | grep -v grep)
if [ -z "${match}" ] ; then
  $cmd &
fi

# open tunnel from client
#  ssh -L 22000:127.0.0.1:22000 -N root@152.96.56.32

# connect from client:
#  ssh -P 22000 michel@127.0.0.1

# scp from client
#get
# scp -P 22000 michel@127.0.0.1:/home/michel/tunelling.sh /Users/michel/Public/Drop\ Box/
#put
# scp /Users/michel/Public/Drop\ Box/tunelling.sh -P 22000 michel@127.0.0.1:/home/michel/


# apt keys
apt-key export <key> > <file>
apt-key add <file>

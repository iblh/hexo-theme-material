Title: Linux
Type: cheatsheet
Date: 2014-12-22 10:30
Modified: 2014-12-22 11:41
Slug: cheatsheet/linux
Authors: iocast
Summary: Linux commands


## User & Group Management


Purpose            | Command
-------------------|--------------------------------
new group          | `groupadd sambashare`
new user           | `useradd -m -g users -G sambashare -s /bin/bash unix_user`
change password    | `passwd unix_user`



## Samba Management


Purpose            | Command
-------------------|--------------------------------
new user           | `pdbedit -a -u samba_user`
change password    | `smbpasswd samba_user`

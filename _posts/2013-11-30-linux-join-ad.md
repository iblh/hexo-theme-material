

```bash
apt-get install likewise-open
domainjoin-cli join --ou Hosting/BAUG-IRL/computers/plus/servers d.ethz.ch ottmi
```



### Restricting access to specific groups

By default, LikewiseOpen allows all AD users to logon. To limit this to specific groups (in this case 'domain admins' and 'unix admins' with a Pre-Windows 2000 domain of OMG) run:

```bash
lwconfig RequireMembershipOf "d.ethz.ch\\baug-irl-plus-admins" "d.ethz.ch\\baug-irl-plus-employees"
lw-update-dns
```

check changes
```bash
lwconfig --detail RequireMembershipOf
```




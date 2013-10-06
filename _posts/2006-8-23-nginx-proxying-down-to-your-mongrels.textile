---
layout: post
title: nginx proxying down to your mongrels
---
"Ezra":http://brainspl.at was going on and on about this "nginx":http://sysoev.ru/en/ things on IRC today.  Saying how it was "super light and fast webserver with really good(better than pound) proxy module."  I had an app I wanted to setup a "mongrel_cluster":http://mongrel.rubyforge.org/docs/mongrel_cluster.html for at work, and when he gave a "pastie like this":http://pastie.caboo.se/9734 I figured I'd give it a try.  It took all of 5 minutes to be up and running.  It *seems* fine for the time being, I'll find out tomorrow when more users start hitting it.  One thing that was weird was I couldn't start it on a high port as an unprivileged user.  You CAN however start it with sudo, set the user in your config file, and it seems to setuid properly.  Thanks Ezra!

My friend Kevin at work shared "this link":http://blog.kovyrin.net/2006/04/04/nginx-small-powerful-web-server/ this morning, which covers a few of the cool features it offers.

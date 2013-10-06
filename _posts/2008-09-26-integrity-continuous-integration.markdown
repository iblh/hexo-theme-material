--- 
wordpress_id: 9
layout: post
title: "Integrity : Continuous Integration"
---

<p>
  I'm a big fan of <a href="http://martinfowler.com/articles/continuousIntegration.html"> Continuous Integration</a> when writing software. However I've always found myself disappointed by the CI solutions that are floating around, namely <a href="http://cruisecontrolrb.thoughtworks.com/">Cruisecontrolrb</a>. Managing the processes can become a nightmare once you have a few projects running under it. At work I was recently tasked with revamping our on-again/off-again cruisecontrol setup and I thought to myself "there has got to be something better." It turns out there is, it's called <a href="http://github.com/foca/integrity/tree/master">Integrity</a>. Here's why I love this little piece of software.
</p>
<ul>
  <li>works fine with github repos, public and private</li>
  <li>emails me reliably so I don't have to check a web ui to know what's up</li>
  <li>automatically works with the Post-Receive hooks github offers, including branch support</li>
  <li>excellent test coverage, it's was at 100% last time I hacked on it</li>
  <li>works off an sqlite3 database</li>
  <li>keeps history of test runs</li>
  <li>written in datamapper and sinatra</li>
  <li>they've got lighthouse setup ( <a href="http://integrity.lighthouseapp.com/projects/14308-integrity/overview">here</a>)</li>
</ul>
<h1>Random Tidbits</h1>
<p>The README on the integrity site is a great start, but here's a few extra things that we're using that you might be interested in.</p>
<h2>Process Management</h2>
<p>We're just running bin/integrity like the README says under <a href="http://www.gnu.org/software/screen/">GNU Screen</a>.  It hasn't crashed and doesn't seem to be leaking.</p>
<h2>Private Repo Access</h2>
<p>We're using <a href="http://www.gentoo.org/proj/en/keychain/">keychain</a> and github deploy keys to access our source code from crons and the ci process.</p>
<h2>The Github Hooks are AWESOME</h2>
<p>A lot of the time a simple CI setup will just 'svn up' or 'git pull' and run the latest version that it pulls down.  The github hooks actually send SHA1 hashes for each commit that a person makes.  If one of your co-workers bundles half a dozen commits and he broke the build in the middle, you'll be able to identify which commit caused the problem instead of reviewing each commit and possibly running them all yourself.  It's this easy:</p>
<ul>
  <li>Click Edit on your github project(<a href="http://atmos.org/photos/photo/2890620312/click-edit.html">example</a>)</li>
  <li>Enter your Post-Receive url(<a href="http://atmos.org/photos/photo/2889784601/integrity-post-receive-setup.html">example</a>)</li>
</ul>
<h1>Can it get any better?</h1>
<p>I'd really like to see some async build process for Integrity, or perhaps some <a href="http://devver.net/">devver</a> integration.  It's a pretty solid product and it keeps improving.</p>

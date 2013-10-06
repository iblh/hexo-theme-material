--- 
layout: post
title: Creating a TDD Ruby Project
---

Where this comes from
---------------------

I'd originally wanted to do something like "how our group at <a
href="http://engineyard.com">EY</a> specs things" but I feel like a lot of
these ideas extend beyond the merb/rspec/datamapper bubble we currently develop
in. When I went through the <a href="http://integrityapp.com/">Integrity</a>
source code a couple weeks ago I realized they were doing the same things, but
with <a href="http://sinatra.github.com/">sinatra</a>, <a
href="http://github.com/jeremymcanally/context/tree/master">context</a>, and <a
href="http://github.com/jeremymcanally/matchy/tree/master">matchy</a>.  I found
it really easy to understand the integrity test suite because it was setup in a
wonderfully sane manner.  I figured I'd share a few thoughts on it since I'd
like to see more projects testing things like this.  There's nothing earth
shattering here,   In reality though, few projects I come across embrace
developers to collaborate and enhance.  If you <strong>consider</strong> these
things while creating your project, I promise, you'll be in a much better state
to collaborate.

Here's a few things that stick out in my mind:
<ul>
  <li><a href="#readme">You should have a README that tells another developer how to get up and running</a></li>
  <li><a href="#testing">You should really be testing, even if it's after the fact</a></li>
  <li><a href="#naming_tests">Name Your Tests/Specs after what it does</a></li>
  <li><a href="#mocks">Be able to toggle mocks and integration tests easily</a></li>
  <li><a href="#github">Use GitHub</a></li>
  <li><a href="#ci">How will this commit affect Continuous Integration?</a></li>
</ul>

You should have a README that tells another developer how to get up and running
-------------------------------------------------------------------------------

If some random person needs to add a feature or fix a bug in your software,
they're prolly going to have to do some setup. Maintain this README. The
easier it is to get a system bootstrapped to start developing and enhancing the
software the better.  The old timers can send you a patch via email, the new
schoolers send you <a href="http://github.com/guides/pull-requests">pull
requests</a>.  Let other people do some of the work for you. Even <a
href="http://twitter.com/drnic/statuses/952116463">Dr Nic</a> thinks it's a
good idea!

You should really be testing, even if it's after the fact
---------------------------------------------------------

I don't care how fucking smart you are, software maintenance isn't easy.  I've
seen folks argue that <a
href="http://michaelfeathers.typepad.com/michael_feathers_blog/2008/06/the-flawed-theo.html">unit
testing is fail</a>, I'm starting to agree when it comes to the web.  I'm
finding that if you're actually writing tests as you're completing user stories
you naturally exercise your models.  With a code coverage tool like <a
href="http://eigenclass.org/hiki.rb?rcov">rcov</a> you can really tell which
portions of your models are being exercised fully.  If you know your stuff then
you know that rcov coverage doesn't really mean <strong>ALL</strong> that much,
but it helps.  You can then use a mutator like <a
href="https://github.com/ryansobol/heckle/tree/master">heckle</a> or <a
href="https://github.com/halorgium/boo_hiss/tree/master">boo hiss</a> to cover
your ass for the rest of your cases.  We normally employ the mutators after
we're happy with the state of the software, it helps us prepare for handling
weird errors in a more graceful manor.  You don't have to go so far as to
running mutators on your code, but you should <strong>really really</strong> be
testing.  If you don't have time to test code, perhaps it's time for you to
<strong>TAKE THE TIME</strong> to learn how to do it.  Your co-workers and
friends will thank you for it, I promise.  Even if you develop software by
changing code and refreshing your browser or running your script over and over,
you owe it to your collaborators to let them know what portions of the code are
important and what will cause major breakage if it changes.  By not testing
you're saying "I really don't care whether or not this project lives a long,
happy life."

Name Your Tests/Specs after what it does
----------------------------------------

At the first <a href="http://railsconf.org">railsconf</a> I remember <a
href="http://twitter.com/srbaker">srbaker</a> talking about rspec and how much
he hated the way rails generators generated test files.  He told me something
along the lines of "when I need to create a new spec I make it based on what
it's for."  I didn't really understand him at the time, I was still learning
how to test via the rails framework.

<img title="Checkout the names" src="http://img.skitch.com/20090130-e75wm4neriiunbcc9k18dqk2n.jpg" alt="Integrity and Braintree TR Slice" width="554" height="503" />

In the images above you can easily identify what functionality has tests.  It
annoys me to death when I open up spec/controllers/ and find specs named after
classes.  They might be empty or they might be a giant file testing all of the
functionality of the class in isolation, both cases suck.  I'm becoming more
and more fond of just creating a spec file for a user story as I implement it.
In the web space I think you should investigate <a
href="http://github.com/brynary/webrat/tree/master">webrat</a>, you can use it
with merb, sinatra, or rails.  You're basically writing acceptance tests that's
like a fake browser request with persistent sessions.  Name your acceptance
tests according to what they validate and you'll be in business.

Be able to toggle mocks and integration tests easily
----------------------------------------------------

We recently did a bunch of stuff with <a
href="http://dev.braintreepaymentsolutions.com/">braintree</a> for some payment
processing.  They provide a pretty awesome <strong><a
href="http://dev.braintreepaymentsolutions.com/test-transaction/">test
environment</a></strong> for you to test against.  I wrote a whole bunch of
specs that faked browser requests to the API server and I found their docs to
be incorrect.  Their examples worked but once I got down to requiring CVVs and
address verification, the response hashes came back inconsistently.  By really
testing the requests/responses  I was able to dm this <a
href="http://twitter.com/ch0wda">really awesome ruby developer on twitter</a>
and resolve the issue in a day or two, long before we ever went live.  If we'd
generated mocks based on the documentation alone we would've gone live with a
broken system.  You could argue that it's braintree's fault and they should
have correct documentation, but I'm not a big fan of finger pointing. Finger
pointing doesn't accomplish a damn thing when you just launched a site and it's
not completely functional.  We've started shooting for something along the
lines of "only mock things out if we can toggle a real integration test."  Some
of our apps could really use some mocking help, but the speed hit isn't really
that big of a deal when you know it's really running against the remote
service.  Of course my friend Tim has some ideas about <a
href="http://github.com/halorgium/mockz0r/tree/master">mocks</a> too.

Use GitHub
----------

I use <a href="http://whygitisbetterthanx.com/">git</a>, my homies at <a
href="http://github.com">GitHub</a> get it.  It's all I've been using since
February of 2008.  I really can't say enough good things about github, it
really simplifies things when collaborating on software.

How will this commit affect Continuous Integration?
---------------------------------------------------

You do use continuous integration, right?  Continuous Integration is just a
remote machine that runs your test suite every time someone pushes code.  I use
<a href="http://integrityapp.com/">Integrity</a>, some of my friends use <a
href="http://cruisecontrolrb.thoughtworks.com/">cc.rb</a>.  Integrity works
<strong>really frackin' well</strong> with <a
href="http://github.com/guides/post-receive-hooks">github</a>, all of my code
lives there so it makes it that much more attractive.  If I push some code, how
will my CI task handle installing any new dependencies I introduced?  Will my
co-workers want to punch me in the face because half of their day was wasted
tracking down some shit I committed?  How well do these changes work outside of
my machine?  This is stuff that you really want to consider when you
collaborate.

Collaboration is King
---------------------

Collaboration keeps bubbling to the surface here.  Perhaps I should change the
title.  These suggestions have little merit if you're not interested in
collaborating on software.  If you're not interested in collaborating on
software though, you're going the way of the dodo.  Think of all the awesome
techniques you picked up from working with other people.  Think of all the
projects you tried to use or hack on but couldn't because you couldn't get it
working.  It's up to you to make your projects easy to collaborate on.

So, what'd I forget to mention?

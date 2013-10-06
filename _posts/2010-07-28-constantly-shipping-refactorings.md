---
layout: post
title: Constantly Shipping Refactorings
excerpt: Unicorn and Zero Downtime Migrations with DataMapper
---

Recently, two of my favorite hackers, [Martin] and [Tim], have been working on a
pretty big refactoring in cloud.  In the past our team probably would've
worked in a topic branch for a few weeks, followed by a painful
rebase/merge, followed by a deployment we really hoped we got right.  Since
this refactor requires db schema changes, we'd prolly have to take the site
down for at least a few minutes to do it.  They didn't want to do it this, so
they approached the problem in a new way (to us).  Here's what they're doing.

Unicorn and Zero Downtime Migrations with DataMapper
-------------------------------------------------
We moved to unicorn the other month and have found the 0 downtime deploys
really liberating.  If something is ready to go out to customers, we ship it.
We have no planned day of the week or time of day that we ship.  On weekdays we
normally ship 5-6 times a day and no one ever notices.  DB schema changes currently
make things a little more difficult. When you add a new model, you create a
migration for it, and you ship the model with the migration.  This
is where Martin and Tim tried something new.  Instead of coupling the migration
and the model addition, they're doing the migrations before the model is
introduced to the system.

Adding a New Model
------------------
So the other day they added a new model, let's call it User.
When they wanted to introduce the User model, they did it in
two releases. In the first release they shipped a zero downtime deploy to
add the users table. The first release didn't take advantage of
the user model, it was just a normal deploy with the migrations running AFTER
the unicorn processes had restarted. In the second release they shipped the
User model in another zero downtime deploy that actually started USING the users
tabel. Adding a table is pretty trivial if you think about it, but what about removing a column?

Data Transformation/Migration
-----------------------------
Have you ever had to rollback a deployment that had data migrations?  You need
to go find your latest database backup, restore that, extend the outage you
took because you hadn't planned on things going south.  It's insanely stressful
and makes you look like a jackass to your co-workers.  Your customers won't like
it either.

Removing a Column from a Model
------------------------------
Let's say that during the refactoring they discovered some insanity in our
system: tokens in two places, one on the User model and one on the
associated class Customer.  First deployment they tracked down all the places
where the attribute, in this case 'token', was accessed directly and removed
it.

Here's an example of the User class before the changes:

    class User
      include DataMapper::Resource

      property :id,              Serial
      property :token,           String, :required => true,
      belongs_to :customer,      Integer

      def valid_token?
        token == some_token_verification_method
      end
    end

Here's an example of the User class after the changes:

    class User
      include DataMapper::Resource

      property :id,              Serial
      belongs_to :customer,      Integer

      def valid_token?
        customer.token == some_token_verification_method
      end
    end

When this code deploys, the User table still has the token field.
Shortly after that, they shipped another release with a migration that only
removed the newly unused column. Again, 0 downtime.  Guess how we do
tables?  The same way.


Renaming a column
-----------------
Renaming a column is kinda weird because it takes 4 deploys.  On the first deploy,
create the new, unused column.
On the second deploy, introduce code that starts using the new column and
denormalizes the attributes as they're accessed. This deploy also carries a zero downtime migration that copies the attribute over to the new column. All access to the attribute is now directed to the correct column. On the third deploy, remove all reference to the old
column. Finally on the fourth deploy, nuke the old column after the deploy
completes.  For an example of how the new column usage works, check this snippet out.

    class User
      include DataMapper::Resource

      property :id,              Serial
      property :token,           String, :required => true,
      property :tos_accepted,    Boolean, :default  => false
      property :admin,           Boolean, :default  => false
      property :administrator,   Boolean, :default  => false

      timestamps :at

      def admin
        value = attribute_get(:admin)
        value.nil? ? copy_admin : value
      end

      def admin?
        admin
      end

      def copy_admin
        unless update(:admin => adminstrator)
          raise "Could not save user: #{errors.full_messages.join(", ")}"
        end
        admin
      end
    end

It's so simple, who cares?
--------------------------
One thing I really love about this is the guys are constantly shipping
incremental improvements.  There won't be an evening where they're forced to
work late to ship out their schema changes.  You'll never hear them cursing
other developers for introducing changes that mess with their refactoring.
Even though they're focused on a very large refactoring, they're never a few
days off from having something to show.  You can watch their progress as the
commits flow by.  They never entered the mindset that it's ok to get lost in
refactoring wonderland.  Solving a problem elegantly doesn't mean you have to
go sit and think up the most beautiful solution ever. Break it down into little
pieces and ship 'em.

Tim, Martin, and I are in the process of automating these kinds of rollouts. We're testing it right now.

Hiring
------
We're also [hiring right now].  Send [me] a message on [github] if you're
interested in working with a top notch group of hackers.

[me]: http://github.com/atmos
[Tim]: http://github.com/halorgium
[Martin]: http://github.com/martinemde
[github]: http://github.com
[hiring right now]: http://www.engineyard.com/company/careers/ruby-engineers

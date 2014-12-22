Title: Git
Type: cheatsheet
Date: 2014-12-22 10:30
Modified: 2014-12-22 11:41
Slug: cheatsheet/git
Authors: iocast
Summary: Git commands


[TOC]


## Settings
### Username

in a local git repo

	git config user.name "iocast"
	git config user.email "iocast@me.com"


or for global settings

	git config --global user.name "iocast"
	git config --global user.email "iocast@me.com"


## General

download from git repository (normally branch 'master')

	git clone <remote_repo>

download specific branch

	git clone -b <branch> <remote_repo>

commit changes (check if you are on the correct branch)

	git commit -m "message"


### Push / Pull

send branch to repository/server

	git push origin <branch>

get branch from repository/server (update)

	git pull origin <branch>

resetting local repository

	git reset --hard origin/master


### Branching

list all branches

Options:

`-a`
: lists all branches

	git branch [options]

create local branch

	git branch develop

delete a branch (origin - server)

	git branch -d develop
	git push origin --delete develop

switch branch to work on it

	git checkout develop

push branch to repository/server

	git push origin <name>

### Tagging

first of all switch to master

	git checkout master

and if necessary merge from a other branch

	git merge --no-ff <branch>

create tag

	git tag -a 1.2 -m "message"

push to repository/server

	git push --tags

list tags

	git tag

change to tag

	git checkout <tag>

or make changes based on this tag (e.g. for hotfixes for this specific tag) where the first argument is the new branch name an the second is the tag name

	git checkout -b hotfix-1.3.1 1.3


## Release Managment
assume we are working on branch 'develop' an are ready to create a new release.

### Releases

#### Creating

Switched to a new branch "release-1.2"

	git checkout -b release-1.2 develop

change version number on the notes or other files and commit it

	git commit -a -m "Bumped version number to 1.2"


#### Working

then modify all files needed for release-1.2 and commit changes (several commits can take place)

	git commit -m "message"

#### Finishing

Now we can finish this release.
Switch to branch 'master'

	git checkout master

merge from the release-1.2 branch and push to repository/server

	git merge --no-ff release-1.2
	git push origin master

tag as release in branch master and push tag to repository/server

	git tag -a 1.2 -m "message"
	git push --tags

release banch on our local drive is not needed anymore.
Deleted branch release-1.2

	git branch -d release-1.2


### Hot Fixes
Hot fixes are done from the master (or release) branch.

#### Creating

Switched to a new branch "hotfix-1.2.1"

	git checkout -b hotfix-1.2.1 master

change version number on the notes or other files and commit it

	git commit -a -m "Bumped version number to 1.2.1"


#### Working

then modify all files needed files for hotfix-1.21 and commit changes (several commits can take place)

	git commit -m "message"

#### Finishing
Switched to branch 'master'

	git checkout master

merge changes

	git merge --no-ff hotfix-1.2.1

tag it and push tag to repository/server

	git tag -a 1.2.1 -m "message"
	git push --tag

switch to develop and merge hotfix into it

	git checkout develop
	git merge --no-ff hotfix-1.2.1

and delete hotfix

	git branch -d hotfix-1.2.1




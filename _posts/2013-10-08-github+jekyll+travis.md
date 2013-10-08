---
layout: post
title: Creating your own blog using github pages, jekyll and travis
author: iocast
excerpt: Github overs gh-pages to create a own site for personal or project usage. Together with jekyll you are able to create your own blog and using Travis CI enables automatic building of your blog.
categories: blog
tags:
- github
- jekyll
- travis
---

Github offers at the tme of writing three differnt types of pages: for [users, organizations and projects][github-pages]. For th users and organizations the ```master``` branch is going to be used to deploy as static web page. For projects, means in a repository which is not called ```username.github.io```, a subpath of the user pages would be created ```username.github.io/projectname```.

Hence this post is going to discuss the a simple workflow using [Github's][github] user pages, [jekyll][] as blog and pseudo dynamic page, [travis][] as our continous integration solution for deployment purposes.

# Github

First setup a new user page on Github using for example the page generator or simply setting up a new repository called ```username.github.io```. Github will automatically create a new ```master``` branch which is used for deploying the content to the web server. In our case, we need to have a seperate branch for our blog which is setup using [jekyll][]. Therefore create a new branch e.g. called ```develop``` as follow

{% highlight bash %}
# Creates our branch, without any parents (it's an orphan!)
git checkout --orphan develop
# Remove all files from the old working tree
git rm -rf .

echo "My GitHub Page" > index.html
git add index.html
git commit -a -m "First pages commit"
git push origin develop
{% endhighlight %}


Now we are ready to add our [jekyll][] page to this ```develop``` branch.

# Jekyll



# Travis CI



[github]: http://github.com/ "Github"
[jekyll]: http://jekyllrb.com "Jekyll"
[travis]: http://travis-ci.org "Travis CI"
[github-pages]: https://help.github.com/articles/user-organization-and-project-pages "Github Pages (Help)"

Title: Python PyPi
Type: cheatsheet
Date: 2014-12-22 10:30
Modified: 2014-12-22 11:41
Slug: cheatsheet/pypi
Authors: iocast
Summary: Python PyPi commands


[TOC]

## Comands

### registration

	python setup.py register

### update

`bdist`: create a built (binary) distribution<br/>
`sdist`: create a source distribution (tarball, zip file, etc.)

	python setup.py sdist upload

### configuration file

is called `.pypirc`, is located in your home direve `~` and has the following structure

	[distutils]
	index-servers =
    	pypi
    	other
	
	[pypi]
		repository: <repository-url>
		username: <username>
		password: <password>
	
	[other]
		repository: http://example.com/pypi
		username: <username>
		password: <password>

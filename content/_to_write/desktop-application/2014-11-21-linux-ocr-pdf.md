Title: f
Author: iocast
Date: 2014-11-21
Summary: a
Category: Desktop Application
Tags: development, javascript, nodejs, node-webkit, node-sqlite3, sqlite
Slug: linux-ocr-pdf



Base ocr recgonition application

	apt-get install tesseract-ocr tesseract-ocr-eng tesseract-ocr-deu

For creating PDF/A compatible searachable PDF i use `OCRmyPDF` which is at time of writing not available over Ubuntu's default package manager. So install dependencies manually.

	apt-get install imagemagick parallel unpaper

Do not forget to install Java. You could also use OpenJDK version 8 if you like.

	apt-get install openjdk-7-jre

Download latest version from github and extract it. I used `/opt`. change the owner and permissions

	chmod -R root:root /opt/OCRmyPDF-x.x-stable
	chmod -R 755 /opt/OCRmyPDF-x.x-stable

when running it for the first time it will install all dependencies.

	sudo sh ./OCRmyPDF.sh -h

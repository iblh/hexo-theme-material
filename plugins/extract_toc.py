# -*- coding: utf-8 -*-
"""
Extract Table of Content
========================

A Pelican plugin to extract table of contents (ToC) from `article.content` and
place it in its own `article.toc` variable for use in templates.
"""

from os import path
from bs4 import BeautifulSoup
from pelican import signals, readers, contents


def extract_toc(content):
    if isinstance(content, contents.Static):
        return
	
    soup = BeautifulSoup(content._content,'html.parser')
    filename = content.source_path
    extension = path.splitext(filename)[1][1:]
    toc = None
    # if it is a Markdown file
    if extension in readers.MarkdownReader.file_extensions:
        toc = soup.find('div', class_='toc')
        if toc: toc.extract()
    # else if it is a reST file
    elif extension in readers.RstReader.file_extensions:
        toc = soup.find('div', class_='contents topic')
        if toc: toc.extract()
        if toc:
            tag=BeautifulSoup(str(toc))
            tag.div['class']='toc'
            tag.div['id']=''
            p=tag.find('p', class_='topic-title first')
            if p:p.extract()
            toc=tag
    elif not toc:  # Pandoc reader
        toc = soup.find('nav', id='TOC')
    if toc:
        toc.extract()
        content._content = soup.decode()
        content.toc = toc.decode()
	
def register():
    signals.content_object_init.connect(extract_toc)
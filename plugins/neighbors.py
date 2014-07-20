# -*- coding: utf-8 -*-
"""
Neighbor Articles Plugin for Pelican
====================================

This plugin adds ``next_article`` (newer) and ``prev_article`` (older) 
variables to the article's context
"""
from pelican import signals

def iter3(seq):
    it = iter(seq)
    nxt = None
    cur = next(it)
    for prv in it:
        yield nxt, cur, prv
        nxt, cur = cur, prv
    yield nxt, cur, None

def get_translation(article, prefered_language):
    if not article:
        return None
    for translation in article.translations:
        if translation.lang == prefered_language:
            return translation
    return article

def set_neighbors(articles, next_name, prev_name):
    for nxt, cur, prv in iter3(articles):
        exec("cur.{} = nxt".format(next_name))
        exec("cur.{} = prv".format(prev_name))

        for translation in cur.translations:
            exec(
            "translation.{} = get_translation(nxt, translation.lang)".format(
                next_name))
            exec(
            "translation.{} = get_translation(prv, translation.lang)".format(
                prev_name))
      
def neighbors(generator):
    set_neighbors(generator.articles, 'next_article', 'prev_article')
    
    for category, articles in generator.categories:
        articles.sort(key=(lambda x: x.date), reverse=(True))
        set_neighbors(
            articles, 'next_article_in_category', 'prev_article_in_category')

    if hasattr(generator, 'subcategories'):
        for subcategory, articles in generator.subcategories:
            articles.sort(key=(lambda x: x.date), reverse=(True))
            index = subcategory.name.count('/')
            next_name = 'next_article_in_subcategory{}'.format(index)
            prev_name = 'prev_article_in_subcategory{}'.format(index)
            set_neighbors(articles, next_name, prev_name)

def register():
    signals.article_generator_finalized.connect(neighbors)

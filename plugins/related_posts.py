"""
Related posts plugin for Pelican
================================

Adds related_posts variable to article's context
"""

from pelican import signals
from collections import Counter


def add_related_posts(generator):
    # get the max number of entries from settings
    # or fall back to default (5)
    numentries = generator.settings.get('RELATED_POSTS_MAX', 5)
    for article in generator.articles:
        # set priority in case of forced related posts
        if hasattr(article,'related_posts'):
            # split slugs 
            related_posts = article.related_posts.split(',')
            posts = [] 
            # get related articles
            for slug in related_posts:
                i = 0
                for a in generator.articles:
                    if i >= numentries: # break in case there are max related psots
                        break
                    if a.slug == slug:
                        posts.append(a)
                        i += 1

            article.related_posts = posts
        else:
            # no tag, no relation
            if not hasattr(article, 'tags'):
                continue

            # score = number of common tags
            scores = Counter()
            for tag in article.tags:
                scores += Counter(generator.tags[tag])

            # remove itself
            scores.pop(article)

            article.related_posts = [other for other, count 
                in scores.most_common(numentries)]

def register():
    signals.article_generator_finalized.connect(add_related_posts)
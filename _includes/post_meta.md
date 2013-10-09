<div class="meta_wrapper">
    <time datetime="{{page.date | date: "%Y-%m-%d"}}">{{page.date | date: "%B %e, %Y"}}</time>
    <ul class="tag_list_in_post">
    {% for tag in page.tags %}
        <li class="inline tag_list_item"><a class="tag_list_link" href="/tag/{{ tag }}">{{ tag }}</a></li>
    {% endfor %}
    </ul>
</div>

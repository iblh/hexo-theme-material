hexo.extend.helper.register("page_title", function () {
  var title = this.page.title;

  if (this.is_archive()) {
    title = "Archives";

    if (this.is_month()) {
    title += ': ' + this.page.year + '/' + this.page.month;
    } else if (this.is_year()) {
      title += ": " + this.page.year;
    }
  } else if (this.is_category()) {
    title = "Category: " + this.page.category;
  } else if (this.is_tag()) {
    title = "Tag: " + this.page.tag;
  }

  return title;
});

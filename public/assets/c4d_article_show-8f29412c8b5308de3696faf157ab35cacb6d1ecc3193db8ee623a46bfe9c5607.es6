$(() => {
  let padding = $('#nav_bar').outerHeight() + 1
  padding += "px"
  $('#c4d_article_show_page').css({ paddingTop: padding })
  let info_column_height = $('#c4d_article_show_info_column').outerHeight()
  let article_content_column_height = $('#c4d_article_show_table').outerHeight()
  if (info_column_height > article_content_column_height) {
    $('#c4d_article_show_table').css({ height: info_column_height })
  } else {
    $('#c4d_article_show_info_column').css({ height: article_content_column_height })
  }
})

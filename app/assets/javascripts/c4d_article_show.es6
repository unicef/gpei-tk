$(() => {
  $('#c4d_article_show_modal').on('click', '#c4d_close_icon a', e => {
    e.preventDefault()
    $('#c4d_article_show_modal').modal('hide')
    return false
  })
  $('#c4d_article_show_modal').on('click', '.c4d_grid_check', e => {
    let $grid_tile = $('#c4d_category_grid').find('#'+e.currentTarget.parentElement.id)
    let $add = $grid_tile.find('.c4d_grid_add')
    let $check = $grid_tile.find('.c4d_grid_check')
    toggleVisibility($check)
    toggleVisibility($add)
  })
  $('#c4d_article_show_modal').on('click', '.c4d_grid_add', e => {
    let $grid_tile = $('#c4d_category_grid').find('#'+e.currentTarget.parentElement.id)
    let $add = $grid_tile.find('.c4d_grid_add')
    let $check = $grid_tile.find('.c4d_grid_check')
    toggleVisibility($check)
    toggleVisibility($add)
  })
  function toggleVisibility(element) {
    if (element.css('visibility') === 'hidden')
      element.css('visibility', 'visible')
    else
      element.css('visibility', 'hidden')
  }
  $('#cgi_c4d_print_icon_link').click(e => {
    e.preventDefault()
    $('#application').after($('#cgi_c4d_article_show').html())
    $('#application').after($('#cgi_c4d_article_show_header').html())
    $('#application').css({ display: 'none' })
    window.print()
    $('#application').nextAll().remove()
    $('#application').css({ display: 'block' })
  })
  $('#cgi_c4d_email_icon_link').click(e => {
    e.preventDefault()
    window.location.href=`mailto:?subject=C4D Article: ${$('#c4d_category_and_article_title').html()}&body=Click <a href='${window.location.protocol + '//' + window.location.host}/c4d_articles/${$('#c4d_add_to_toolkit_text').parent().attr('id')}' target='_blank'>here</a> to view the shared article!`;
  })
})
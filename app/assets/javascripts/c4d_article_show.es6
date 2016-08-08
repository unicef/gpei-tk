$(() => {
  $('#c4d_article_show_modal').on('click', '#c4d_close_icon', e => {
    e.preventDefault()
    $('#c4d_article_show_modal').modal('hide')
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
})
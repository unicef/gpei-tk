$(() => {
  let $grid = $('#c4d_category_grid').isotope({
    itemSelector: '.c4d_grid_item'
  })
$('.c4d-filters-button-group').on('click', 'button', e => {
  let filterValue = $(e.currentTarget).attr('data-filter')
  $grid.isotope({ filter: filterValue })
})
// change is_checked class on buttons
$('.button-group').each((i, buttonGroup) => {
  let $buttonGroup = $(buttonGroup)
  $buttonGroup.on('click', 'button', e => {
    $buttonGroup.find('.is_checked').css('background-color', 'transparent')
    $buttonGroup.find('.is_checked').removeClass('is_checked')
    let category_text = $(e.currentTarget).text()
    let color = getColorClass(category_text)
    $(e.currentTarget).addClass('is_checked')
    $(e.currentTarget).css('background-color', color)
  })
})
function getColorClass(category_text) {
  if (category_text === 'Understand')
    return '#8DA900'
  else if (category_text === 'Plan')
    return '#0735AC'
  else if (category_text === 'Act')
    return '#008953'
  else if (category_text === 'Tools')
    return '#009DA4'
}
function toggleVisibility(el) {
  if ($(el).css('visibility') == 'hidden' )
    $(el).css('visibility','visible')
  else
    $(el).css('visibility','hidden')
}
let $add = $('.c4d_grid_add')

$add.click(e => {
  e.preventDefault()
  let article_title = e.currentTarget.parentElement.querySelector('.c4d_grid_item_article_title').innerHTML
  let article_id = e.currentTarget.parentElement.id
  $.ajax({
    method: 'POST',
    url: '/c4d/toolkit/',
    data: { title: article_title, id: article_id }
  }).done(response => {
    toggleVisibility(e.currentTarget)

    let grid_check = e.currentTarget.nextElementSibling

    toggleVisibility(e.currentTarget.nextElementSibling)
    let article_id = response.id
    let list_item = "<div id=\"" + article_id + "\" class=\"item\"><a class=\"white_text_black_bg\" href=\"/c4d_articles/" + article_id + "\">" + article_title + "</a> <i id=\"" + article_title + "\" class=\"fa fa-remove white_text_black_bg\" aria-hidden=\"true\"></i></div>"
    removeNoArticlesSelected('#c4d_no_items_selected')
    $('#c4d_toolkit_list').append(list_item)
  })
})
function removeNoArticlesSelected(ele) {
  let el = "#c4d_toolkit_list " + ele
  $(el).remove()
}

let $remove = $('.c4d_grid_check')
$remove.click(e => {
  e.preventDefault()
  let article_title = e.currentTarget.parentElement.querySelector('.c4d_grid_item_article_title').innerHTML
  let article_id = e.currentTarget.parentElement.id
  $.ajax({
    method: 'DELETE',
    url: '/c4d/toolkit/',
    data: { title: article_title, id: article_id }
  }).done(response => {
    toggleVisibility(e.currentTarget)

    let grid_check = e.currentTarget.previousElementSibling

    toggleVisibility(e.currentTarget.previousElementSibling)
    let article_list_item = '#c4d_toolkit_list #'+response.id
    $(article_list_item).remove()
    checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
  })
})

$('#c4d_toolkit_list').on('click', 'i', e => {
  e.preventDefault()
  let article_title = e.currentTarget.id
  let parent_element = e.currentTarget.parentElement
  $.ajax({
    method: 'DELETE',
    url: '/c4d/toolkit/',
    data: { title: article_title, id: parent_element.id }
  }).done(response => {
    let $grid_tile = $('#c4d_category_grid #'+ parent_element.id)
    let $check_icon = $grid_tile.find('.c4d_grid_check')
    let $add_icon = $grid_tile.find('.c4d_grid_add')
    toggleVisibility($check_icon)
    toggleVisibility($add_icon)
    let c4d_toolkit_list_item = '#c4d_toolkit_list #' + parent_element.id
    $(c4d_toolkit_list_item).remove()
    checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
  })
})

function checkIfArticlesSelectedAndAppend(el_id){
  let items = el_id + " .item"
  if ($(items).length === 0) {
    let list_id = el_id
    let no_items = "<div id=\"c4d_no_items_selected\" class=\"item white_text_black_bg\">No articles selected</div>"
    $(list_id).append(no_items)
  }
}

})
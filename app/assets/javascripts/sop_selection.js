$(() => {
  $('.ui.dropdown')
    .dropdown({
      on: 'hover',
      action: 'nothing'
    });

  let $container = $('#isotope_container').isotope({
    itemSelector: '.grid_item'
  })

  // clear-all filter listener
  let $filter_clear = $('#sop_filter_clear_all')
  let $checkboxes = $('.sop_checkboxes input')
  $filter_clear.click(e => {
    e.preventDefault()

    for (let idx = 0; idx < $checkboxes.length; idx++)
      $checkboxes[idx].checked = false

    $('#selected_filters_output').empty()
    $container.isotope({ filter: '*' })
    autoAdjustSopFilterHeights()
    return false
  })

  //isotope listener
  let $output = $('#sop_filter')
  $checkboxes.change(() => {
    updateIsotope()
    autoAdjustSopFilterHeights()
  })

  function updateIsotope(){
    let inclusives = []
    let checked_labels = ''
    $checkboxes.each((i, elem) => {
      if (elem.checked)
      {
        inclusives.push(elem.value)
        let elem_value = elem.value.replace(/\./g,"").replace(/_/g," ")
        checked_labels += `<div id="filter_output_label" class="ui label"><span id="${elem.value}">${elem_value} </span><a href=''><i style="color:black;" class="fa fa-times" aria-hidden="true"></i></a></div>`
      }
    })
    $('#selected_filters_output').empty()
    $('#selected_filters_output').append(checked_labels)
    let filterValue = inclusives.length ? inclusives.join(', ') : '*'
    $container.isotope({ filter: filterValue })
    filterValue = filterValue === '*' ? '' : filterValue
    // $output.html("<li id=\"checklist_article\">" + filterValue + "</li>")
  }

  function autoAdjustSopFilterHeights() {
    $('#select_filter_dropdown_menu').height($('#selected_filters_output').height())
    $('#sop_filter_clear_all').height($('#selected_filters_output').height())
  }

  $('#selected_filters_output').on('click', 'a', e => {
    e.preventDefault()
    let target_id = e.currentTarget.parentElement.children[0].id
    let target_query = `:input[value="${target_id}"]`
    let target_checkbox = $(target_query)
    target_checkbox.attr('checked', false)
    updateIsotope()
    autoAdjustSopFilterHeights()
    return false
  })
  function toggleVisibility(el) {
    if ($(el).css('visibility') == 'hidden' )
      $(el).css('visibility','visible')
    else
      $(el).css('visibility','hidden')
  }
  let $add = $('#isotope_container .grid_add')

  $add.click(e => {
    let article_title = e.currentTarget.parentElement.querySelector('#grid_item_article_title').id
    let article_id = e.currentTarget.parentElement.id
    $.ajax({
      method: 'POST',
      url: '/sop/checklist/',
      data: { title: article_title, id: article_id, authenticity_token: escape($('meta[name=csrf-token]').attr('content')) }
    }).done(response => {
      toggleVisibility(e.currentTarget)

      let grid_check = e.currentTarget.nextElementSibling

      toggleVisibility(e.currentTarget.nextElementSibling)

      let article_title = response.article_title
      let id = response.id
      let list_item = "<div id=\"" + id + "\" class=\"item white_text_black_bg\"><a href=\"sop_articles/" + id + "\" class=\"white_text_black_bg\">" + article_title + "</a> <i id=\"" + article_title + "\" class=\"fa fa-remove\" aria-hidden=\"true\"></i></div>"
      removeNoArticlesSelected('#sop_no_items_selected')
      $('#sop_checklist_list').append(list_item)
    })
    return false
  })
  function removeNoArticlesSelected(ele) {
    let el = "#sop_checklist_list " + ele
    $(el).remove()
  }

  let $remove = $('#isotope_container .grid_check')
  $remove.click(e => {
    let article_id = e.currentTarget.parentElement.id
    let article_title = e.currentTarget.parentElement.querySelector('#grid_item_article_title').innerHTML
    $.ajax({
      method: 'DELETE',
      url: '/sop/checklist/',
      data: { title: article_title, id: article_id }
    }).done(response => {
      toggleVisibility(e.currentTarget)

      let grid_check = e.currentTarget.previousElementSibling

      toggleVisibility(e.currentTarget.previousElementSibling)

      let article_list_item = '#sop_checklist_list #' + response.id
      $(article_list_item).remove()
      checkIfArticlesSelectedAndAppend('#sop_checklist_list')
    })
    return false
  })

  $('#sop_checklist_list').on('click', 'i', e => {
    let title = e.currentTarget.id
    let parent_element = e.currentTarget.parentElement
    $.ajax({
      method: 'DELETE',
      url: '/sop/checklist/',
      data: { id: parent_element.id, title: title }
    }).done(response => {
      let $grid_tile = $('#isotope_container #' + response.id)
      if (_.isEmpty($grid_tile)) {
        let $check_icon = $('#sop_article_logo_row .grid_add')
        let $add_icon = $('#sop_article_logo_row .grid_check')
        toggleVisibility($check_icon)
        toggleVisibility($add_icon)
      } else {
        let $check_icon = $('#isotope_container #'+ response.id + ' .grid_add')
        let $add_icon = $('#isotope_container #'+ response.id + ' .grid_check')
        toggleVisibility($check_icon)
        toggleVisibility($add_icon)
      }
      let sop_checklist_list_item = '#sop_checklist_list #' + response.id
      $(sop_checklist_list_item).remove()
      checkIfArticlesSelectedAndAppend('#sop_checklist_list')
    })
    return false
  })

  function checkIfArticlesSelectedAndAppend(el_id){
    let items = el_id + " .item"
    if ($(items).length === 0) {
      let list_id = el_id
      let no_items = "<div class=\"item\" id=\"sop_no_items_selected\">No articles selected</div>"
      $(list_id).append(no_items)
    }
  }

  // stick to top if scrolled
  function affixTop() {
    let offset = $('#nav_bar').height()
    offset += $('#sop_grid_filter_row').height()
    $("#sop_grid_filter_row").affix({
      offset: {
        top: offset
      }
    })
  }

  if ($('#nav_bar').length > 0)
    affixTop()
})
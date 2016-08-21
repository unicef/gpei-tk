$(() => {
  $('#select_filter_dropdown_menu').dropdown({
    on:'hover',
    action:'nothing'
  })

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
        checked_labels += `<div id="filter_output_label" class="ui label"><span id="${elem.value}">${elem_value} </span><a href=''><i class="fa fa-times" aria-hidden="true"></i></a></div>`
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
      data: {
        title: article_title,
        id: article_id,
        authenticity_token: _.escape($('meta[name=csrf-token]').attr('content'))
      }
    }).done(response => {
      toggleVisibility(e.currentTarget)

      let grid_check = e.currentTarget.nextElementSibling

      toggleVisibility(e.currentTarget.nextElementSibling)

      let article_title = response.article_title
      let id = response.id
      let list_item = "<div id=\"" + id + "\" class=\"item\"><a href=\"sop_articles/" + id + "\" class=\"white_text_black_bg\">" + article_title + "</a> <i id=\"" + article_title + "\" class=\"fa fa-remove white_text_black_bg\" aria-hidden=\"true\"></i></div>"
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
      data: {
        title: article_title,
        id: article_id,
        authenticity_token: _.escape($('meta[name=csrf-token]').attr('content'))
      }
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
      data: {
        id: parent_element.id,
        title: title,
        authenticity_token: _.escape($('meta[name=csrf-token]').attr('content'))
       }
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
  let padding = $('#nav_bar').outerHeight() + 1
  padding += "px"
  $('#sop_selection_page').css({ paddingTop: padding })
  let height = $('#sop_filter_clear_all').innerHeight()
  $('#select_filter_dropdown_menu').css({ height: height })

  // sop article modal
  $('#sop_article_show_modal').modal({
    onHide: () => {
      $('#sop_article_show_modal .content').empty()
      $('#sop_article_show_modal .header').empty()
    }
  })

  $('.grid_item').click(e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: '/sop_articles/' + e.currentTarget.id
    }).done(response => {
      $('#sop_article_show_modal').modal('show')
      let content = sop_article_content({ article: response.article,
                                          sop_categories: response.sop_categories,
                                          sop_times: response.sop_times,
                                          current_user: response.current_user,
                                          checklist_articles: response.checklist_articles,
                                          reference_links: response.reference_links,
                                          sop_related_topics: response.sop_related_topics })
      let header = sop_article_header({ article: response.article,
                                        sop_times: response.sop_times,
                                        sop_categories: response.sop_categories })
      $('#sop_article_show_modal .header').append(header)
      $('#sop_article_show_modal .content').append(content)
      let outerHeight = $('#sop_article_show_modal').outerHeight()
      outerHeight = outerHeight - $('#sop_article_show_modal .header').outerHeight()
      $('#sop_article_show_info_column').css({ height: outerHeight })
    })
  })
  function sop_article_header(params) {
    return `
      <div id="sop_article_show_header" class='row' style='color:white;background-color:${ params['sop_times'][params['article'].sop_time_id-1].color } ;'>
        <div id='sop_category_and_article_title' class='col-md-12 text-center' style='background-color:${ params['sop_times'][params['article'].sop_time_id-1].color } ;color:${get_color_for_sop_time(params['sop_times'][params['article'].sop_time_id-1].period)}'>${ params['sop_categories'][params['article'].sop_category_id-1].title } - ${ params['article'].title }</div>
        <div id='sop_close_icon' class='text-right'><a href=''>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></a></div>
      </div>`
  }
  function get_color_for_sop_time(article_time) {
    let special_categories = ['14 Days to Close']
    if (_.includes(special_categories, article_time))
      return 'black'
    else
      return 'white'
  }

  function sop_article_content(params) {
    return `
      <div id="sop_article_show_page">
        <div id="sop_article_show_info_column" class='col-md-3'>
          <div id="sop_article_show_info_column_content">
            ${ getRelatedTopicsDiv(params['sop_related_topics']) }
            ${ getReferenceLinksDiv(params['reference_links']) }
          </div>
        </div>
        <div id='sop_article_content_div' class='col-md-9' class='black_text'>
          ${ getAddToToolkitRow(params) }
          <div id='sop_article_content'>
            ${ params['article'].content }
          </div>
        </div>
      </div>
`
  }
  function getAddToToolkitRow(params){
    return (
      `<div class='sop_email_icon'>
        <a id='sop_email_icon_link' href=''><i class="fa fa-envelope" aria-hidden="true"></i></a>
      </div>
      <div class='sop_print_icon'>
        <a id='sop_print_icon_link' href=''><i class="fa fa-print" aria-hidden="true"></i></a>
      </div>
      <div id="${ params['article'].id }" class='text-center'>
        <div id='sop_add_to_toolkit_text'>ADD TO MY TOOLKIT</div>
      </div>
      <div id="${ params['article'].id }" class='sop_modal_article_icons'>
        <p class="sop_grid_item_article_title ${ params['article'].title }" style='display:none;visibility:hidden;'>${ params['article'].title }</p>
        <a id='${ params['article'].id }' class='sop_grid_add' href='' style="${ sop_style_visible('add', params['current_user'], params['article'], params['checklist_articles']) };"><i class="fa fa-plus" aria-hidden="true"></i></a>
        <a id='${ params['article'].id }' class='sop_grid_check' href='' style="${ sop_style_visible('check', params['current_user'], params['article'], params['checklist_articles']) };"><i class="fa fa-check" aria-hidden="true"></i></a>
        <div class='row text-center' style='display:none;visibility:hidden;'>
          <ul class="list-unstyled">
            <li id="sop_article_show_subcategory_text">${ params['sop_times'][params['article'].sop_time_id - 1].period }</li>
            <li id="sop_article_show_article_title_text">${ _.capitalize(params['article'].title) }</li>
          </ul>
        </div>
      </div>`)
  }
  function getRelatedTopicsDiv(related_topics){
    let content = ''
    if (!_.isEmpty(related_topics)) {
      content = `
        <div class='row'>
          <div id='related_topics_header' class='row text-left'>
            <strong>JUMP TO:</strong>
          </div>
          <ul id="related_topics_list" class='list-unstyled'> ${_.map(related_topics, article => {
            return `<li><i class="fa fa-angle-right fa-lg" aria-hidden="true"></i>&nbsp;<a id='${article.id}' href='/sop_articles/${article.id}' class="black_text">${article.title}</a></li>`
          }).join('\n')}
          </ul>
        </div>`
    }
    return content
  }

  function getReferenceLinksDiv(reference_links){
    let content = ""
    if (!_.isEmpty(reference_links)) {
      content = "<div class='row'><div id='sop_show_references'><strong>REFERENCES:</strong>" +
        _.map(reference_links, reference_link => {
          return `<a href="${reference_link.url}">${reference_link.document_file_name}</a>`
        }).join('\n')
    }
    content = content + "</div></div>"
    return content
  }

  function sop_style_visible (icon, user, article, checklist_articles) {
    let visibility_style = ''
    if (icon === 'add') {
      visibility_style = 'visibility:visible'
      if (!_.isNull(user)){
        _.forEach(checklist_articles, check_list_article => {
          if (check_list_article.title === article.title)
            visibility_style = 'visibility:hidden'
        })
      }
      return visibility_style
    }
    else {
      visibility_style = 'visibility:hidden'
      if (!_.isNull(user)){
        _.forEach(checklist_articles, check_list_article => {
          if (check_list_article.title === article.title)
            visibility_style = 'visibility:visible'
        })
      }
      return visibility_style
    }
  }
  $('#sop_article_show_modal').on('click', '#sop_print_icon_link', e => {
    e.preventDefault()
    $('#application').after($('#sop_article_show_modal #sop_article_content').html())
    $('#application').after($('#sop_article_show_modal .header').html())
    $('#application').css({ display: 'none' })
    let current_url = document.URL
    window.print()
    $('#application').nextAll().remove()
    $('#application').css({ display: 'block' })
  })
  $('#sop_article_show_modal').on('click', '#sop_email_icon_link', e => {
    e.preventDefault()
    window.location.href=`mailto:?subject=C4D Article: ${$('#sop_category_and_article_title').html()}&body=Click <a href='${window.location.protocol + '//' + window.location.host}/sop_articles/${$('#sop_add_to_toolkit_text').parent().attr('id')}' target='_blank'>here</a> to view the shared article!`;
  })

  if ($('#sop_content_description_div').outerHeight() > $('#sop_overview_description_div').outerHeight())
    $('#sop_overview_description_div').outerHeight($('#sop_content_description_div').outerHeight())

  if ($('#sop_content_description_div').outerHeight() < $('#sop_overview_description_div').outerHeight())
    $('#sop_content_description_div').outerHeight($('#sop_overview_description_div').outerHeight())

  $('#sop_article_show_modal').on('click', '#related_topics_list a', e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: '/sop_articles/' + e.currentTarget.id
    }).done(response => {
      $('#sop_article_show_modal .header').empty()
      $('#sop_article_show_modal .content').empty()
      let content = sop_article_content({ article: response.article,
                                          sop_categories: response.sop_categories,
                                          sop_times: response.sop_times,
                                          current_user: response.current_user,
                                          checklist_articles: response.checklist_articles,
                                          reference_links: response.reference_links,
                                          sop_related_topics: response.sop_related_topics })
      let header = sop_article_header({ article: response.article,
                                        sop_times: response.sop_times,
                                        sop_categories: response.sop_categories })
      $('#sop_article_show_modal .header').append(header)
      $('#sop_article_show_modal .content').append(content)
      let outerHeight = $('#sop_article_show_modal').outerHeight()
      outerHeight = outerHeight - $('#sop_article_show_modal .header').outerHeight()
      $('#sop_article_show_info_column').css({ height: outerHeight })
    })

    return false
  })
})
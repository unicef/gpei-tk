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

  $('#application').on('click', '.c4d_grid_add', e => {
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
  $('#application').on('click', '.c4d_grid_check', e => {
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
  let padding = $('#nav_bar').outerHeight() + 1
  padding += "px"
  $('#c4d_selection_page').css({ paddingTop: padding })


  // c4d article modal show
  $('#c4d_article_show_modal').modal({
    onHide: () => {
      $('#c4d_article_show_modal .content').empty()
      $('#c4d_article_show_modal .header').empty()
    }
  })

  $('.c4d_grid_item_content').click(e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: '/c4d_articles/' + e.currentTarget.parentElement.parentElement.id
    }).done(response => {
      $('#c4d_article_show_modal').modal('show')
      let content = c4d_article_content({ article: response.article,
                                          c4d_categories: response.c4d_categories,
                                          c4d_subcategories: response.c4d_subcategories,
                                          current_user: response.current_user,
                                          toolkit_articles: response.toolkit_articles,
                                          reference_links: response.reference_links,
                                          c4d_related_topics: response.c4d_related_topics })
      let header = c4d_article_header({ article: response.article, c4d_categories: response.c4d_categories })
      $('#c4d_article_show_modal .header').append(header)
      $('#c4d_article_show_modal .content').append(content)
      if ($('#c4d_article_content').outerHeight() > $('#c4d_article_show_info_column').outerHeight())
      $('#c4d_article_show_info_column').css({ height: $('#c4d_article_content').outerHeight() })
    })
  })
  function c4d_article_header(params) {
    return `
      <div id="c4d_article_show_header" class='row' style='background-color:${ params['c4d_categories'][params['article'].c4d_category_id-1].color } ;'>
        <div id='c4d_category_and_article_title' class='col-md-12 text-center' style='background-color:${ params['c4d_categories'][params['article'].c4d_category_id-1].color } ;'>${ params['c4d_categories'][params['article'].c4d_category_id-1].title } - ${ _.map(_.words(params['article'].title), word => { return _.capitalize(word) }).join(' ') }</div>
        <div id='c4d_close_icon' class='text-right'><a href=''>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></a></div>
      </div>`
  }
  function c4d_article_content(params) {
    return `
      <div id="c4d_article_show_page">
        <div id="c4d_article_show_info_column" class='col-md-3'>
          <div id="c4d_article_show_info_column_content">
            ${ getRelatedTopicsDiv(params['c4d_related_topics']) }
            ${ getReferenceLinksDiv(params['reference_links']) }
          </div>
        </div>
        <div id='c4d_article_content_div' class='col-md-9' class='black_text'>
          ${ getAddToToolkitRow(params) }
          <div id='c4d_article_content'>
            ${ params['article'].content }
          </div>
        </div>
      </div>
`
  }
  function getAddToToolkitRow(params){
    return (
      `<div class='c4d_email_icon'>
        <a id='c4d_email_icon_link' href=''><i class="fa fa-envelope" aria-hidden="true"></i></a>
      </div>
      <div class='c4d_print_icon'>
        <a id='c4d_print_icon_link' href=''><i class="fa fa-print" aria-hidden="true"></i></a>
      </div>
      <div id="${ params['article'].id }" class='text-center'>
        <div id='c4d_add_to_toolkit_text'>ADD TO MY TOOLKIT</div>
      </div>
      <div id="${ params['article'].id }" class=''>
        <p class="c4d_grid_item_article_title ${ params['article'].title }" style='display:none;visibility:hidden;'>${ params['article'].title }</p>
        <a id='c4d_show_add' class='c4d_grid_add' href='' style="${ c4d_style_visible('add', params['current_user'], params['article'], params['toolkit_articles']) };"><i class="fa fa-plus" aria-hidden="true"></i></a>
        <a id='c4d_show_check' class='c4d_grid_check' href='' style="${ c4d_style_visible('check', params['current_user'], params['article'], params['toolkit_articles']) };"><i class="fa fa-check" aria-hidden="true"></i></a>
        <div class='row text-center' style='display:none;visibility:hidden;'>
          <ul class="list-unstyled">
            <li id="c4d_article_show_subcategory_text">${ params['c4d_subcategories'][params['article'].c4d_subcategory_id].title }</li>
            <li id="c4d_article_show_article_title_text">${ _.capitalize(params['article'].title) }</li>
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
            return `<li><i class="fa fa-angle-right fa-lg" aria-hidden="true"></i>&nbsp;<a href='/c4d_articles/${article.id}' class="black_text">${article.title}</a></li>`
          }).join('\n')}
          </ul>
        </div>`
    }
    return content
  }

  function getReferenceLinksDiv(reference_links){
    let content = ""
    if (!_.isEmpty(reference_links)) {
      content = "<div class='row'><div id='c4d_show_references'><strong>REFERENCES:</strong>" +
        _.map(reference_links, reference_link => {
          return `<a href="${reference_link.url}">${reference_link.document_file_name}</a>`
        }).join('\n')
    }
    content = content + "</div></div>"
    return content
  }

  function c4d_style_visible (icon, user, article, toolkit_articles) {
    let visibility_style = ''
    if (icon === 'add') {
      if (!_.isNull(user)){
        visibility_style = 'visibility:visible'
        _.forEach(toolkit_articles, check_list_article => {
          if (check_list_article.title === article.title)
            visibility_style = 'visibility:hidden'
        })
      }
      return visibility_style
    }
    else {
      if (!_.isNull(user)){
        visibility_style = 'visibility:hidden'
        _.forEach(toolkit_articles, check_list_article => {
          if (check_list_article.title === article.title)
            visibility_style = 'visibility:visible'
        })
      }
      return visibility_style
    }
  }
  $('#c4d_article_show_modal').on('click', '#c4d_print_icon_link', e => {
    e.preventDefault()
    $('#application').after($('#c4d_article_show_modal #c4d_article_content').html())
    $('#application').after($('#c4d_article_show_modal .header').html())
    $('#application').css({ display: 'none' })
    window.print()
    $('#application').nextAll().remove()
    $('#application').css({ display: 'block' })
  })
  $('#c4d_article_show_modal').on('click', '#c4d_email_icon_link', e => {
    e.preventDefault()
    window.location.href=`mailto:?subject=C4D Article: ${$('#c4d_category_and_article_title').html()}&body=Click <a href='${window.location.protocol + '//' + window.location.host}/c4d_articles/${$('#c4d_add_to_toolkit_text').parent().attr('id')}' target='_blank'>here</a> to view the shared article!`;
  })
})
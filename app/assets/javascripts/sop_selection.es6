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

      let grid_check = $(e.currentTarget.parentElement).find('.grid_check')

      toggleVisibility(grid_check)

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
      let grid_check = e.currentTarget
      toggleVisibility(grid_check)

      let grid_add = $(e.currentTarget.parentElement).find('.grid_add')

      toggleVisibility(grid_add)

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
                                          reference_links: response.reference_links })
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
        <div id='sop_category_and_article_title' class='col-md-12 text-center' style='background-color:${ params['sop_times'][params['article'].sop_time_id-1].color };color:${get_color_for_sop_time(params['sop_times'][params['article'].sop_time_id-1].period)};'>${ params['sop_categories'][params['article'].sop_category_id-1].title } - ${ params['article'].title }</div>
        <div id='sop_close_icon' class='text-right'><a href='' style='color:${get_color_for_sop_time(params['sop_times'][params['article'].sop_time_id-1].period)};'>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></a></div>
      </div>`
  }
  function get_color_for_sop_time(article_time) {
    let special_categories = ['14 Days to Close']
    if (_.includes(special_categories, article_time))
      return 'black'
    else
      return 'white'
  }
  $('#application').on('click', '#sop_close_icon a', e => {
    e.preventDefault()
    $('#sop_article_show_modal').modal('hide')
    return false
  })
  function sop_article_content(params) {
    return `
      <div id="sop_article_show_page">
        <div id="sop_article_show_info_column" class='col-md-3'>
          <div id="sop_article_show_info_column_content">
            ${ getReferenceLinksDiv(params['reference_links']) }
            ${ getVideoContent(params) }
          </div>
        </div>
        <div id='sop_article_content_div' class='col-md-9' class='black_text'>
          ${ getAddToToolkitRow(params) }
          <div id='sop_article_content'>
            <div class='col-md-12'>
              ${ params['article'].content }
            </div>
            ${ getSopInfoRow(params) }
          </div>
        </div>
      </div>
`
  }
  function getSopInfoRow(params){
    return `<div id='sop_article_show_info_row' class='col-md-12'>
              <div id='sop_article_show_time_function_column' class='col-md-4'>
                <div id='sop_article_show_time_column' class='col-md-12'>
                  <div>
                    <img id='sop_info_row_icons' src='/assets/sop/grid_icons/icon-time-black.png'>&nbsp;<strong>TIME</strong>
                  </div>
                  <div class='col-md-12' style='padding-left:5px;color:${ get_color_for_sop_time(params['sop_times'][params['article'].sop_time_id - 1].period) };background-color: ${ params['sop_times'][params['article'].sop_time_id - 1].color }'>
                    ${ params['sop_times'][params['article'].sop_time_id - 1].period }
                  </div>
                </div>
                <div id='sop_article_show_function_column' class='col-md-12'>
                  <div class='col-md-12'>
                    <img id='sop_info_row_icons' src='/assets/sop/grid_icons/icon-category-black.png'>&nbsp;<strong>FUNCTION</strong>
                  </div>
                  <div class='col-md-12'>
                    <img id='sop_article_show_info_row_icon' src='${ getSopCategoryIcon(params['sop_categories'][params['article'].sop_category_id - 1].title) }'>&nbsp;${ params['sop_categories'][params['article'].sop_category_id - 1].title }
                  </div>
                </div>
              </div>
              <div id='sop_article_show_responsible_column' class='col-md-4'>
                <div class='col-md-12'>
                  <img id='sop_info_row_icons' src='/assets/sop/grid_icons/icon-resp-black.png'>&nbsp;<strong>RESPONSIBILITY</strong>
                </div>
                <div class='col-md-12'>
                  ${ params['article'].responsible }
                </div>
              </div>
              <div id='sop_article_show_support_column' class='col-md-4'>
                <div class='col-md-12'>
                  <strong>SUPPORT</strong>
                </div>
                <div class='col-md-12'>
                  ${ params['article'].support }
                </div>
              </div>
            </div>`
  }
  function getSopCategoryIcon(sop_category){
    let image = ''
    if (sop_category === 'Outbreak Confirmation') {
      image = '/assets/sop/icons/24Hours_OutbreakConfir.png'
    }
    else if (sop_category === 'Coordination and Advocacy') {
      image = '/assets/sop/icons/14DaysClose_AdvoCoor.png'
    }
    else if (sop_category === 'Technical and Human Resources') {
      image = '/assets/sop/icons/14Days_TechHuman.png'
    }
    else if (sop_category === 'Information Management') {
      image = '/assets/sop/icons/14DaysClose_InfoMan.png'
    }
    else if (sop_category === 'Communication') {
      image = '/assets/sop/icons/14DaysClose_ExCom.png'
    }
    else if (sop_category === 'Finances and Logistics') {
      image = '/assets/sop/icons/14DaysClose_Finance.png'
    }
    else if (sop_category === 'Context') {
      image = '/assets/sop/icons/14DaysClose_Context.png'
    }
    return image
  }

  function getReferenceLinksDiv(reference_links){
    let content = ""
    if (!_.isEmpty(reference_links)) {
      content = "<div class='row'><div id='sop_show_references'><div class='col-md-12'><strong>REFERENCES:</strong></div>" +
        _.map(reference_links, reference_link => {
          let reference_title = _.replace(reference_link.document_file_name, new RegExp("_","g")," ")
          reference_title = _.replace(reference_title, new RegExp(".pdf","g"),"")
          return `<div id='reference_link_row' class='row'><div class='col-md-2'><img class='reference_link_pdf_icon' src='/assets/reference_icons/icon-doc-pdf.png'></div><div id='reference_link_anchor_div' class='col-md-10'><a class='reference_link_anchor' href="${ reference_link.url }" target='_blank'>&nbsp;${ reference_title }</a></div></div>`
        }).join('\n')
      content = content + "</div></div>"
    }
    return content
  }

  function getVideoContent(params) {
    let video_content = ''
    if (params['article'].video_url !== null) {
      video_content = `<div class='row'><div id='multimedia_header' class='col-md-9'><strong>MULTIMEDIA:</strong></div><div class='col-md-12'><iframe src="${ params['article'].video_url }" width="97%" height="auto" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>`
      video_content = _.replace(video_content, 'https://vimeo.com/', 'https://player.vimeo.com/video/')
    }
    return video_content
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
        <a id='${ params['article'].id }' class='sop_grid_add' href='' style="${ sop_style_visible('add', params['current_user'], params['article'], params['checklist_articles']) };"  title='Add to checklist' data-toggle='tooltip'><i class="fa fa-plus" aria-hidden="true"></i></a>
        <a id='${ params['article'].id }' class='sop_grid_check' href='' style="${ sop_style_visible('check', params['current_user'], params['article'], params['checklist_articles']) };"  title='Remove from checklist' data-toggle='tooltip'><i class="fa fa-check" aria-hidden="true"></i></a>
        <div class='row text-center' style='display:none;visibility:hidden;'>
          <ul class="list-unstyled">
            <li id="sop_article_show_subcategory_text">${ params['sop_times'][params['article'].sop_time_id - 1].period }</li>
            <li id="sop_article_show_article_title_text">${ _.capitalize(params['article'].title) }</li>
          </ul>
        </div>
      </div>`)
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

  if ($('#sop_overview_content_description_div').outerHeight() > $('#sop_overview_content_div').outerHeight())
    $('#sop_overview_content_div').outerHeight($('#sop_overview_content_description_div').outerHeight())
  else if ($('#sop_overview_content_description_div').outerHeight() < $('#sop_overview_content_div').outerHeight())
    $('#sop_overview_content_description_div').outerHeight($('#sop_overview_content_div').outerHeight())

  $('#sop_article_show_modal').on('click', '#related_topics_list a', e => {
    e.preventDefault()
    loadSopArticle(e.currentTarget)
    return false
  })
  function loadSopArticle(target) {
    $.ajax({
      method: 'GET',
      url: '/sop_articles/' + target.id
    }).done(response => {
      $('#sop_article_show_modal .header').empty()
      $('#sop_article_show_modal .content').empty()
      let content = sop_article_content({ article: response.article,
                                          sop_categories: response.sop_categories,
                                          sop_times: response.sop_times,
                                          current_user: response.current_user,
                                          checklist_articles: response.checklist_articles,
                                          reference_links: response.reference_links })
      let header = sop_article_header({ article: response.article,
                                        sop_times: response.sop_times,
                                        sop_categories: response.sop_categories })
      $('#sop_article_show_modal .header').append(header)
      $('#sop_article_show_modal .content').append(content)
      let outerHeight = $('#sop_article_show_modal').outerHeight()
      outerHeight = outerHeight - $('#sop_article_show_modal .header').outerHeight()
      $('#sop_article_show_info_column').css({ height: outerHeight })
    })
  }
  $('#sop_checklist_list').on('click', 'a', e => {
    e.preventDefault()
    loadSopArticle(e.currentTarget.parentElement)
    $('#sop_article_show_modal').modal('show')
    return false
  })

  _($('#grid_item_icon_div #sop_grid_icon_img')).forEach(img => {
    $(img).css({ visibility: 'visible' })
  })

$('[data-toggle="tooltip"]').tooltip();

  // $(window).resize(e => {
  //   let current_width = $('#isotope_container').outerWidth()

  //   if (current_width > 1100) {
  //     let width = current_width - 1100
  //     adjustGridItemLeftPixels(width/2)
  //   }
  //   else if (current_width > 880 && current_width < 1100) {
  //     let width = current_width - 880
  //     adjustGridItemLeftPixels(width/2)
  //   }
  //   else if (current_width > 660 && current_width < 880) {
  //     let width = current_width - 660
  //     adjustGridItemLeftPixels(width/2)
  //   }
  //   else if (current_width > 440 && current_width < 660) {
  //     let width = current_width - 440
  //     adjustGridItemLeftPixels(width/2)
  //   }
  //   else if (current_width > 220  && current_width < 1100) {
  //     let width = current_width - 220
  //     adjustGridItemLeftPixels(width/2)
  //   }
  // })
  // function adjustGridItemLeftPixels(offset) {
  //   _.forEach($('#isotope_container .grid_item'), grid_item =>  {
  //     let position = parseInt(_.replace($(grid_item).css('left'), 'px', ''))
  //     position += offset
  //     $(grid_item).css({ left: position })
  //   })
  // }
})
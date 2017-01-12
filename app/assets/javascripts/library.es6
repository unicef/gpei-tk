$(() => {
  function getSearchResultFilter(idx){
    if (idx <= 10) {
      return 1
    } else if (idx % 10 === 0) {
      return (idx / 10)
    } else {
      return Math.floor(idx / 10 + 1)
    }
  }

  let sortFlags = {
    relevance: true,
    created: true,
    title: true,
    author: true,
    download: true,
    like: true
  }
  let search_grid = $(`#library #library_content_search_results_grid`)
  if ($('#library').css('visibility') === 'visible'){

    let offset = $('nav').outerHeight()
    $('#library').offset({ top: offset })
    let $featured_grid = $(`#library_index_content_featured_content_grid`)

    $featured_grid.isotope({
      itemSelector: `.featured_content_item`,
      layoutMode: 'fitRows',
      filter: '.featured_content_item_1'
    })

    $('#library_content_search_form').submit(e => {
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: '/library/referenceSearch/',
        data: $(e.currentTarget).serialize()
      }).done(response => {
        if (response.status === 200){
          $('#library_index_content_featured').css('display', 'none')
          $('#library_index_content_popular_downloads').css('display', 'none')
          $('#library_content_search_results').empty()
          $('#library_content_search_results').append(getSearchResultContent(response.references, response.reference_link_info, response.users))
          $('#application .ui.simple.dropdown.item').dropdown()
          $('#application .ui.radio.checkbox').checkbox()
          $('#application .ui.checkbox').checkbox()
          $('#application .ui.dropdown').dropdown({
            on:'hover',
            action:'nothing'
          })
          loadSearchGrid()
        }
      })
      return false
    })

    function loadSearchGrid() {
      search_grid = $(`#library #library_content_search_results_grid`)
      search_grid.isotope({
        itemSelector: `.search_content_item`,
        layoutMode: 'fitRows',
        filter: '.pagination_search_content_item_1',
        getSortData: {
          relevance: function (ele) {
            return parseInt($(ele).find('#search_content_relevance').text())
          },
          created: function (ele) {
            return (Date.parse(_.trim($(ele).find('#search_content_created_at').text())))
          },
          title: function (ele) {
            return _.lowerCase(_.trim($(ele).find('#search_content_title_text a').text()))
          },
          author: function (ele) {
            return _.trim($(ele).find('#search_content_author').text())
          },
          download: function (ele) {
            return parseInt($(ele).find('#library_download_div .counter_indicator_text_div').text())
          },
          like: function (ele) {
            return parseInt($(ele).find('#library_like_div .counter_indicator_text_div').text())
          }
        }
      })
    }
    function getSearchPaginator(references, reference_link_info){
      return `<div id='library_index_content_search_results_pagination_wrapper' class='col-md-5'>
                ${references.length > 10 ? getSearchResultsPaginator({ references: references, reference_link_info: reference_link_info }) : ''}
              </div>`
    }

    function getSearchResultContent(references, reference_link_info, users){
      return `<div id='search_results_header_wrapper' class='col-md-12'>
                <div id='library_index_content_search_results_header_text' class='col-md-3'>
                  Search Results
                </div>
                ${references.length > 10 ? getSearchPaginator(references, reference_link_info) : ''}
              </div>
              <div id='search_selected_filters_display' class='col-md-4'>
              </div>
              <div id='search_sort_wrapper' class='col-md-offset-6 col-md-2'>
                <div class="ui compact menu">
                  <div class="ui simple dropdown item">
                    <span id='sort_search_dropdown_header'>SORT RESULTS</span>
                    <i class="dropdown icon"></i>
                    <div id='search_sort_radio_div' class="menu">
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" checked="checked" data-filter='relevance'>
                          <label>Relevance</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='title'>
                          <label>Title</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='download'>
                          <label>Downloads</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='like'>
                          <label>Most liked</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='created'>
                          <label>Date uploaded</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id='search_results_border' class='div_border_underline col-md-12'></div>
              </div>
              <div class='col-md-12'>
                <div id='library_content_search_results_grid'>
                  ${getSearchResultRows(references, reference_link_info, users)}
                </div>
              </div>
              <div id='search_pagination_controls_wrapper' class='col-md-12'>
                ${references.length > 10 ? getSearchPaginator(references, reference_link_info) : ''}
              </div>`
    }

    function getSearchResultsPaginator(args) {
      return `<div id='search_results_paginator_left_angle' class=''><a href=''><i class='fa fa-angle-left fa-2x' aria-hidden='true'></i></a></div>
              <div id='' class='inline_block search_results_paginator_page_numbers'>${getPaginatorPageNumbers(args['references'])}</div>
              <div id='search_results_paginator_right_angle' class=''><a href=''><i id='${ getPaginatorLastPageNumber(args['references'].length) }' class='fa fa-angle-right fa-2x' aria-hidden='true'></i></a></div>`
    }

    function getPaginatorLastPageNumber(item_count) {
      let divided_idx = item_count / 10
      let modulus_idx = item_count % 10
      return (divided_idx >= 1 ? (parseInt(Math.floor(divided_idx)) + (modulus_idx === 0 ? 0 : 1 )) :  1)
    }

    function getPaginatorPageNumbers(items) {
      let item_idx = 0
      let last_idx = items.length - 1
      return `${items.map(item => {
                  item_idx += 1
                  return `${item_idx % 10 === 0 || item_idx === last_idx ? `<div class='library_search_pagination_indicators ${item_idx === 10 ? 'active' : ''}'>${`<a id='${ getPaginatorIdNumber(item_idx, last_idx) }' href='' class='max_width'>${getPaginatorIdNumber(item_idx, last_idx)}</a>`}</div>` : ''}`
                }).join('')}`
    }

    function getPaginatorIdNumber(item_idx, last_idx){
      return `${item_idx === last_idx && item_idx % 10 !== 0 ? Math.floor(item_idx / 10 + 1) : Math.floor(item_idx / 10)}`
    }

    function loadIsotopeHandlers(type){
      // $('#CMS_index_content #cms_reference_link_filter_dropdown').dropdown({
      //   on: 'hover',
      //   action: 'nothing',
      //   transition: 'horizontal flip'
      // })
      $(`#library_content_search_results #library_content_search_results_grid`).isotope({
        itemSelector: `.reference_search_result_item`
      })
      // ,
      //   getSortData: {
      //     updatedSort: function (ele) {
      //       return Date.parse($(ele).find('#updated_at_div').text()) * (updatedSortFlow ? -1 : 1)
      //     },
      //     createdSort: function (ele) {
      //       return (Date.parse($(ele).find('#created_at_div').text())) * (createdSortFlow ? -1 : 1)
      //     }
      //   }

      // $('.filter-button-group').on('click', 'button', function() {
      //   var filterValue = $(this).attr('data-filter')
      //   // use filter function if value matches
      //   $(`#CMS_index_content #cms_reference_grid`).isotope({ filter: filterValue })
      // })
      // $('.button-group').each( function( i, buttonGroup ) {
      //   var $buttonGroup = $( buttonGroup )
      //   $buttonGroup.on( 'click', 'button', function() {
      //     $buttonGroup.find('.is-checked').removeClass('is-checked')
      //     $( this ).addClass('is-checked')
      //   })
      // })
    }

    function getSearchResultRows(references, reference_link_info, users){
      let idx = -1
      let last_idx = references.length - 1
      if (references.length === 0){
        return `<div class='col-md-12 search_content_item search_content_item_1' style='padding-left:5px'><h3>No Results</h3></div>`
      }
      return `${references.map(reference_obj => {
        idx += 1
        return `<div id='${idx + 1}' class='col-md-12 search_content_item pagination_search_content_item_${ getSearchResultFilter(idx+1) } ${ idx === 0 ? 'active' : '' }'>
                  <div class='col-md-1'>
                    <a id='${ reference_obj.id }' href="${ reference_obj.absolute_url }" target='_blank' class='reference_download_tracker'><img id='search_content_item_image' src="${ _.replace(reference_obj.absolute_url, new RegExp("pdf","g"), "png") }" class='img-responsive'></a>
                  </div>
                  <div id='search_content_filter_div' class='display_none'>
                    <div id='search_content_relevance'>
                      ${ idx }
                    </div>
                    <div id='search_content_author'>
                      ${ users[reference_obj.author_id].first_name }
                    </div>
                    <div id='search_content_created_at'>
                      ${ reference_obj.created_at }
                    </div>
                  </div>
                  <div id='search_content_item_info_wrapper' class='col-md-11'>
                    <div id='search_content_title_text' class='col-md-12'>
                      <a id='${ reference_obj.id }' href="${ reference_obj.absolute_url }" target='_blank' class='reference_download_tracker'>${ reference_obj.title ? reference_obj.title : _.replace(_.replace(reference_obj.document_file_name, new RegExp("_","g"), " "), new RegExp(".pdf","g"), "") }</a>
                    </div>
                    <div id='like_and_download_wrapper' class='col-md-2'>
                      <div id='library_download_div' class='inline_block'>
                        <a id='${ reference_obj.id }' href="${ reference_obj.absolute_url }" target='_blank' class='inline_block library_download_img reference_download_tracker'>
                          <img src='/assets/icons/icon-download2x.png' class='library_grid_icon'>
                        </a>
                        <div class='counter_indicator_text_div inline_block'>${ reference_link_info[reference_obj.id]['download_count'] }</div>
                      </div>
                      <div id='library_like_div' class='inline_block ${ reference_link_info[reference_obj.id]['liked_by_user'] ? 'like_by_user_div' : '' }'>
                        <a id='${ reference_obj.id }' href='' class='inline_block library_like_img reference_like_tracker'>
                          <img src='${ reference_link_info[reference_obj.id]['liked_by_user'] ? '/assets/icons/icon-like-white-2x.png' : '/assets/icons/icon-like-grey2x.png' }' class='library_grid_icon'>
                        </a>
                        <div class='counter_indicator_text_div inline_block ${reference_link_info[reference_obj.id]['liked_by_user'] ? 'liked_by_user_white_text' : ''}'>${ reference_link_info[reference_obj.id]['like_count'] }</div>
                      </div>
                    </div>
                    <div class='col-md-7'>
                      <div id='download_related_topics_div' class='bold_text col-md-3'>DOWNLOAD</div>
                      <div class='col-md-8 langauage_indicator_wrapper'>
                        <a id='${ reference_obj.id }' href="${ reference_obj.absolute_url }" target='_blank' class='reference_download_tracker'><div class='reference_search_result_info_language '>${ _.upperCase(!_.isEmpty(reference_obj.document_language) ? reference_obj.document_language : reference_obj.language) }</div> PDF ${ convertBytesToKbOrMb(reference_obj.document_file_size) }</a>
                        ${ reference_link_info[reference_obj.id]['related_topics'].map(related_topic => {
                                return `<a id='${ related_topic.id }' href="${ related_topic.absolute_url }" target='_blank' class='reference_download_tracker'><div class='reference_search_result_info_language'>${ _.upperCase(!_.isNull(related_topic.document_language) ? related_topic.document_language : related_topic.language) }</div> PDF ${ convertBytesToKbOrMb(related_topic.document_file_size) }</a>`
                              }).join('')
                          }
                      </div>
                    </div>
                    <div id='catalogue_wrapper' class='col-md-offset-1 col-md-2 text-right'>
                      ${ reference_link_info[reference_obj.id]['isC4D'] ? "<div class='inline_block reference_search_result_is_c4d bold_text'>C4D </div>" : '' }
                      ${ reference_link_info[reference_obj.id]['isSOP'] ? "<div class='inline_block reference_search_result_is_sop bold_text'>SOP</div>" : '' }
                    </div>
                    <div id='library_search_reference_link_description' class='col-md-9'>
                      ${ !_.isNull(reference_obj.description) ? reference_obj.description : '' }
                    </div>
                  </div>
                  <div class='one_px_border_bottom col-md-12'>
                  </div>
                </div>`
          }).join('')
        }`
    }

    function convertBytesToKbOrMb(bytes){
      let conversion = 0
      if (bytes > 1048576) {
        conversion = (bytes / 1048576).toFixed(1) + ' MB'
      } else {
        conversion = (bytes / 1024).toFixed(1) + ' KB'
      }
      return conversion
    }

    function getSearchReferenceIcon(reference_obj){
      let img_url = ''
      if (reference_obj.type === 'Reference link'){
        img_url = `<img class='img-responsive' src="${_.replace(reference_obj.reference.absolute_url, new RegExp(".pdf","g"),".png")}">`
      }
      else if (reference_obj.type === 'Reference mp3'){
        img_url = `<img class='img-responsive' src="/assets/reference_icons/icon-doc-mp3.png">`
      }
      else if (reference_obj.type === 'Reference pptx'){
        img_url = `<img class='img-responsive' src="/assets/reference_icons/icon-doc-ppt.png">`
      }
      return img_url
    }
    $('.library_featured_pagination_indicators a').click(e => {
      e.preventDefault()
      let id = e.currentTarget.id
      $('.library_featured_pagination_indicators.active').removeClass('active')
      $(e.currentTarget.parentElement).addClass('active')
      $featured_grid.isotope({ filter: `.featured_content_item_${id}`})
      return false
    })

    $('.library_featured_pagination_indicators').click(e => {
      e.preventDefault()
      let id = $(e.currentTarget).find('a').attr('id')
      $('.library_featured_pagination_indicators.active').removeClass('active')
      $(e.currentTarget).addClass('active')
      $featured_grid.isotope({ filter: `.featured_content_item_${id}`})
      return false
    })

    $('#library').on('click', '.library_search_pagination_indicators a', e => {
      e.preventDefault()
      let id = e.currentTarget.id
      $('.library_search_pagination_indicators.active').removeClass('active')
      $(e.currentTarget.parentElement).addClass('active')
      search_grid.isotope({ filter: `.pagination_search_content_item_${id}`})
      return false
    })

    $('#library').on('click', '.library_search_pagination_indicators', e => {
      e.preventDefault()
      let id = $(e.currentTarget).find('a').attr('id')
      $('.library_search_pagination_indicators.active').removeClass('active')
      $(e.currentTarget).addClass('active')
      search_grid.isotope({ filter: `.pagination_search_content_item_${id}`})
      return false
    })

    $('#library').on('click', '#featured_pagination_left_angle_div a', e => {
      e.preventDefault()
      let id = parseInt($('.library_featured_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#featured_pagination_right_angle_div a i').attr('id'))
      if (id !== 1){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${id-1}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${id-1}`})
      } else if (id === 1){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${max_id}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${max_id}`})
      }
      return false
    })

    $('#library').on('click', '#featured_pagination_right_angle_div a', e => {
      e.preventDefault()
      let id = parseInt($('.library_featured_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#featured_pagination_right_angle_div a i').attr('id'))
      if (id !== max_id){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${id+1}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${id+1}`})
      } else if (id === max_id){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #1`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_1`})
      }
      return false
    })

    $('#library').on('click', '#search_results_paginator_left_angle a', e => {
      e.preventDefault()
      let id = parseInt($('.library_search_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#search_results_paginator_right_angle a i').attr('id'))
      if (id !== 1){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${id-1}`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_${id-1}`})
      } else if (id === 1){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${max_id}`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_${max_id}`})
      }
      return false
    })

    $('#library').on('click', '#search_results_paginator_right_angle a', e => {
      e.preventDefault()
      let id = parseInt($('.library_search_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#search_results_paginator_right_angle a i').attr('id'))
      if (id !== max_id){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${id+1}`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_${id+1}`})
      } else if (id === max_id){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #1`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_1`})
      }
      return false
    })

    $(window).load(() => {
      $featured_grid.isotope({filter: '.active'})
      loadBrowseGrid()
      $('.ui.simple.dropdown.item').dropdown()
      $('.ui.radio.checkbox').checkbox()
      $('#browse_filter_dropdown').dropdown({
        on:'hover',
        action:'nothing'
      })
      _.forEach($('.featured_content_item'), content_item => {
        $(content_item).css('visibility', 'visible')
      })
    })

    function loadBrowseGrid(){
      browse_grid.isotope({
        itemSelector: `.browse_content_item`,
        layoutMode: 'fitRows',
        filter: '.browse_content_item_1',
        getSortData: {
          relevance: function (ele) {
            return parseInt($(ele).find('#browse_content_relevance').text())
          },
          created: function (ele) {
            return (Date.parse(_.trim($(ele).find('#browse_content_created_at').text())))
          },
          title: function (ele) {
            return _.lowerCase(_.trim($(ele).find('#popular_content_title_text a').text()))
          },
          author: function (ele) {
            return _.trim($(ele).find('#browse_content_author').text())
          },
          download: function (ele) {
            return parseInt($(ele).find('#library_download_div .counter_indicator_text_div').text())
          },
          like: function (ele) {
            return parseInt($(ele).find('#library_like_div .counter_indicator_text_div').text())
          }
        }
      })
    }

    $('#library_logo_text_link').click(e => {
      e.preventDefault()
      $('#library_index_content_featured').css('display', 'block')
      $('#library_index_content_popular_downloads').css('display', 'block')
      $('#library_content_search_results').empty()
      $('#library_content_search_input').val('')
      return false
    })
  }
  $('#reference_link_show_modal').modal({
    allowMultiple: true,
    onHide: () => {
      $('#reference_link_show_modal .content').empty()
      $('#reference_link_show_modal .header').empty()
    }
  })

  // browse paginator clicks
  let browse_grid = $(`#library_index_content_popular_content_grid`)
  $('#library').on('click', '.library_browse_pagination_indicators a', e => {
    e.preventDefault()
    let id = e.currentTarget.id
    $('.library_browse_pagination_indicators.active').removeClass('active')
    $(e.currentTarget.parentElement).addClass('active')
    browse_grid.isotope({ filter: `.browse_content_item_${id}`})
    return false
  })

  $('#library').on('click', '.library_browse_pagination_indicators', e => {
    e.preventDefault()
    let id = $(e.currentTarget).find('a').attr('id')
    $('.library_browse_pagination_indicators.active').removeClass('active')
    $(e.currentTarget).addClass('active')
    browse_grid.isotope({ filter: `.browse_content_item_${id}`})
    return false
  })

  $('#library').on('click', '#browse_paginator_left_angle a', e => {
    e.preventDefault()
    let id = parseInt($('.library_browse_pagination_indicators.active a').attr('id'))
    let max_id = parseInt($('#browse_paginator_right_angle a i').attr('id'))
    if (id !== 1){
      $('#library .library_browse_pagination_indicators.active').removeClass('active')
      $(`#library .library_browse_pagination_indicators #${id-1}`).parent().addClass('active')
      browse_grid.isotope({ filter: `.browse_content_item_${id-1}`})
    } else if (id === 1){
      $('#library .library_browse_pagination_indicators.active').removeClass('active')
      $(`#library .library_browse_pagination_indicators #${max_id}`).parent().addClass('active')
      browse_grid.isotope({ filter: `.browse_content_item_${max_id}`})
    }
    return false
  })

  $('#library').on('click', '#browse_paginator_right_angle a', e => {
    e.preventDefault()
    let id = parseInt($('.library_browse_pagination_indicators.active a').attr('id'))
    let max_id = parseInt($('#browse_paginator_right_angle a i').attr('id'))
    if (id !== max_id){
      $('#library .library_browse_pagination_indicators.active').removeClass('active')
      $(`#library .library_browse_pagination_indicators #${id+1}`).parent().addClass('active')
      browse_grid.isotope({ filter: `.browse_content_item_${id+1}`})
    } else if (id === max_id){
      $('#library .library_browse_pagination_indicators.active').removeClass('active')
      $(`#library .library_browse_pagination_indicators #1`).parent().addClass('active')
      browse_grid.isotope({ filter: `.browse_content_item_1`})
    }
    return false
  })
  $('#browse_sort_radio_div .ui.radio.checkbox').click(e => {
    let sortBy = $(e.currentTarget).find('input').attr('data-filter')

    browse_grid.isotope({ filter: '*' })
    browse_grid.isotope({
      sortAscending: sortFlags[sortBy]
    })
    browse_grid.isotope({ sortBy: sortBy })
    if ($(e.currentTarget).find('input').attr('data-filter') !== 'relevance'){
      sortFlags[sortBy] = !sortFlags[sortBy]
    }
    let idx = 0
    let sorted_grid_items = $(browse_grid).data('isotope').filteredItems
    _.forEach(sorted_grid_items, grid_item => {
      $(grid_item.element).removeClass (function (index, css) {
        return (css.match(/browse_content_item_\d+/) || []).join(' ')
      })
      $(grid_item.element).addClass(`browse_content_item_${getSearchResultFilter(idx+1)}`)
      idx +=1
    })
    let filter_value = '.browse_content_item_' + $('.library_browse_pagination_indicators.active a').attr('id')
    browse_grid.isotope({ filter: filter_value })
    return false
  })
  $('#library').on('click', '#search_sort_radio_div .ui.radio.checkbox', e => {
    let sortBy = $(e.currentTarget).find('input').attr('data-filter')

    search_grid.isotope({ filter: '*' })
    search_grid.isotope({
      sortAscending: sortFlags[sortBy]
    })
    search_grid.isotope({ sortBy: sortBy })
    sortFlags[sortBy] = !sortFlags[sortBy]
    let idx = 0
    let sorted_grid_items = $(search_grid).data('isotope').filteredItems
    _.forEach(sorted_grid_items, grid_item => {
      $(grid_item.element).removeClass (function (index, css) {
        return (css.match(/pagination_search_content_item_\d+/) || []).join(' ')
      })
      $(grid_item.element).addClass(`pagination_search_content_item_${getSearchResultFilter(idx+1)}`)
      idx +=1
    })
    let filter_value = '.pagination_search_content_item_' + $('.library_search_pagination_indicators.active a').attr('id')
    search_grid.isotope({ filter: filter_value })
    return false
  })

  $('#browse_filter_dropdown_menu input').change(e => {
    // let filter_value = _.map($('#browse_filter_dropdown_menu .check_box:checked'), input => { return $(input).val() }).join(', ')
    // [[],[],[]]
    let filter_value = ''
    if(e.currentTarget.checked){
      $('#browse_filter_display_div').append(`<div id="${e.currentTarget.id}" class='inline_block'>${e.currentTarget.id}</div`)
    } else {
      $('#browse_filter_display_div').find(`#${e.currentTarget.id}`).remove()
    }
    let theme_values = _.map($('#browse_filter_dropdown_menu #theme_checkboxes .check_box:checked'), input => { return $(input).val() })
    let place_values = _.map($('#browse_filter_dropdown_menu #place_checkboxes .check_box:checked'), input => { return $(input).val() })
    let language_values = _.map($('#browse_filter_dropdown_menu #language_checkboxes .check_box:checked'), input => { return $(input).val() })
    filter_value += buildFilterValue(theme_values, place_values, language_values)
    filter_value += buildFilterValue(theme_values, language_values, place_values)

    filter_value += buildFilterValue(place_values, theme_values, language_values)
    filter_value += buildFilterValue(place_values, language_values, theme_values)

    filter_value += buildFilterValue(language_values, theme_values, place_values)
    filter_value += buildFilterValue(language_values, place_values, theme_values)
    filter_value = _.uniq(_.trim(filter_value).split(' ')).join(', ')

    if (_.isEmpty(filter_value)) {
      $(browse_grid).isotope({ filter: `.browse_content_item_${$('.library_browse_pagination_indicators.active a').attr('id')}` })
    } else {
      $(browse_grid).isotope({ filter: filter_value })
    }
  })
  function buildFilterValue(arr1, arr2, arr3) {
    let values = []
    _.forEach(arr1, value1 => {
      let value = value1
      _.forEach(arr2, value2 => {
        value += value2
        _.forEach(arr3, value3 => {
          value += value3
        })
      })
      values.push(value)
    })
    return `${values.join(' ')} `
  }
  $('#browse_filter_clear_all a').click(e => {
    e.preventDefault()
    _.forEach($('#browse_filter_dropdown_menu .check_box'), check_box => {
      check_box.checked = false
    })
    // $(browse_grid).isotope({ filter: '.browse_content_item_1' })
    $('#browse_sort_radio_div input[data-filter=relevance]').trigger('click')
    $('#browse_filter_display_div').empty()
    return false
  })
})
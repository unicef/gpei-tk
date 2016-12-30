$(() => {
  if ($('#library').css('visibility') === 'visible'){
    let offset = $('nav').outerHeight()
    $('#library').offset({ top: offset })
    let $featured_grid = $(`#library_index_content_featured_content_grid`)

    $featured_grid.isotope({
      itemSelector: `.featured_content_item`,
      layoutMode: 'fitRows'
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
          $('#library_content_search_results').append(getSearchResultContent(response.references, response.reference_link_info))
          loadSearchGrid()
        }
      })
      return false
    })

    function loadSearchGrid() {
      let $search_grid = $(`#library #library_content_search_results_grid`)
      $search_grid.isotope({
        itemSelector: `.search_content_item`,
        layoutMode: 'fitRows',
        filter: '.search_content_item_1'
      })
    }

    function getSearchResultContent(references, reference_link_info){
      return `<div id='search_results_header_wrapper' class='col-md-12'>
                <div id='library_index_content_search_results_header_text' class='col-md-3'>
                  Search Results
                </div>
                <div id='library_index_content_search_results_pagination_wrapper' class='col-md-5'>
                  ${references.length > 10 ? getSearchResultsPaginator({ references: references, reference_link_info: reference_link_info }) : ''}
                </div>
                <div id='search_results_border' class='div_border_underline col-md-12'></div>
              </div>
              <div class='col-md-12'>
                <div id='library_content_search_results_grid'>
                  ${getSearchResultRows(references, reference_link_info)}
                </div>
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
      return (divided_idx >= 1 ? (parseInt(divided_idx.toFixed(0)) + (modulus_idx === 0 ? 0 : 1 )) :  1)
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
      return `${item_idx === last_idx && item_idx % 10 !== 0 ? ((item_idx / 10 + 1).toFixed(0)) : (item_idx / 10).toFixed(0)}`
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

    function getSearchResultRows(references, reference_link_info){
      let idx = -1
      let last_idx = references.length - 1
      return `${references.map(reference_obj => {
        idx += 1
        return `<div id='${idx + 1}' class='col-md-12 search_content_item search_content_item_${ getSearchResultFilter(idx, last_idx) } ${ idx === 0 ? 'active' : '' }'>
                  <div id='search_result_index' class='col-md-1'>
                    ${idx+1}
                  </div>
                  <div id='search_content_title_text' class='col-md-11'>
                    ${ reference_obj.title ? reference_obj.title : _.replace(_.replace(reference_obj.document_file_name, new RegExp("_","g"), " "), new RegExp(".pdf","g"), "") }
                  </div>
                  <div class='col-md-1'>
                    <a id='${ reference_obj.id }' href='${ reference_obj.absolute_url }' target='_blank' class='reference_download_tracker'><img id='search_content_item_image' src='${ _.replace(reference_obj.absolute_url, new RegExp("pdf","g"), "png") }' class='img-responsive'></a>
                  </div>
                  <div id='search_content_item_info_wrapper' class='col-md-10'>
                    <div class='col-md-2'>
                      <div id='library_download_div' class='inline_block'>
                        <a id='${ reference_obj.id }' href='${ reference_obj.absolute_url }' target='_blank' class='inline_block library_download_img reference_download_tracker'>
                          <img src='/assets/icons/icon-download2x.png' class='library_grid_icon'>
                        </a>
                        <div class='counter_indicator_text_div inline_block'>${ reference_link_info[reference_obj.id]['download_count'] }</div>
                      </div>
                      <div id='library_like_div' class='inline_block ${ reference_link_info[reference_obj.id]['liked_by_user'] ? 'like_by_user_div' : '' }'>
                        <a id='${ reference_obj.id }' href='' class='inline_block library_like_img reference_like_tracker'>
                          <img src='${ reference_link_info[reference_obj.id]['liked_by_user'] ? '' : '/assets/icons/icon-like-grey2x.png' }' class='library_grid_icon'>
                        </a>
                        <div class='counter_indicator_text_div inline_block'>${ reference_link_info[reference_obj.id]['like_count'] }</div>
                      </div>
                    </div>
                    <div class='col-md-7'>
                      <div id='download_related_topics_div' class='bold_text col-md-3'>DOWNLOAD</div>
                      <div class='col-md-8'>
                        <a id='${ reference_obj.id }' href='${ reference_obj.absolute_url }' target='_blank' class='reference_download_tracker'><div class='reference_search_result_info_language '>${ _.upperCase(!_.isNull(reference_obj.document_language) ? reference_obj.document_language : reference_obj.language) }</div></a> PDF ${ convertBytesToKbOrMb(reference_obj.document_file_size) }
                        ${ reference_link_info[reference_obj.id]['related_topics'].map(related_topic => {
                                return `<a id='${ related_topic.id }' href='${ related_topic.absolute_url }' target='_blank' class='reference_download_tracker'><div class='reference_search_result_info_language'>${ _.upperCase(!_.isNull(related_topic.document_language) ? related_topic.document_language : related_topic.language) }</div></a> PDF ${ convertBytesToKbOrMb(related_topic.document_file_size) }`
                              }).join('')
                          }
                      </div>
                    </div>
                    <div class='col-md-offset-1 col-md-2 text-right'>
                      CATALOGUE:
                      ${ reference_link_info[reference_obj.id]['isC4D'] ? "<div class='inline_block reference_search_result_is_c4d bold_text'>C4D</div>" : '' }
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

    function getSearchResultFilter(idx, last_idx){
      if (idx < 10) {
        return 1
      } else {
        return (idx / 10 + 1).toFixed(0)
      }
    }
    function convertBytesToKbOrMb(bytes){
      let conversion = 0
      if (bytes > 1048576) {
        conversion = (bytes / 1048576).toFixed(1) + 'MB'
      } else {
        conversion = (bytes / 1024).toFixed(1) + 'KB'
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
      let $search_grid = $(`#library #library_content_search_results_grid`)
      $search_grid.isotope({ filter: `.search_content_item_${id}`})
      return false
    })

    $('#library').on('click', '.library_search_pagination_indicators', e => {
      e.preventDefault()
      let id = $(e.currentTarget).find('a').attr('id')
      $('.library_search_pagination_indicators.active').removeClass('active')
      $(e.currentTarget).addClass('active')
      let $search_grid = $(`#library #library_content_search_results_grid`)
      $search_grid.isotope({ filter: `.search_content_item_${id}`})
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
      let $search_grid = $(`#library #library_content_search_results_grid`)
      if (id !== 1){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${id-1}`).parent().addClass('active')
        $search_grid.isotope({ filter: `.search_content_item_${id-1}`})
      } else if (id === 1){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${max_id}`).parent().addClass('active')
        $search_grid.isotope({ filter: `.search_content_item_${max_id}`})
      }
      return false
    })

    $('#library').on('click', '#search_results_paginator_right_angle a', e => {
      e.preventDefault()
      let id = parseInt($('.library_search_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#search_results_paginator_right_angle a i').attr('id'))
      let $search_grid = $(`#library #library_content_search_results_grid`)
      if (id !== max_id){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${id+1}`).parent().addClass('active')
        $search_grid.isotope({ filter: `.search_content_item_${id+1}`})
      } else if (id === max_id){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #1`).parent().addClass('active')
        $search_grid.isotope({ filter: `.search_content_item_1`})
      }
      return false
    })

    $(window).load(() => {
      $featured_grid.isotope({filter: '.active'})
    })
    $('#library_logo_text_link').click(e => {
      e.preventDefault()
      $('#library_index_content_featured').css('display', 'block')
      $('#library_index_content_popular_downloads').css('display', 'block')
      $('#library_content_search_results').empty()
      return false
    })
  }
})
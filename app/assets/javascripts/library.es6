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
          $('#library_content_search_results').append(getSearchResultContent(response.references, response.reference_link_info))

        }
      })
      return false
    })

    function getSearchResultContent(references, reference_link_info){
      return `<div id='library_content_search_results_grid'>${getSearchResultRows(references, reference_link_info)}</div>`
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
      return `${references.map(reference_obj => {
        idx += 1
        return `<div class='col-md-12 search_content_item search_content_item_${ idx+1 } ${ idx == 0 ? 'active' : '' }'>
                  <div id='featured_content_title_text' class='col-md-12'>
                    ${ reference_obj.title ? reference_obj.title : _.replace(_.replace(reference_obj.document_file_name, new RegExp("_","g"), " "), new RegExp(".pdf","g"), "") }
                  </div>
                  <div class='col-md-2'>
                    <a id='${ reference_obj.id }' href='${ reference_obj.absolute_url }' target='_blank' class='reference_download_tracker'><img id='search_content_item_image' src='${ _.replace(reference_obj.absolute_url, new RegExp("pdf","g"), "png") }' class='img-responsive'></a>
                  </div>
                  <div id='search_content_item_info_wrapper' class='col-md-10'>
                    <div class='col-md-1'>
                      <div class='inline_block'>
                        <div class='counter_indicator_text_div inline_block'>${ reference_link_info[reference_obj.id]['like_count'] }   </div>
                        <a id='${ reference_obj.id }' href='' class='library_like_img reference_like_tracker'>
                          <img src='/assets/icons/icon-like-grey2x.png' class='library_grid_icon'>
                        </a>
                      </div>
                      <div id='library_download_div' class='inline_block'>
                        <div class='counter_indicator_text_div inline_block'>${ reference_link_info[reference_obj.id]['download_count'] }   </div>
                        <a id='${ reference_obj.id }' href='${ reference_obj.absolute_url }' target='_blank' class='library_download_img reference_download_tracker'>
                          <img src='/assets/icons/icon-download2x.png' class='library_grid_icon'>
                        </a>
                      </div>
                    </div>
                    <div class='col-md-7'>
                      <div id='download_related_topics_div' class='bold_text col-md-3'>DOWNLOAD</div>
                      <div class='col-md-5'>
                        <a id='${ reference_obj.id }' href='${ reference_obj.absolute_url }' target='_blank' class='reference_download_tracker'><div class='reference_search_result_info_language '>${ reference_obj.document_language ? reference_obj.document_language.upcase : reference_obj.language.upcase }</div></a> PDF ${ reference_obj.document_file_size/1024 }KB
                        ${ reference_link_info[reference_obj.id]['related_topics'].map(related_topic => {
                                return `<a id='${ related_topic.id }' href='${ related_topic.absolute_url }' target='_blank' class='reference_search_result_info_language reference_download_tracker'><div>${ related_topic.document_language ? related_topic.document_language.upcase : related_topic.language.upcase }</div></a> PDF ${ related_topic.document_file_size/1024 }KB`
                              }).join('')
                            }
                      </div>
                    </div>
                    <div class='col-md-offset-1 col-md-2 text-right'>
                      CATALOGUE:
                      ${ reference_link_info[reference_obj.id]['isC4D'] ? "<div class='inline_block reference_search_result_is_c4d bold_text'>C4D</div>" : '' }
                      ${ reference_link_info[reference_obj.id]['isSOP'] ? "<div class='inline_block reference_search_result_is_sop bold_text'>SOP</div>" : '' }
                    </div>
                    <div id='library_reference_link_description' class='col-md-9'>
                      ${ !_.isNull(reference_obj.title) ? reference_obj.title : _.replace(_.replace(reference_obj.document_file_name, new RegExp("_","g"), " "), new RegExp(".pdf","g"), "") }
                      ${ !_.isNull(reference_obj.description) ? reference_obj.description : '' }
                    </div>
                  </div>
                </div>`
          }).join('')
        }`
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

    $('#featured_pagination_left_angle_div a').click(e => {
      e.preventDefault()
      let id = parseInt($('.library_featured_pagination_indicators.active a').attr('id'))
      if (id !== 1){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${id-1}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${id-1}`})
      }
      return false
    })
    $('#featured_pagination_right_angle_div a').click(e => {
      e.preventDefault()
      let id = parseInt($('.library_featured_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#featured_pagination_right_angle_div a i').attr('id'))
      if (id !== max_id){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${id+1}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${id+1}`})
      }
      return false
    })
    $(window).load(() => {
      $featured_grid.isotope({ filter: '.active' })
    })
    $('.library_like_img').click(e => {
      e.preventDefault()
      return false
    })
  }

})
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
          $('#library_content_search_results').append(getSearchResultContent(response.references))

        }
      })
      return false
    })

    function getSearchResultContent(references){
      return `<div id='library_content_search_results_grid'>${getSearchResultRows(references)}</div>`
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

    function getSearchResultRows(references){
      // need to break up interpolate by type
      return `${references.map(reference_obj => {
          return `<div class='reference_search_result_item col-md-12'>
                    <div class='reference_search_result_item_thumbnail col-md-1'>
                      ${getSearchReferenceIcon(reference_obj)}
                    </div>
                    <div id='reference_search_result_title_description_wrapper' class='col-md-11'>
                      <div class='reference_search_result_item_title col-md-10'>
                        <a id='${reference_obj.reference.id}' href='${reference_obj.reference.absolute_url}' class='${reference_obj.type}' target='_blank'>${reference_obj.reference.title}</a>
                      </div>
                      <div class='reference_search_result_item_catalogue col-md-2'>
                        CATALOGUE: ${reference_obj.isC4D === true ? "<div class='inline_block reference_search_result_is_c4d'>C4D</div>" : ''}${reference_obj.isSOP === true ? "<div class='inline_block reference_search_result_is_sop'>SOP</div>" : ''}
                      </div>
                      <div class='reference_search_result_like_downloads_info_wrapper col-md-12'>
                        <div class='reference_search_result_like col-md-2'>
                        </div>
                        <div class='reference_search_result_downloads col-md-2'>
                        </div>
                        <div class='reference_search_result_info col-md-6'>
                          DOWNLOAD: <div class='reference_search_result_info_language'>${_.toUpper(reference_obj.reference.language)}</div>
                        </div>
                      </div>
                      <div class='reference_search_result_item_description col-md-12'>
                        ${reference_obj.reference.description}
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
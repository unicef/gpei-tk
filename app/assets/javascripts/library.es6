$(() => {
  if ($('#library').css('visibility') === 'visible'){
    let offset = $('nav').outerHeight()
    $('#library').offset({ top: offset })

    $('#library_content_search_form').submit(e => {
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: '/library/referenceSearch/',
        data: $(e.currentTarget).serialize()
      }).done(response => {
        if (response.status === 200){
          $('#library_content_search_results').append(getSearchResultContent(response.references))
          // $('#library_content_search_results_grid').grid()
        }
      })
      return false
    })

    function getSearchResultContent(references){
      return `<div id='library_content_search_results_grid'>${getSearchResultRows(references)}</div>`
    }
    function getSearchResultRows(references){
      // need to break up interpolate by type
      return `${references.map(reference => {
                return `<div class='reference_search_result_item col-md-12'>
                          <div class='reference_search_result_item_thumbnail col-md-1'>
                            ${getSearchReferenceIcon(reference)}
                          </div>
                          <div id='reference_search_result_title_description_wrapper' class='col-md-11'>
                            <div class='reference_search_result_item_title col-md-10'>
                              <a id='${reference[1].id}' href='${reference[1].absolute_url}' class='${reference[0]}' target='_blank'>${reference[1].title}</a>
                            </div>
                            <div class='reference_search_result_item_catalogue col-md-2'>
                              CATALOGUE: <div class='inline_block reference_search_result_is_c4d'>C4D</div>
                            </div>
                            <div class='reference_search_result_like_downloads_info_wrapper col-md-12'>
                              <div class='reference_search_result_like col-md-2'>
                              </div>
                              <div class='reference_search_result_downloads col-md-2'>
                              </div>
                              <div class='reference_search_result_info col-md-6'>
                                DOWNLOAD: <div class='reference_search_result_info_language'>${_.toUpper(reference[1].language)}</div>
                              </div>
                            </div>
                            <div class='reference_search_result_item_description col-md-12'>
                              ${reference[1].description}
                            </div>
                          </div>
                        </div>`
                }).join('')
              }`
    }
    function getSearchReferenceIcon(reference){
      let img_url = ''
      if (reference[0] === 'Reference link'){
        img_url = `<img class='img-responsive' src="${_.replace(reference[1].absolute_url, new RegExp(".pdf","g"),".png")}">`
      }
      else if (reference[0] === 'Reference mp3'){
        img_url = `<img class='img-responsive' src="/assets/reference_icons/icon-doc-mp3.png">`
      }
      else if (reference[0] === 'Reference pptx'){
        img_url = `<img class='img-responsive' src="/assets/reference_icons/icon-doc-ppt.png">`
      }
      return img_url
    }
  }

})
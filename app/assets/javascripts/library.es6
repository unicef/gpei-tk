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
  }

})
$(() => {
  if ($('#library').css('visibility') === 'visible'){
    let offset = $('nav').outerHeight()
    $('#library').offset({ top: offset })

    $('#library_content_search_form').submit(e => {
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: '/library/search/',
        data: $(e.currentTarget).serialize()
      }).done(response => {
        if (response.status === 200){
          $('#library_content_search_results').append(getSearchResultContent(response))
        }
      })
      return false
    })

    function getSearchResultContent(search_results){
      return `<div id='library_content_search_results_grid'>${getSearchResultRows(search_results)}</div>`
    }
    function getSearchResultRows(search_results){
      // need to break up interpolate by type
      return `${search_results.map(search_result => {
        return `<div class='col-md-12'>
        </div>`
      })}`
    }
  }

})
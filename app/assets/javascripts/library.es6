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
        $('#library_content_search_results').append(getSearchResultContent(response.found_search_results))
      })
      return false
    })

    function getSearchResultContent(search_results){
      return `<div id='library_content_search_results_grid'>${getSearchResultRows(search_results)}</div>`
    }
    function getSearchResultRows(search_results){
      return `${search_results.map(search_result => {
        return `<div class='col-md-12'>
        </div>`
      })}`
    }
  }

})
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

      })
      return false
    })
  }

})
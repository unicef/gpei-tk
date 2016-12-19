$(() => {
  $('html .reference_download_tracker').click(e => {
    $.ajax({
      method: 'POST',
      url: '/api/reference_downloads/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {

    })
  })
  $('html .reference_like_tracker').click(e => {
    $.ajax({
      method: 'POST',
      url: '/api/reference_likes/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {

    })
  })
})
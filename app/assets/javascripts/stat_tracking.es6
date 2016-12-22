$(() => {
  $('#application').on('click', '.reference_download_tracker', e => {
    $.ajax({
      method: 'POST',
      url: '/api/reference_downloads/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {

    })
  })
  $('#application').on('click', '.reference_like_tracker', e => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reference_likes/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {

    })
    return false
  })
})
$(() => {
  $('#application').on('click', '.reference_download_tracker', e => {
    $.ajax({
      method: 'POST',
      url: '/api/reference_downloads/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {
      let $text_div = $(e.currentTarget.parentElement).find('.counter_indicator_text_div')
      if (_.isEmpty($text_div)) {
        $text_div.text(response.download_count)
      }
    })
  })
  $('#application').on('click', '.reference_like_tracker', e => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reference_likes/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {
      $(e.currentTarget.parentElement).find('.counter_indicator_text_div').text(response.like_count)
    })
    return false
  })
})
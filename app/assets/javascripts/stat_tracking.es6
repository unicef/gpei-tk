$(() => {
  $('#application').on('click', '.reference_download_tracker', e => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reference_downloads/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {
      let $text_div = $(e.currentTarget.parentElement).find('.counter_indicator_text_div')
      if (!_.isEmpty($text_div)) {
        $text_div.text(response.download_count)
      }
    })
    $.ajax({
      method: 'GET',
      url: '/api/reference_links/' + $(e.currentTarget).attr('id')
    }).done(response => {
      $('#reference_link_show_modal .content').empty()
      $('#reference_link_show_modal .header').empty()
      loadPDF(response.reference_link)
    })
    return false
  })

  function loadPDF(reference_link) {
    let has_title = false
    has_title = (!_.isNull(reference_link.title) || reference_link.title !== '')
    let title = _.trim((!_.isNull(reference_link.title) && reference_link.title !== '' && reference_link.title !== 'null' ? reference_link.title : _.trim(reference_link.document_file_name).replace(new RegExp('_', 'g'), ' ').replace(new RegExp('.pdf', 'g'), '')))
    let user_friendly_url = `https://poliok.it/library/${title.replace(new RegExp(' ', 'g'), '_')}`
    $('#reference_link_show_modal .header').append(`<h2>${title}<div id='reference_link_show_close_div'><a href=''><i class="fa fa-times" aria-hidden="true"></i> close</div></a></h2><h5><a id='user_friendly_reference_link_anchor' href="${user_friendly_url}">Copy document link</a></h5>`)
    let iframe = `<iframe src="https://docs.google.com/gview?url=${reference_link.absolute_url}&embedded=true" style="width:100%; min-height:800px;" frameborder="0"></iframe>`
    $('#reference_link_show_modal .content').append(iframe)
    $('#reference_link_show_modal').modal('show')
  }

  $('#application').on('click', '#reference_link_show_close_div a', e => {
    e.preventDefault()
    $('#reference_link_show_modal').modal('hide')
    return false
  })
  $('#application').on('click', '#user_friendly_reference_link_anchor', e => {
    e.preventDefault()
    $('#reference_link_show_modal').append(`<input id='copy_link_target' value='${$(e.currentTarget).attr('href')}'>`)
    $('#application #copy_link_target').select()
    document.execCommand('copy')
    $('#application #copy_link_target').remove()
    return false
  })
  $('#application').on('click', '.reference_like_tracker', e => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reference_likes/',
      data: { id: $(e.currentTarget).attr('id') }
    }).done(response => {
      if(!_.isNull(response.user) && !response.like_deleted){
        $(e.currentTarget.parentElement).find('img').attr('src', '/assets/icons/icon-like-white-2x.png')
        $(e.currentTarget.parentElement).addClass('like_by_user_div')
        $(e.currentTarget.parentElement).find('.counter_indicator_text_div').addClass('liked_by_user_white_text')
      }
      else {
        $(e.currentTarget.parentElement).removeClass('like_by_user_div')
        $(e.currentTarget.parentElement).find('.counter_indicator_text_div').removeClass('liked_by_user_white_text')
        $(e.currentTarget.parentElement).find('img').attr('src', '/assets/icons/icon-like-grey2x.png')
      }
      $(e.currentTarget.parentElement).find('.counter_indicator_text_div').text(response.like_count)
    })
    return false
  })
  $(window).load(() => {
    if ($('#library_reference_link_show').css('visibility') === 'visible') {
      $.ajax({
        method: 'GET',
        url: '/api/reference_links/' + _.trim($('#library_reference_link_show')[0].innerHTML)
      }).done(response => {
        $('#reference_link_show_modal .content').empty()
        $('#reference_link_show_modal .header').empty()
        loadPDF(response.reference_link)
      })
    }
  })

})
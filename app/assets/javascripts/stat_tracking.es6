$(() => {
  $('#application').on('click', '.reference_download_tracker', e => {
    e.preventDefault()
    referenceTrackAndLoad(e.currentTarget, $(e.currentTarget).attr('id'))
    return false
  })

  function referenceTrackAndLoad(el,id){
    $.ajax({
      method: 'POST',
      url: '/api/reference_downloads/',
      data: { id }
    }).done(response => {
      let $text_div = $(el.parentElement).find('.counter_indicator_text_div')
      if (!_.isEmpty($text_div)) {
        $text_div.text(response.download_count)
      }
    })
    $.ajax({
      method: 'GET',
      url: '/api/reference_links/' + id,
      async: false
    }).done(function(response) {
      $('#reference_link_show_modal .content').empty()
      $('#reference_link_show_modal .header').empty()
      loadReferenceLinkToView(response.reference_link)
    })
  }

  function loadReferenceLinkToView(reference_link) {
    let has_title = false
    has_title = (!_.isNull(reference_link.title) || reference_link.title !== '')
    let title = _.trim((!_.isNull(reference_link.title) && reference_link.title !== '' && reference_link.title !== 'null' ? reference_link.title : _.trim(reference_link.document_file_name).replace(new RegExp('_', 'g'), ' ').replace(new RegExp('.pdf', 'g'), '')))
    let user_friendly_url = `https://poliok.it/library/${title.replace(new RegExp(' ', 'g'), '_')}`
    $('#reference_link_show_modal .header').append(`<h2>${title}<div id='reference_link_show_close_div'><a href='' class='user_friendly_reference_link_close'><i class="fa fa-times" aria-hidden="true"></i> close</div></a></h2><h5><div><a id='${reference_link['id']}' href="${user_friendly_url}" class='user_friendly_reference_link_anchor'>Copy document link</a></div></h5>`)
    let object = ``
    if (!reference_link['is_video']) {
      object = `<object data="${reference_link.absolute_url}" style="width:100%; min-height:800px;" frameborder="0"></object>`
    } else {
      object = `${getVimeoIframe(reference_link)}`
    }
    $('#reference_link_show_modal .content').append(object)
    $('#reference_link_show_modal').modal('show')
    let checkIfLibraryPathRegex = new RegExp(/^\/library\//)
    if(checkIfLibraryPathRegex.test(window.location.pathname)){
      let isAlreadyLibraryRegex = new RegExp(/\/library\/$/)
      if (!isAlreadyLibraryRegex.test(window.location.pathname)){
        history.pushState(null, null, '/library/')
      }
      history.pushState(null, null, title)
    } else {
      history.pushState(null, null, `/library/${title}`)
    }
    eventHandlingForAnchorCopy()
    ga('send', { 'hitType': 'pageview', 'page': `/library/${title}` })
  }

  $('#application').on('click', '.user_friendly_reference_link_close', e => {
    e.preventDefault()
    $('#reference_link_show_modal').modal('hide')
    return false
  })
  function vimeoIframeClickListeners(){
    let iframes = $('#application iframe.reference_download_tracker')
    iframes.each(function (){
      var self = this
      var player = new Vimeo.Player(this);
      player.on('play', () => {
        player.pause()
        referenceTrackAndLoad(this, this.getAttribute('id'))
      })
    })
  }
  vimeoIframeClickListeners()
  function getVimeoIframe(reference_link){
    let content = `<iframe src="${ reference_link.video_url }" width="100%" height="${$(window).innerHeight()*0.7}" frameborder="0" webkitallowfullscreen mozallowfullscreen  allowFullScreen></iframe>`
    content = _.replace(content, 'https://vimeo.com/', 'https://player.vimeo.com/video/')
    return content
  }

  $('#reference_link_show_modal').on('click', '#close_multimedia_modal_icon', e => {
    e.preventDefault()
    $('#reference_link_show_modal').modal('hide')
    return false
  })

  function eventHandlingForAnchorCopy(){
    $('#reference_link_show_modal').on('click', '.user_friendly_reference_link_anchor', function(e){
      e.preventDefault()
      $('#reference_link_show_modal').append(`<input id='copy_link_target' value='${$(e.currentTarget).attr('href')}'>`)
      $('#application #copy_link_target').select()
      document.execCommand('copy')
      $('#application #copy_link_target').remove()
      return false
    })
  }
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
        loadReferenceLinkToView(response.reference_link)
      })
    }
  })

})
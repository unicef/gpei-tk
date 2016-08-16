$(() => {
  $('html').bind('mousewheel', e => {
    $(this).unbind(e)
    if(e.originalEvent.wheelDelta /120 > 0) {
      // console.log('mwheelevent up')
    }
    else{
      e.preventDefault()
      let nav_bar_height = $('#nav_bar').outerHeight()
      $('#landing_page_sop_c4d_nav_container').css({
        paddingTop: nav_bar_height,
        display: 'block'
      })
      let second_container = $("#landing_page_sop_c4d_nav_container")
      $('html,body').animate({ scrollTop: second_container.offset().top },'slow')
      return false
    }
  })
})
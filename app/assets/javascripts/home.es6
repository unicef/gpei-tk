$(() => {
  $('html').bind('mousewheel', e => {
    e.preventDefault()
    $(this).unbind(e)
    if(e.originalEvent.wheelDelta /120 > 0) {
      //mwheelevent up
    }
    else{
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
  $('#link_to_second_part_of_landing').click(e => {
    e.preventDefault()
    return false
  })
})
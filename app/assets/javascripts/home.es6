$(() => {
  $('#link_to_second_part_of_landing').click(e => {
    e.preventDefault()
    let nav_bar_height = $('#nav_bar').outerHeight() + 50
    $('#landing_page_sop_c4d_nav_container').css({
      paddingTop: nav_bar_height,
      display: 'block'
    })
    let second_container = $("#landing_page_sop_c4d_nav_container")
    $('html,body').animate({ scrollTop: second_container.offset().top },'slow')
    return false
  })
})
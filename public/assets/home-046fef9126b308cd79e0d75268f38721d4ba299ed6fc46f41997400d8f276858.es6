$(() => {
  $('#link_to_second_part_of_landing').click(e => {
    e.preventDefault()
    let content = (`
      <div id="landing_page_sop_c4d_nav_container">
         <div id="landing_sop_container_header" class='row'>
         &nbsp;&nbsp;&nbsp;RESPOND TO AN OUTBREAK
         </div>
         <div id="landing_sop_container_content" class='row'>
           <div id='sop_c4d_landing_title_span'>&nbsp;&nbsp;SOP</div>
           <a id="landing_sop_c4d_angle_right" href='/sop/'><i class="fa fa-angle-right" aria-hidden="true"></i></a>
           <div id='sop_c4d_landing_description_span'>OUTBREAK RESPONSE STANDARD OPERATING PROCEDURES</div>
         </div>
         <div id="landing_c4d_container_header" class='row'>
          &nbsp;&nbsp;&nbsp;COMMUNICATE EFFECTIVELY
         </div>
         <div id="landing_c4d_container_content" class='row'>
           <div id='sop_c4d_landing_title_span'>&nbsp;&nbsp;C4D</div>
           <a id="landing_sop_c4d_angle_right" href='/c4d/'><i class="fa fa-angle-right" aria-hidden="true"></i></a>
           <div id='sop_c4d_landing_description_span'>COMMUNICATION FOR DEVELOPMENT</div>
         </div>
      </div>`)

    let nav_bar_height = $('#nav_bar').outerHeight()
    let landing_container_height = $('#landing_page_container').outerHeight()
    let landing_container_width = $('#landing_page_container').outerWidth()
    let difference = landing_container_height - nav_bar_height
    $('#landing_page_container').after(content)
    $('#landing_page_sop_c4d_nav_container').css({
      height: difference,
      width: landing_container_width/3,
      paddingTop: nav_bar_height
    })
    let second_container = $("#landing_page_sop_c4d_nav_container")
    $('html,body').animate({ scrollTop: second_container.offset().top },'slow')
    return false
  })
})

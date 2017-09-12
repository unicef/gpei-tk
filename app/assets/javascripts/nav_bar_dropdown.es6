var original_viewport_width = $(window).width()
$(() => {
  $('#toolkit_dropdown').dropdown({
    on: 'hover',
    action: 'nothing',
    transition: 'horizontal flip'
  })

  $('#c4d_category_dropdown').dropdown({
    on: 'hover',
    action: 'nothing',
    transition: 'horizontal flip'
  })

  $('#nav_about_link').click(e => {
    e.preventDefault()
    $('#user_account_modal .header').append(`<div class='about_header_header'>About Us</div>`)
    $('#user_account_modal .content').append(aboutUsContent())
    $('#user_account_modal').modal('toggle')
    return false
  })

  function aboutUsContent() {
    return (
        `<div class='about_content_header'><strong>About Rhizome:</strong></div>
        <div><br></div>
        <p class='about_content'>
        Rhizomes are underground plant systems that produce stems and roots. By continuously establishing new connections, the whole system grows, thrives and regenerates both above and below ground, even in the most challenging conditions.
        Inspired by this ecosystem of adaptation and innovation, this online resource is designed to support the endgame of global polio eradication by bringing together quality guidance, tools and standards for polio Communication for Development (C4D) strategies.

        For teams being deployed to outbreaks, the SOP pages digitize the Global Polio Eradication Initiative’s Standard Operating Procedures for Outbreak response and includes valuable resource documents for outbreak responders.

        Better strategies, better tools and access to best practices can improve results so no child is needlessly paralyzed by polio again.

        Rhizome is an initiative of the GPEI and is managed and maintained by the polio team of the United Nations Children Fund (UNICEF).</p>

        <div><br></div>
        <div class='about_content_header'><strong>About the GPEI:</strong></div>

        <div><br></div>
        <p class='about_content'>The Global Polio Eradication Initiative is a public-private partnership led by national governments and spearheaded by the World Health Organization (WHO), Rotary International, the US Centers for Disease Control and Prevention (CDC), and the United Nations Children’s Fund (UNICEF). Its goal is to eradicate polio worldwide. To find out more visit: www.polioeradication.org</p>`
      )
  }

  $(window).resize(e => {
    let padding = $('#nav_bar').outerHeight()
    padding += "px"

    let container_width = $('#sop_landing_image_container').outerWidth() + 'px'
    $('#sop_grid_filter_menu_container').css('width', container_width)

    if ($('#sop_selection_page').css('visibility') === 'visible'){
      let container_width = $('#sop_landing_image_container').outerWidth() + 'px'
      $('#sop_grid_filter_menu_container').css('width', container_width)
      let offset = $('nav').outerHeight()
      $('#sop_selection_page').offset({ top: offset })
    } else if ($('#c4d_selection_page').css('visibility') === 'visible'){
      let offset = $('nav').outerHeight()
      $('#c4d_selection_page').offset({ top: offset })
    }
  })

  let height = $('#sop_filter_clear_all').innerHeight()
  $('#select_filter_dropdown_menu').css({ height: height })

})
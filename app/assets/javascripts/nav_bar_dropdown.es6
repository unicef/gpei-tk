$(() => {
    $('#my_rhizome_dropdown .ui.pointing.dropdown.link.item.white_text_black_bg')
    .dropdown({
      on: 'hover',
      action: 'nothing'
    });

  $('#nav_about_link').click(e => {
    e.preventDefault()
    $('#user_account_modal .header').append('About Us')
    $('#user_account_modal .content').append(aboutUsContent())
    $('#user_account_modal').modal('toggle')
    return false
  })
  function aboutUsContent() {
    return `<div><strong>About Rhizome:</strong></div>
      <div><br></div>
      <p>
      Rhizomes are underground plant systems that produce stems and roots. By continuously establishing new connections, the whole system grows, thrives and regenerates both above and below ground, even in the most challenging conditions.
      Inspired by this ecosystem of adaptation and innovation, this online resource is designed to support the endgame of global polio eradication by bringing together quality guidance, tools and standards for polio Communication for Development (C4D) strategies.

      For teams being deployed to outbreaks, the SOP pages digitize the Global Polio Eradication Initiative’s Standard Operating Procedures for Outbreak response and includes valuable resource documents for outbreak responders.

      Better strategies, better tools and access to best practices can improve results so no child is needlessly paralyzed by polio again.

      Rhizome is an initiative of the GPEI and is managed and maintained by the polio team of the United Nations Children Fund (UNICEF).</p>

      <div><strong>About the GPEI:</strong></div>

      <p>The Global Polio Eradication Initiative is a public-private partnership led by national governments and spearheaded by the World Health Organization (WHO), Rotary International, the US Centers for Disease Control and Prevention (CDC), and the United Nations Children’s Fund (UNICEF). Its goal is to eradicate polio worldwide. To find out more visit: www.polioeradication.org</p>`
  }
})
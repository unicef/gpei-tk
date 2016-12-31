$(() => {
  if ($('#landing_page_sop_c4d_nav_container').css('visibility') === 'visible'){
    let nav_bar_height = $('nav').outerHeight()
    let $container = $("#landing_page_sop_c4d_nav_container")
    $container.css({
      paddingTop: nav_bar_height,
      display: 'block'
    })
  }

  if ($('#link_to_second_part_of_landing').css('visibility') === 'visible'){
    var mousewheelevt =(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
    $('html').bind(mousewheelevt, e => {
      e.preventDefault()
      $(this).unbind(e)
      if(e.originalEvent.wheelDelta /120 > 0) {
        //mwheelevent up
      }
      else{
        if ($('#landing_page_sop_c4d_nav_container').css('visibility') === 'visible') {
          transitionLandingPageToSopC4d()
          return false
        }
      }
    })
  }

  function transitionLandingPageToSopC4d() {
    let nav_bar_height = $('nav').outerHeight()
    let $second_container = $("#landing_page_sop_c4d_nav_container")
    $second_container.css({
      paddingTop: nav_bar_height,
      display: 'block'
    })
    $('html,body').animate({ scrollTop: $second_container.offset().top },'slow')
  }

  $('#link_to_second_part_of_landing').click(e => {
    e.preventDefault()
    transitionLandingPageToSopC4d()
    return false
  })

  $('#nav_contact_link').click(e => {
    e.preventDefault()
    $('#user_account_modal').modal('hide')
    $('#user_account_modal').modal('show')
    $('#user_account_modal #user_account_header').append('<h2>Send us your feedback</h2>')
    let content = getFeedbackForm()
    $('#user_account_modal #user_account_content').append(content)
  })

  function getFeedbackForm(){
    return `<form id="homepage_feedback_form" class="ui form">
              <div class="field">
                <label>Input your feedback:</label>
                <textarea name="feedback[content]" placeholder="" required></textarea>
              </div>
              <button class="ui button" type="submit">Submit</button>
            </form>`
  }

  $('#user_account_modal').on('submit', '#homepage_feedback_form', e => {
    e.preventDefault()
    let data = $(e.currentTarget).serialize()
    $.ajax({
      method: 'POST',
      url: '/feedback/',
      data: data
    }).done(response => {
      if (!_.isUndefined(response.error) && response.status === 403) {
        if (_.isEmpty($('#user_account_modal #error_header'))){
          $('#user_account_modal #user_account_content').append(`<h5 id='error_header'><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${response.error}</h5>`)
        } else {
          $('#user_account_modal #error_header').empty()
          $('#user_account_modal #error_header').append(`<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${response.error}`)
        }
      } else if (response.status === 200) {
        $('#user_account_modal #user_account_content').empty()
        $('#user_account_modal #user_account_header').empty()
        $('#user_account_modal #user_account_content').append('<h2>Thank you for your feedback!</h2>')
        _.delay(() => {
          $('#user_account_modal').modal('hide')
        }, 4000, 'later');
      }
    })
  })
})
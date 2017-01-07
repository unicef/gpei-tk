$(() => {
  if ($('#CMS_items').css('visibility') === 'visible'){
    $('#CMS_notifications').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/users/'
      }).done(response => {
        let users = response.users
        $.ajax({
          method: 'GET',
          url: '/cms/notifications/'
        }).done(response => {
          $('#CMS_index_content').empty()
          $('#CMS_index_content').append(getNotificationsGrid(response.notifications, users))
          toggleProgressSpinner()
        })
      })
    })

    let updatedSortFlow = false
    let createdSortFlow = false
    function loadIsotopeHandlers(){
      $(`#CMS_index_content #CMS_notifications_grid`).isotope({
        itemSelector: `.cms_feedback_row`,
        layoutMode: 'fitRows',
        getSortData: {
          updatedSort: function (ele) {
            return Date.parse($(ele).find('#updated_at_div').text()) * (updatedSortFlow ? -1 : 1)
          },
          createdSort: function (ele) {
            return (Date.parse($(ele).find('#created_at_div').text())) * (createdSortFlow ? -1 : 1)
          }
        }
      })
    }

    function toggleProgressSpinner(){
      if ($('#progress_spinner').css('visibility') === 'hidden')
        $('#progress_spinner').css('visibility', 'visible')
      else
        $('#progress_spinner').css('visibility', 'hidden')
    }

    function getNotificationsGrid(notifications, users){
      let content = `<div>
                      <h2>Notifications Index</h2>
                    </div>
                    <div id='cms_notifications_index_header' class='col-md-12 cms_div_borders'>
                      <div class="col-md-9 text-center"> Content </div>
                      <div class="col-md-1 text-center"><a id='updated_at_div' href=''> Updated </a></div>
                      <div class="col-md-1 text-center"><a id='created_at_div' href=''> Created </a></div>
                      <div class="col-md-1 text-center"> Author </div>
                    </div>
                    <div id='CMS_notifications_grid' class='col-md-12'>`
      let rows = ''
      let idx = 0
      let last_idx = notifications.length - 1
      _.forEach(notifications, notification => {
        rows += `<div id="${notification.id}" class="${idx === 0 ? 'first_feedback' : ''}${ idx === last_idx ? 'last_feedback' : ''} col-md-12 cms_feedback_row">
                  <div id='feedback_content_div' class='col-md-9 text-center cms_div_borders'>${notification.content}</div>
                  <div id='updated_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(notification.updated_at)}
                  </div>
                  <div id='created_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(notification.created_at)}
                  </div>
                  <div class='col-md-1 cms_div_borders'>
                    ${_.isNull(notification.author_id) ? '' : (users[notification.author_id].first_name + ' ' + users[notification.author_id].last_name)}
                  </div>
                </div>`
        idx += 1
      })
      content = content + rows
      content += `</div>`
      return content
    }
    $('#CMS_create_notifications').click(e => {
      e.preventDefault()
      $('#CMS_modal').modal('show')
      $('#CMS_modal .header').append('<h2>Create notification</h2>')
      $('#CMS_modal .content').append(getNotificationCreateForm())
    })

    function getNotificationCreateForm(){
      return `<form id="cms_notification_form" class="ui form">
              <div class="field">
                <label>Input your notification content:</label>
                <textarea name="notification[content]" placeholder="" required></textarea>
              </div>
              <button class="ui button" type="submit">Submit</button>
            </form>`
    }
    $('#CMS_modal').on('submit', '#cms_notification_form', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $(e.currentTarget).prop('disabled', true)
      let data = $(e.currentTarget).serialize()
      $.ajax({
        method: 'POST',
        url: '/cms/notifications/',
        data: data
      }).done(response => {
        toggleProgressSpinner()
        if (response.status === 200) {
          $('#CMS_modal').modal('hide')
          $('#CMS_notifications').trigger('click')
        }
      })
    })
  }
})
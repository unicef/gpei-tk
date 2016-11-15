$(() => {
  if ($('#CMS_items').css('visibility') === 'visible'){
    $('#CMS_user_feedback_index').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: 'cms/users/'
      }).done(response => {
        let users = response.users
        $.ajax({
          method: 'GET',
          url: '/cms/feedbacks/'
        }).done(response => {
          $('#CMS_index_content').empty()
          $('#CMS_index_content').append(getFeedbackContentGrid(response.feedbacks, users))
          toggleProgressSpinner()
        })
      })
    })

    function toggleProgressSpinner(){
      if ($('#progress_spinner').css('visibility') === 'hidden')
        $('#progress_spinner').css('visibility', 'visible')
      else
        $('#progress_spinner').css('visibility', 'hidden')
    }

    let updatedSortFlow = false
    let createdSortFlow = false
    function loadIsotopeHandlers(){
      $(`#CMS_index_content #CMS_feedbacks_grid`).isotope({
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

    function getFeedbackContentGrid(feedbacks, users){
      let content = `<div id='cms_feedbacks_index_header' class='col-md-12 cms_div_borders'>
                      <div class="col-md-9 text-center"> Content </div>
                      <div class="col-md-1 text-center"><a id='updated_at_div' href=''> Updated </a></div>
                      <div class="col-md-1 text-center"><a id='created_at_div' href=''> Created </a></div>
                      <div class="col-md-1 text-center"> Author </div>
                    </div>
                    <div id='CMS_feedbacks_grid' class='col-md-12'>`
      let rows = ''
      let idx = 0
      let last_idx = feedbacks.length - 1
      _.forEach(feedbacks, feedback => {
        rows += `<div id="${feedback.id}" class="${idx === 0 ? 'first_feedback' : ''}${ idx === last_idx ? 'last_feedback' : ''} col-md-12 cms_feedback_row">
                  <div id='feedback_content_div' class='col-md-9 text-center cms_div_borders'>${feedback.content}</div>
                  <div id='updated_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(feedback.updated_at)}
                  </div>
                  <div id='created_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(feedback.created_at)}
                  </div>
                  <div class='col-md-1 cms_div_borders'>
                    ${users[feedback.author_id].first_name + ' ' + users[feedback.author_id].last_name}
                  </div>
                </div>`
        idx += 1
      })
      content = content + rows
      content += `</div>`
      return content
    }
  }
})
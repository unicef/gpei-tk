$(() => {
  if ($('#CMS_items').css('visibility') === 'visible'){
    $('#CMS_tags').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/tags/'
      }).done(response => {
        $('#CMS_index_content').empty()
        $('#CMS_index_content').append(getTagsGrid(response.tags))
        toggleProgressSpinner()
      })
    })

    function loadIsotopeHandlers(){
      $(`#CMS_index_content #CMS_tags_grid`).isotope({
        itemSelector: `.cms_tag_row`,
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

    function getTagsGrid(tags){
      let content = `<div>
                      <h2>Tags Index</h2>
                    </div>
                    <div id='cms_tags_index_header' class='col-md-12 cms_div_borders'>
                      <div class="col-md-9 text-center"> Title </div>
                      <div class="col-md-1 text-center"><a id='updated_at_div' href=''> Updated </a></div>
                      <div class="col-md-1 text-center"><a id='created_at_div' href=''> Created </a></div>
                    </div>
                    <div id='CMS_tags_grid' class='col-md-12'>`
      let rows = ''
      let idx = 0
      let last_idx = tags.length - 1
      _.forEach(tags, tag => {
        rows += `<div id="${tag.id}" class="col-md-12 cms_tag_row">
                  <div id='tag_content_div' class='col-md-9 text-center cms_div_borders'>${tag.title}</div>
                  <div id='updated_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(tag.updated_at)}
                  </div>
                  <div id='created_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(tag.created_at)}
                  </div>
                  <div class='col-md-1'>
                    <a id='cms_tag_delete' href=''><i class="fa fa-times" aria-hidden="true"></i> delete</a>
                  </div>
                 </div>`
        idx += 1
      })
      content = content + rows
      content += `</div>`
      return content
    }
    $('#CMS_create_tags').click(e => {
      e.preventDefault()
      $('#CMS_modal').modal('show')
      $('#CMS_modal .header').append('<h2>Create tag</h2>')
      $('#CMS_modal .content').append(getTagCreateForm())
    })

    function getTagCreateForm(){
      return `<form id="cms_tag_form" class="ui form">
              <div class="field">
                <label>Input your tag title:</label>
                <input name="tag[title]" placeholder="" required></input>
              </div>
              <button class="ui button" type="submit">Submit</button>
            </form>`
    }
    $('#CMS_index_content').on('click', '#cms_tag_delete', e => {
      e.preventDefault()
      let parent_row = e.currentTarget.parentElement.parentElement
      let data = parent_row.id
      $.ajax({
        method: 'DELETE',
        url: '/cms/tags/' + data
      }).done(response => {
        parent_row.remove()
      })
      return false
    })
    $('#CMS_modal').on('submit', '#cms_tag_form', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $(e.currentTarget).prop('disabled', true)
      let data = $(e.currentTarget).serialize()
      $.ajax({
        method: 'POST',
        url: '/cms/tags/',
        data: data
      }).done(response => {
        toggleProgressSpinner()
        $(e.currentTarget).prop('disabled', false)
        if (response.status === 200) {
          $('#CMS_modal').modal('hide')
          $('#CMS_tags').trigger('click')
        }
      })
    })
  }
})
$(() => {
  $('#CMS_assets_link').click(e => {
    e.preventDefault()
  })

  // $('#CMS_index_content').on('click', '#add_reference_link_input', e => {
  //   e.preventDefault()
  //   $(e.currentTarget.parentElement.parentElement).after(getReferenceLinkField())
  //   return false
  // })

  $('#CMS_references_link').click(e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: '/cms/reference_links/'
    }).done(response => {
      let reference_links = response.reference_links
      $.ajax({
        method: 'GET',
        url: '/cms/users/'
      }).done(response => {
        $('#CMS_index_content').empty()
        appendReferenceLinkHeader()
        appendReferenceLinkRows(reference_links, response.users)
      })
    })

  })

  $('#CMS_references_link_upload').click(e => {
    e.preventDefault()
    let content = formForAssetsUpload()
    $('#CMS_index_content').empty()
    $('#CMS_index_content').append(content)
  })
  $('#CMS_index_content').on('submit', '#CMS_asset_upload_form', e => {
    e.preventDefault()
    let formData = new FormData($(e.currentTarget)[0])
    $.ajax({
      method: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      url: '/cms/reference_links/',
      data: formData
    }).done(response => {

    })
    return false
  })
  $('#CMS_index_content').on('change', '.reference_link_file', e => {
  })

  function getReferenceLinkField() {
    // <i class="fa fa-plus" aria-hidden="true"></i>
    return (`
      <div class="field">
        <label>Reference Link<a id="add_reference_link_input"  href=''></a></label>
        <input class="reference_link_file" type="file" name="reference_link[document]" value="">
      </div>
    `)
  }

  function formForAssetsUpload() {
    return (`
      <form id="CMS_asset_upload_form" class="ui form CMS_c4d_article_form_div">
        ${getLanguageDropdown()}
        ${getReferenceLinkField()}
        <button class="ui button" type="submit">Submit</button>
      </form>
      `)
  }

  function appendReferenceLinkHeader(){
    $('#CMS_index_content').append('<table id="CMS_reference_link_table" class="ui celled table"></table>')
    $('#CMS_reference_link_table').append('<thead><tr><th class="text-center"> Name </th><th class="text-center"> Updated </th><th class="text-center"> Created </th><th class="text-center"> Author </th></tr></thead>')
  }

  function appendReferenceLinkRows(reference_links, users){
    _.forEach(reference_links, reference_link => {
      let row = `<tr id="${reference_link.id}"><td>${reference_link.id}</td><td>${reference_link.file_name}</td><td>${moment(reference_link.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</td><td>${moment(reference_link.created_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</td><td>${users[reference_link.author_id].first_name + ' ' + users[reference_link.author_id].last_name}</td></tr>`
      $('#CMS_reference_link_table').append(row)
    })
  }
  function getLanguageDropdown(){
    return (`
      <div class="field">
        <label>Language</label>
        <select name="reference_link[language]" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </div>
    `)
  }
})
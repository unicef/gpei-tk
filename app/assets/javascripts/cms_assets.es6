$(() => {
  if ($('#CMS_index_content').css('visibility') === 'visible'){
    $('#CMS_assets_link').click(e => {
      e.preventDefault()
    })

    // $('#CMS_index_content').on('click', '#add_reference_link_input', e => {
    //   e.preventDefault()
    //   $(e.currentTarget.parentElement.parentElement).after(getReferenceLinkField())
    //   return false
    // })
    function toggleProgressSpinner(){
      if ($('#progress_spinner').css('visibility') === 'hidden')
        $('#progress_spinner').css('visibility', 'visible')
      else
        $('#progress_spinner').css('visibility', 'hidden')
    }

    /*   REFERENCE LINKS   */

    $('#CMS_references_link').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/reference_links/'
      }).done(response => {
        let reference_links = response.reference_links
        let reference_link_categories = response.reference_link_categories
        let categories = response.categories
        $.ajax({
          method: 'GET',
          url: '/cms/users/'
        }).done(response => {
          toggleProgressSpinner()
          let type = 'link'
          $('#CMS_index_content').empty()
          // appendReferenceLinkHeader()
          // appendReferenceLinkRows(reference_links, reference_link_categories, response.users)
          $('#CMS_index_content').append("<h2 id='cms_reference_links_list_header'>Uploaded Reference Links - (.pdf's) Index</h2>")
          $('#CMS_index_content').append(getReferenceLinkGrid(reference_links, reference_link_categories, response.users, type, categories))
          loadIsotopeHandlers(type)
        })
      })
    })

    $('#CMS_references_mp3').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/reference_mp3s/'
      }).done(response => {
        let reference_mp3s = response.reference_mp3s
        let reference_mp3_categories = response.reference_mp3_categories
        $.ajax({
          method: 'GET',
          url: '/cms/users/'
        }).done(response => {
          toggleProgressSpinner()
          let type = 'mp3'
          $('#CMS_index_content').empty()
          // appendReferencemp3Header()
          // appendReferencemp3Rows(reference_mp3s, reference_mp3_categories, response.users)
          $('#CMS_index_content').append("<h2 id='cms_reference_mp3s_list_header'>Uploaded Reference mp3s - (.pdf's) Index</h2>")
          $('#CMS_index_content').append(getReferenceLinkGrid(reference_mp3s, reference_mp3_categories, response.users, type))
          loadIsotopeHandlers(type)
        })
      })
    })

    $('#CMS_references_pptx').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/reference_pptxes/'
      }).done(response => {
        let reference_pptxes = response.reference_pptxes
        let reference_pptx_categories = response.reference_pptx_categories
        $.ajax({
          method: 'GET',
          url: '/cms/users/'
        }).done(response => {
          toggleProgressSpinner()
          let type = 'pptx'
          $('#CMS_index_content').empty()
          // appendReferencepptxHeader()
          // appendReferencepptxRows(reference_pptxs, reference_pptx_categories, response.users)
          $('#CMS_index_content').append("<h2 id='cms_reference_pptxs_list_header'>Uploaded Reference pptxs - (.pdf's) Index</h2>")
          $('#CMS_index_content').append(getReferenceLinkGrid(reference_pptxes, reference_pptx_categories, response.users, type))
          loadIsotopeHandlers(type)
        })
      })
    })
      $('#CMS_references_pptx_upload').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      let content = formForReferenceLinkUpload('pptx')
      $('#CMS_index_content').empty()
      $('#CMS_index_content').append(content)
      toggleProgressSpinner()
    })

    $('#CMS_references_mp3_upload').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      let content = formForReferenceLinkUpload('mp3')
      $('#CMS_index_content').empty()
      $('#CMS_index_content').append(content)
      toggleProgressSpinner()
    })

    function loadIsotopeHandlers(type){
      $(`#CMS_index_content #cms_reference_${type}_grid`).isotope({
        itemSelector: `.reference_${type}_item`,
        layoutMode: 'fitRows'
      })
      $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter')
        // use filter function if value matches
        $(`#CMS_index_content #cms_reference_${type}_grid`).isotope({ filter: filterValue })
      })
      $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup )
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked')
          $( this ).addClass('is-checked')
        })
      })
    }

    $('#CMS_index_content').on('submit', '#cms_reference_link_search_form', e => {
      e.preventDefault()
      var filterFunc =  function() {
        let search_value = $('#cms_reference_link_search_form input').val()
        let title = $(this).find('#cms_reference_link_title').text();
        let file_name = $(this).find('#cms_reference_link_file_name_div').text();
        let regex_search_value = new RegExp(search_value, 'i')
        let found_file_name = file_name.match(regex_search_value)
        let found_title = title.match(regex_search_value)
        return found_title || found_file_name;
      }
      $('#cms_reference_link_grid').isotope({ filter: filterFunc })
      return false
    })

    var filterFns = {
      numberGreaterThan50: function() {
      }
    }
    function getReferenceLinkGrid(reference_links, reference_link_categories, users, type, categories){
      return `<div id='cms_reference_${type}s_filter_menu' class="button-group filter-button-group col-md-12">
                <div class='col-md-6'>
                  <div class='col-md-12'>Sort by:</div>
                  <button data-filter="*" class='button is-checked'>show all</button>
                  <button data-filter=".Unassigned" class='button'>unassigned</button>
                </div>
                <div class='col-md-6'>
                  <form id='cms_reference_${type}_search_form'>
                    <label>Search reference ${type}s by title or file name:</label>
                    <input class="reference_${type}_file" type="text" name="cms_reference_${type}_search" value="">
                    <button type="submit">search</button>
                  </form>
                </div>
                <div class='col-md-12'>
                  <div class='col-md-12'>Sort by SOP categories:</div>
                  ${_.map(categories['sop_categories'], category => {
                      return `<button data-filter=".${category.title.replace(new RegExp(' ', 'g'), '_')}" class='button'>${category.title}</button>`
                  }).join('')}
                </div>
                <div class='col-md-12'>
                  <div class='col-md-12'>Sort by C4D categories:</div>
                  ${_.map(categories['c4d_categories'], category => {
                      return `<button data-filter=".${category.title}" class='button'>${category.title}</button>`
                  }).join('')}
                </div>
              </div>
              <div id="cms_reference_${type}_grid" class='col-md-11'>
              ${ _.map(reference_links, reference_link => {
                  return `<div id="${reference_link.id}" class="col-md-12 reference_${type}_item ${_.isUndefined(reference_link_categories[reference_link.id]) ? 'Unassigned' : _.map(reference_link_categories[reference_link.id], link => { return link.category.replace(new RegExp(' ', 'g'), '_') }).join(" ") }">
                      <div class='col-md-4'>
                        <div id='reference_${type}_list_name_td' class='col-md-12'>
                          <div id='${ reference_link.id }' class='col-md-12'>
                            <a id='cms_reference_${type}_icon' href="${ reference_link.absolute_url }" target='_blank'><i class="fa fa-search" aria-hidden="true"></i> <strong><u>Preview .pdf</u></strong></a>
                            <div id='cms_reference_${type}_title'>Title: <div id='cms_reference_${type}_title_div'>${!_.isNull(reference_link.title) ? reference_link.title : 'No title given' }</div></div>
                            <div style='height:10px' class='col-md-12'></div>
                            <div class='col-md-12'><strong>File name:</strong> <div id='cms_reference_${type}_file_name_div'>${ type === 'mp3' ? reference_link.clip_file_name : reference_link.document_file_name }</div></div>
                          </div>
                          <div style='height:10px' class='col-md-12'></div>
                          <div class='col-md-12'>
                            <div class='col-md-12'><strong>Description:</strong></div>
                            <div id='cms_reference_${type}_description_div' class='col-md-12'>${!_.isNull(reference_link.description) ? reference_link.description : 'Description coming soon'}</div>
                          </div>
                          <div style='height:10px' class='col-md-12'></div>
                        </div>
                      </div>
                      <div class='col-md-2'><strong>Where pdf is attached:</strong><br> ${ _.isUndefined(reference_link_categories[reference_link.id]) ? '' : _.map(reference_link_categories[reference_link.id], reference_link_categories => { return reference_link_categories.details }).join("<div style='height:2px;background:black;width:100%'></div>")}</div>
                      <div class='col-md-1 text-center'><strong>Language:</strong><br> ${reference_link.language}</div>
                      <div class='col-md-1'><strong>Updated:</strong><br> ${moment(reference_link.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</div>
                      <div class='col-md-1'><strong>Created:</strong><br> ${moment(reference_link.created_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</div>
                      <div id='cms_author_div' class='col-md-2'><strong>Author:</strong><br> ${users[reference_link.author_id].first_name + ' ' + users[reference_link.author_id].last_name}</div>
                      <div class='col-md-1'><a id='reference_${type}_delete' href=''><i class="fa fa-times" aria-hidden="true"></i> delete</a></div>
                      <div id='${reference_link.id}' class='col-md-3 bottom-right-position'><a id='cms_reference_${type}_edit' href="${ reference_link.absolute_url }"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</a></div>
                    </div>`}).join('')}
                </div>`
    }
    $('#CMS_references_link_upload').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      let content = formForReferenceLinkUpload('link')
      $('#CMS_index_content').empty()
      $('#CMS_index_content').append(content)
      toggleProgressSpinner()
    })

    $('#CMS_index_content').on('submit', '#CMS_reference_link_upload_form', e => {
      e.preventDefault()
      // let formData = new FormData($(e.currentTarget)[0])
      let formData = new FormData()
      $.each($("input[type=file]")[0].files, (idx, file) => {
        formData.append('reference_link['+idx+']', file);
      })
      formData.append('language', $('#CMS_reference_link_upload_form').find('select')[0].value)
      $('#CMS_reference_link_upload_form button').prop('disabled', true)
      toggleProgressSpinner()
      $.ajax({
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        url: 'cms/reference_links/',
        data: formData
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_reference_link_upload_form button').prop('disabled', false)
        if (response.status === 403){
          alert(response.error)
        } else {
          $('#CMS_references_link_upload').click()
          showDimmerClearBrowser()
        }
      })
      return false
    })
    $('#CMS_index_content').on('submit', '#CMS_reference_mp3_upload_form', e => {
      e.preventDefault()
      // let formData = new FormData($(e.currentTarget)[0])
      let formData = new FormData()
      $.each($("input[type=file]")[0].files, (idx, file) => {
        formData.append('reference_mp3['+idx+']', file);
      })
      formData.append('language', $('#CMS_reference_mp3_upload_form').find('select')[0].value)
      $('#CMS_reference_mp3_upload_form button').prop('disabled', true)
      toggleProgressSpinner()
      $.ajax({
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        url: 'cms/reference_mp3s/',
        data: formData
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_reference_mp3_upload_form button').prop('disabled', false)
        if (response.status === 403){
          alert(response.error)
        } else {
          $('#CMS_references_mp3_upload').click()
          showDimmerClearBrowser()
        }
      })
      return false
    })
    $('#CMS_index_content').on('submit', '#CMS_reference_pptx_upload_form', e => {
      e.preventDefault()
      // let formData = new FormData($(e.currentTarget)[0])
      let formData = new FormData()
      $.each($("input[type=file]")[0].files, (idx, file) => {
        formData.append('reference_pptx['+idx+']', file);
      })
      formData.append('language', $('#CMS_reference_pptx_upload_form').find('select')[0].value)
      $('#CMS_reference_pptx_upload_form button').prop('disabled', true)
      toggleProgressSpinner()
      $.ajax({
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        url: 'cms/reference_pptxes/',
        data: formData
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_reference_pptx_upload_form button').prop('disabled', false)
        if (response.status === 403){
          alert(response.error)
        } else {
          $('#CMS_references_pptx_upload').click()
          showDimmerClearBrowser()
        }
      })
      return false
    })

    function showDimmerClearBrowser() {
      $('.ui.dimmer').dimmer('show')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
      history.pushState({}, null, 'cms');
    }
    function getReferenceLinkField(type) {
      // <i class="fa fa-plus" aria-hidden="true"></i>
      return (`
        <div class="field">
          <label>Reference ${type}<a id="add_reference_${type}_input"  href=''></a></label>
          <input class="reference_${type}_file" type="file" name="reference_${type}[]" value="" multiple>
        </div>
      `)
    }

    function formForReferenceLinkUpload(type) {
      return (`
        <h2 id='cms_reference_${type}_list_header'>Select reference ${type} to upload</h2>
        <form id="CMS_reference_${type}_upload_form" class="ui form CMS_c4d_article_form_div">
          ${getLanguageDropdown(type)}
          ${getReferenceLinkField(type)}
          <button class="ui button" type="submit">Submit</button>
        </form>
        `)
    }

    function appendReferenceLinkHeader(){
      $('#CMS_index_content').append('<table id="CMS_reference_link_table" class="ui celled table"></table>')
      $('#CMS_reference_link_table').append(`<thead>
                                                <tr>
                                                  <th class="text-center"> Name </th>
                                                  <th class="text-center"> Categories + Order Id </th>
                                                  <th class="text-center"> Language </th>
                                                  <th class="text-center"> Updated </th>
                                                  <th class="text-center"> Created </th>
                                                  <th class="text-center"> Author </th>
                                                  <th class="text-center"> Action </th>
                                                </tr>
                                              </thead>`)
    }
    $('#CMS_index_content').on('click', '#reference_link_delete', e => {
      e.preventDefault()
      let answer = confirm('This will permanently delete the reference link. Do you wish to continue?')
      if (answer){
        toggleProgressSpinner()
        $.ajax({
          method: 'DELETE',
          url: '/cms/reference_links/' + e.currentTarget.parentElement.parentElement.id
        }).done(response => {
          toggleProgressSpinner()
          $('#CMS_references_link').trigger('click')
        })
      }
    })
    $('#CMS_index_content').on('click', '#reference_mp3_delete', e => {
      e.preventDefault()
      let answer = confirm('This will permanently delete the reference link. Do you wish to continue?')
      if (answer){
        toggleProgressSpinner()
        $.ajax({
          method: 'DELETE',
          url: '/cms/reference_mp3s/' + e.currentTarget.parentElement.parentElement.id
        }).done(response => {
          toggleProgressSpinner()
          $('#CMS_references_mp3').trigger('click')
        })
      }
    })
    $('#CMS_index_content').on('click', '#reference_pptx_delete', e => {
      e.preventDefault()
      let answer = confirm('This will permanently delete the reference link. Do you wish to continue?')
      if (answer){
        toggleProgressSpinner()
        $.ajax({
          method: 'DELETE',
          url: '/cms/reference_pptxes/' + e.currentTarget.parentElement.parentElement.id
        }).done(response => {
          toggleProgressSpinner()
          $('#CMS_references_pptx').trigger('click')
        })
      }
    })
    function appendReferenceLinkRows(reference_links, reference_link_categories, users){
      _.forEach(reference_links, reference_link => {
        let row = `<tr id="${reference_link.id}">
                    <td>
                      <div id='reference_link_list_name_td' class='col-md-12'>
                        <div id='${ reference_link.id }' class='col-md-12'>
                          <a id='cms_reference_link_icon' href="${ reference_link.absolute_url }" target='_blank'><i class="fa fa-search" aria-hidden="true"></i> Preview</a>
                          <div>Title: <div id='cms_reference_link_title_div'>${!_.isNull(reference_link.title) ? reference_link.title : 'No title given' }</div></div>
                          <div style='height:10px' class='col-md-12'></div>
                          <div class='col-md-12'>File name: <div id='cms_reference_link_file_name_div'>${ reference_link.document_file_name }</div></div>
                        </div>
                        <div style='height:10px' class='col-md-12'></div>
                        <div class='col-md-12'>
                          <div class='col-md-12'>Description:</div>
                          <div id='cms_reference_link_description_div' class='col-md-12'>${!_.isNull(reference_link.description) ? reference_link.description : 'Description coming soon'}</div>
                        </div>
                        <div style='height:10px' class='col-md-12'></div>
                        <div id='${reference_link.id}' class='col-md-3 bottom-right-position'><i class="fa fa-pencil-square-o" aria-hidden="true"></i><a id='cms_reference_link_edit' href="${ reference_link.absolute_url }">Edit</a></div>
                      </div>
                    </td>
                    <td>${ _.isUndefined(reference_link_categories[reference_link.id]) ? '' : _.map(reference_link_categories[reference_link.id], reference_link_categories => { return reference_link_categories.details }).join("<div style='height:2px;background:black;width:100%'></div>")}</td>
                    <td>${reference_link.language}</td>
                    <td>${moment(reference_link.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</td>
                    <td>${moment(reference_link.created_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</td>
                    <td id='cms_author_td'>${users[reference_link.author_id].first_name + ' ' + users[reference_link.author_id].last_name}</td>
                    <td><a id='reference_link_delete' href=''><i class="fa fa-times" aria-hidden="true"></i> delete</a></td>
                  </tr>`
        $('#CMS_reference_link_table').append(row)
      })
    }
    $('#CMS_index_content').on('click', '#cms_reference_link_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $('#CMS_modal').modal('show')
      $('#CMS_modal #CMS_modal_header').append("<h3>Reference link - (.pdf) - Edit</h3>")
      let title = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_link_title_div').text()
      let description = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_link_description_div').text()
      let file_name = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_link_file_name_div').text()
      // $('#CMS_index_content').empty()
      let content = getReferenceLinkEditForm(title,
                                            $(e.currentTarget).attr('href'),
                                              e.currentTarget.parentElement.id,
                                              description,
                                              file_name, 'link')
      $('#CMS_modal #CMS_modal_content').append(content)
      // $('#CMS_index_content').append(content)
      toggleProgressSpinner()
      return false
    })
    $('#CMS_index_content').on('click', '#cms_reference_mp3_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $('#CMS_modal').modal('show')
      $('#CMS_modal #CMS_modal_header').append("<h3>Reference mp3 - (.mp3) - Edit</h3>")
      let title = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_mp3_title_div').text()
      let description = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_mp3_description_div').text()
      let file_name = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_mp3_file_name_div').text()
      // $('#CMS_index_content').empty()
      let content = getReferenceLinkEditForm(title,
                                            $(e.currentTarget).attr('href'),
                                              e.currentTarget.parentElement.id,
                                              description,
                                              file_name, 'mp3')
      $('#CMS_modal #CMS_modal_content').append(content)
      // $('#CMS_index_content').append(content)
      toggleProgressSpinner()
      return false
    })
    $('#CMS_index_content').on('click', '#cms_reference_pptx_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $('#CMS_modal').modal('show')
      $('#CMS_modal #CMS_modal_header').append("<h3>Reference pptx - (.pptx) - Edit</h3>")
      let title = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_pptx_title_div').text()
      let description = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_pptx_description_div').text()
      let file_name = $('#CMS_index_content #' + e.currentTarget.parentElement.id + ' #cms_reference_pptx_file_name_div').text()
      // $('#CMS_index_content').empty()
      let content = getReferenceLinkEditForm(title,
                                            $(e.currentTarget).attr('href'),
                                              e.currentTarget.parentElement.id,
                                              description,
                                              file_name, 'pptx')
      $('#CMS_modal #CMS_modal_content').append(content)
      // $('#CMS_index_content').append(content)
      toggleProgressSpinner()
      return false
    })

    function getReferenceLinkEditForm(reference_link_title, url, id, description, file_name, type){
      return `<div id='${id}'>
                <form id="CMS_reference_${type}_edit" class="ui form">
                  <div class="field">
                    <label>
                      <h4>
                        <a id='' href="${url}" target='_blank'>
                          <i class="fa fa-search" aria-hidden="true"></i> <strong><u>Preview .pdf</u></strong>
                        </a><br>
                        <u>File name:</u> ${file_name}
                        <br>
                        <u>Title:</u>
                      </h4>
                    </label>
                    <input class="reference[title]" type="text" placeholder="No title" name="reference_${type}[title]" value="${(_.isNull(reference_link_title) || reference_link_title === '' || reference_link_title === 'No title given') ? '' : reference_link_title}" style='margin-bottom:5px' required>
                    <label>Description:</label>
                    <textarea name="reference_${type}[description]" placeholder="descriptive text" required>${(_.isNull(description) || description === '' || description === 'Description coming soon') ? '' : description}</textarea>
                  </div>
                  <button class="ui button" type="submit">Submit</button>
                </form>
              </div>`
    }
    $('#CMS_modal').on('submit', '#CMS_reference_link_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      let target = e.currentTarget
      $.ajax({
        method: 'PATCH',
        url: '/cms/reference_links/' + e.currentTarget.parentElement.id,
        data: $(e.currentTarget).serialize()
      }).done(response => {
        $('#CMS_modal').modal('hide')
        toggleProgressSpinner()
        $('#cms_reference_link_grid #'+response.id+'.reference_link_item').find('#cms_reference_link_title_div').text(response.title)
        $('#cms_reference_link_grid #'+response.id+'.reference_link_item').find('#cms_reference_link_description_div').text(response.description)
      })
      return false
    })

    $('#CMS_modal').on('submit', '#CMS_reference_mp3_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      let target = e.currentTarget
      $.ajax({
        method: 'PATCH',
        url: '/cms/reference_mp3s/' + e.currentTarget.parentElement.id,
        data: $(e.currentTarget).serialize()
      }).done(response => {
        $('#CMS_modal').modal('hide')
        toggleProgressSpinner()
        $('#cms_reference_mp3_grid #'+response.id+'.reference_mp3_item').find('#cms_reference_mp3_title_div').text(response.title)
        $('#cms_reference_mp3_grid #'+response.id+'.reference_mp3_item').find('#cms_reference_mp3_description_div').text(response.description)
      })
      return false
    })

    $('#CMS_modal').on('submit', '#CMS_reference_pptx_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      let target = e.currentTarget
      $.ajax({
        method: 'PATCH',
        url: '/cms/reference_pptxes/' + e.currentTarget.parentElement.id,
        data: $(e.currentTarget).serialize()
      }).done(response => {
        $('#CMS_modal').modal('hide')
        toggleProgressSpinner()
        $('#cms_reference_pptx_grid #'+response.id+'.reference_pptx_item').find('#cms_reference_pptx_title_div').text(response.title)
        $('#cms_reference_pptx_grid #'+response.id+'.reference_pptx_item').find('#cms_reference_pptx_description_div').text(response.description)
      })
      return false
    })

    function getLanguageDropdown(type){
      return (`
        <div class="field">
          <label>Language</label>
          <select name="reference_${type}[language]" class="ui dropdown cms_dropdown_select" required>
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="other">Other</option>
          </select>
        </div>
      `)
    }

      /*   EMBEDDED IMAGES LINKS   */
    $('#CMS_embedded_images_link').click(e => {
      e.preventDefault()
    })

    $('#CMS_embedded_images_link_upload').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: 'cms/c4d_articles/'
      }).done(response => {
        toggleProgressSpinner()
        let content = formForEmbeddedImagesUpload(response.c4d_articles)
        $('#CMS_index_content').empty()
        $('#CMS_index_content').append(content)
      })
    })

    $('#CMS_index_content').on('submit', '#CMS_embedded_image_upload_form', e => {
      e.preventDefault()
      let formData = new FormData($(e.currentTarget)[0])
      toggleProgressSpinner()
      $.ajax({
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        url: 'cms/embedded_images/',
        data: formData
      }).done(response => {
        toggleProgressSpinner()
        showDimmerClearBrowser()
        $('#CMS_embedded_images_link_upload').click()
      })
      return false
    })

    function formForEmbeddedImagesUpload(c4d_articles){
      return (`
        <form id="CMS_embedded_image_upload_form" class="ui form CMS_c4d_article_form_div">
          ${getC4dArticleDropdown(c4d_articles)}
          ${getEmbeddedImageField()}
          <button class="ui button" type="submit">Submit</button>
        </form>
        `)
    }
    function getC4dArticleDropdown(c4d_articles){
      return (`
        <div class="field">
          <label>C4D Article</label>
          <select name="embedded_image[article_id]" class="ui dropdown cms_dropdown_select" required>
            <option value="">Select Article</option>
            ${_.map(c4d_articles, article => {
              return `<option value="${article.id}">Order ID:${article.order_id} Title: ${article.title}</option>`
            }).join('\n')}
          </select>
        </div>
      `)
    }

    function getEmbeddedImageField(){
      // <i class="fa fa-plus" aria-hidden="true"></i>
      return (`
        <div class="field">
          <label>Attached Image:<a id="add_embedded_images_input"  href=''></a></label>
          <input class="embedded_image_file" type="file" name="embedded_image[image]" value="">
        </div>
      `)
    }
  }
})
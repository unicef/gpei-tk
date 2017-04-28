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
          $('#CMS_index_content').append("<h2 id='cms_reference_links_list_header'>Uploaded Reference Links - (.pdf's) Index</h2>")
          $('#CMS_index_content').append(getReferenceLinkGrid(reference_links, reference_link_categories, response.users, type, categories, false, false, null))
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
        let categories = response.categories
        $.ajax({
          method: 'GET',
          url: '/cms/users/'
        }).done(response => {
          toggleProgressSpinner()
          let type = 'mp3'
          $('#CMS_index_content').empty()
          $('#CMS_index_content').append("<h2 id='cms_reference_mp3s_list_header'>Uploaded Reference mp3s - (.mp3's) Index</h2>")
          $('#CMS_index_content').append(getReferenceLinkGrid(reference_mp3s, reference_mp3_categories, response.users, type, categories))
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
        let categories = response.categories
        $.ajax({
          method: 'GET',
          url: '/cms/users/'
        }).done(response => {
          toggleProgressSpinner()
          let type = 'pptx'
          $('#CMS_index_content').empty()
          $('#CMS_index_content').append("<h2 id='cms_reference_pptxs_list_header'>Uploaded Reference Pptxes - (powerpoint) Index</h2>")
          $('#CMS_index_content').append(getReferenceLinkGrid(reference_pptxes, reference_pptx_categories, response.users, type, categories))
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
      $('#CMS_index_content #cms_reference_link_filter_dropdown').dropdown({
        on: 'hover',
        action: 'nothing',
        transition: 'horizontal flip'
      })

      $(`#CMS_index_content #cms_reference_${type}_grid`).isotope({
        itemSelector: `.reference_${type}_item`,
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

    let updatedSortFlow = false
    $('#CMS_index_content').on('click', '#cms_reference_link_updated_column', e => {
      e.preventDefault()
      $('#cms_reference_link_grid').isotope({
        sortAscending: updatedSortFlow
      })
      $('#cms_reference_link_grid').isotope({ sortBy: 'updatedSort' })
      updatedSortFlow = !updatedSortFlow
    })

    let createdSortFlow = false
    $('#CMS_index_content').on('click', '#cms_reference_link_created_column', e => {
      e.preventDefault()
      $('#cms_reference_link_grid').isotope({
        sortAscending: createdSortFlow
      })
      $('#cms_reference_link_grid').isotope({ sortBy: 'createdSort' })
      createdSortFlow = !createdSortFlow
    })
    $('#CMS_index_content').on('submit', '#cms_reference_link_search_form', e => {
      e.preventDefault()
      var filterFunc =  function() {
        let search_value = $('#cms_reference_link_search_form input').val()
        let title = $(this).find('#cms_reference_link_title').text().replace(new RegExp('_', 'g'), ' ');
        let file_name = $(this).find('#cms_reference_link_file_name_div').text().replace(new RegExp('_', 'g'), ' ');
        let regex_search_value = new RegExp(search_value, 'i')
        let found_file_name = file_name.match(regex_search_value)
        let found_title = title.match(regex_search_value)
        return found_title || found_file_name || !_.isNull(_.lowerCase(_.trim($(this).find('#cms_reference_link_file_name_div').text())).match(_.lowerCase(_.trim(search_value))))
      }
      $('#cms_reference_link_grid').isotope({ filter: filterFunc })
      return false
    })

    function getReferenceLinkGrid(reference_links, reference_link_categories, users, type, categories, isNotEditable, isNotDeletable, featured){
      return `<div id='cms_reference_link_filter_dropdown' class="ui pointing dropdown col-md-3">
                <div class='text'><i class="fa fa-filter fa-2x" aria-hidden="true"></i><strong>Hover to select a filter</strong></div>
                <div id="" class="menu">
                  <div class='item'>
                    <div id='cms_reference_${type}s_filter_menu' class="button-group filter-button-group col-md-12">
                      <div class='col-md-6'>
                        <div class='col-md-12'>Filter by:</div>
                        <button data-filter="*" class='button is-checked'>show all</button>
                        <button data-filter=".Unassigned" class='button'>unassigned</button>
                      </div>
                      <div class='col-md-9'>
                        <div class='col-md-12'>Filter by SOP categories:</div>
                        <div class='col-md-6'>
                          ${_.map(categories['sop_categories'], category => {
                              return `<button data-filter=".${category.title.replace(new RegExp(' ', 'g'), '_')}" class='button'>${category.title}</button>`
                          }).join('')}
                        </div>
                      </div>
                      <div class='col-md-9'>
                        <div class='col-md-12'>Filter by C4D categories:</div>
                        ${_.map(categories['c4d_categories'], category => {
                            return `<button data-filter=".${category.title}" class='button'>${category.title}</button>`
                        }).join('')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-md-offset-2 col-md-7'>
                <form id='cms_reference_${type}_search_form'>
                  <label>Search reference ${type}s by title or file name:</label>
                  <input class="reference_${type}" type="text" name="cms_reference_${type}_search" value="">
                  <button type="submit">search</button>
                </form>
              </div>
              <div id="cms_reference_${type}_grid" class='col-md-11'>
              ${ _.map(reference_links, reference_link => {
                  return `<div id="${reference_link.id}" class="col-md-12 reference_${type}_item ${_.isUndefined(reference_link_categories[reference_link.id]) ? 'Unassigned' : _.map(reference_link_categories[reference_link.id], link => { return link.category.replace(new RegExp(' ', 'g'), '_') }).join(" ") }">
                      <div class='col-md-4'>
                        <div id='reference_${type}_list_name_td' class='col-md-12'>
                          <div id='${ reference_link.id }' class='col-md-12'>
                            <a id='cms_reference_${type}_icon' href="${ _.isEmpty(reference_link.absolute_url) ? '' : reference_link.absolute_url }" target='_blank'><i class="fa fa-search" aria-hidden="true"></i> <strong><u>Preview .${type === 'link' ? 'pdf' : type}</u></strong></a>
                            <div id='cms_reference_${type}_title'><strong>Title:</strong> <div id='cms_reference_${type}_title_div'>${!_.isEmpty(reference_link.title) ? reference_link.title : 'No title given' }</div></div>
                            <div style='height:10px' class='col-md-12'></div>
                            <div class='col-md-12'><strong>File name:</strong> <div id='cms_reference_${type}_file_name_div'>${ type === 'mp3' ? _.isEmpty(reference_link.clip_file_name) ? 'No clip name' : reference_link.clip_file_name : _.isEmpty(reference_link.document_file_name) ? 'No file name' : reference_link.document_file_name }</div></div>
                          </div>
                          <div style='height:10px' class='col-md-12'></div>
                          <div class='col-md-12'>
                            <div class='col-md-12'><strong>Description:</strong></div>
                            <div id='cms_reference_${type}_description_div' class='col-md-12'>${!_.isEmpty(reference_link.description) ? reference_link.description : 'Description coming soon'}</div>
                          </div>
                          <div style='height:10px' class='col-md-12'></div>
                          <div class='col-md-12'>
                            <div class='col-md-12'><strong>${type === 'mp3' ? 'Clip' : 'Document'} Language:</strong></div>
                            <div id='cms_reference_${type}_document_language_div' class='col-md-12'>${!_.isEmpty(reference_link.document_language) ? reference_link.document_language : 'No document language input'}</div>
                          </div>
                          <div class='col-md-12'>
                            <div class='col-md-12'><strong>Tags:</strong></div>
                            <div id='cms_reference_${type}_tags_div' class='col-md-12'>${!_.isUndefined(reference_link_categories[reference_link.id]) ? _.map(reference_link_categories[reference_link.id][0]['tags'], tag => { return tag.title }).join(' ') : ''}</div>
                          </div>
                          <div style='height:10px' class='col-md-12'></div>
                          <div class='col-md-12'>
                            <div class='col-md-12'><strong>Places:</strong></div>
                            <div id='cms_reference_${type}_places_div' class='col-md-12'>${!_.isEmpty(reference_link.places) ? _.map(reference_link.places, place => { return place.title }).join(' ') : 'No places selected'}</div>
                          </div>
                          <div style='height:10px' class='col-md-12'></div>
                          <div class='col-md-12'>
                            <div class='col-md-12'><strong>Languages:</strong></div>
                            <div id='cms_reference_${type}_languages_div' class='col-md-12'>${!_.isEmpty(reference_link.languages) ? _.map(reference_link.languages, language => { return language.title }).join(' ') : 'No languages selected'}</div>
                          </div>
                          <div style='height:10px' class='col-md-12'></div>
                          ${ type === 'link' ?
                            `<div class='col-md-12'>
                              <div class='col-md-12'><strong>Video URL:</strong></div>
                              <div id='cms_reference_${type}_video_url_div' class='col-md-12'>${ !_.isEmpty(reference_link.video_url) ? `${reference_link.video_url}` : 'No video URL' }</div>
                            </div>
                            <div style='height:10px' class='col-md-12'></div>`
                            : ''}
                        </div>
                      </div>
                      <div class='col-md-2'><strong>Where ${type === 'link' ? 'pdf' : type} is attached:</strong><br> ${ _.isUndefined(reference_link_categories[reference_link.id]) ? '' : _.map(reference_link_categories[reference_link.id], reference_link_categories => { return reference_link_categories.details }).join("<div style='height:2px;background:black;width:100%'></div>")}</div>
                      <div class='col-md-1 text-center'><strong>Language:</strong><br> ${reference_link.language}</div>
                      <div class='col-md-1'><a id='cms_reference_link_updated_column' href=''><strong>Updated:</strong></a><br> <div id='updated_at_div'>${moment(reference_link.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</div></a></div>
                      <div class='col-md-1'><a id='cms_reference_link_created_column' href=''><strong>Created:</strong></a><br><div id='created_at_div'>${moment(reference_link.created_at, "YYYY-MM-DD").format("MMM DD, YYYY")}</div></div>
                      ${ _.isEmpty(users) ? `<div id='cms_author_div' class='col-md-2'><strong>Author:</strong><br></div>` : `<div id='cms_author_div' class='col-md-2'><strong>Author:</strong><br> ${users[reference_link.author_id].first_name + ' ' + users[reference_link.author_id].last_name}</div>`}
                      ${ isNotDeletable === true ? `<div class='col-md-1'><a id='reference_link_${featured}_delete' href=''><i class="fa fa-times" aria-hidden="true"></i> delete</a></div>` : `<div class='col-md-1'><a id='reference_${type}_delete' href=''><i class="fa fa-times" aria-hidden="true"></i> delete</a></div>` }
                      ${ isNotEditable === true ? `<div id='${reference_link.id}' class='col-md-3 bottom-right-position'></div>` : `<div id='${reference_link.id}' class='col-md-3 bottom-right-position'><a id='cms_reference_${type}_edit' href="${ reference_link.absolute_url }"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</a></div>` }
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
      e.preventDefaua = new FormData($(e.currentTarget)[0])
      let formData = new FormData()
      $.each($("input[type=file]")[0].files, (idx, file) => {
        formData.append('reference_link['+idx+']', file);
      })
      formData.append('language', $('#CMS_reference_link_upload_form').find('select')[0].value)
      formData.append('document_language', $("#CMS_reference_link_upload_form [name='reference_link[document_language]']").val())
      formData.append('places', $("#CMS_reference_link_upload_form [name='reference_link[places]']").val())
      $('#CMS_reference_link_upload_form button').prop('disabled', true)
      toggleProgressSpinner()
      $.ajax({
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        url: '/cms/reference_links/',
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
        url: '/cms/reference_mp3s/',
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
        url: '/cms/reference_pptxes/',
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
      }, 1000, 'later');
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
          ${getReferenceDocumentLanguageInput(type, null)}
          <button class="ui button" type="submit">Submit</button>
        </form>
        `)
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
    $('#CMS_index_content').on('click', '#cms_reference_link_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/reference_links/' + e.currentTarget.parentElement.id
      }).done(response => {
        $('#CMS_modal').modal('show')
        let type = 'link'
        $('#CMS_modal #CMS_modal_header').append(`<h3>Reference ${type} - (.pdf) - Edit</h3>`)
        let content = getReferenceEditForm({ reference_type: type,
                                             reference: response.reference_link,
                                             all_other_reference_links: response.reference_links,
                                             tags: response.tags,
                                             languages: response.languages,
                                             places: response.places })
        $('#CMS_modal #CMS_modal_content').append(content)
        toggleProgressSpinner()
      })
      return false
    })
    $('#CMS_index_content').on('click', '#cms_reference_mp3_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      // insert ajax to reference show
      // $('#CMS_modal').modal('show')
      // let type = 'mp3'
      // $('#CMS_modal #CMS_modal_header').append(`<h3>Reference ${type} - (.${type}) - Edit</h3>`)
      // let content = getReferenceEditForm({ reference_type: type,
      //                                      reference: response.reference_mp3,
      //                                      all_other_reference_links: response.reference_links,
      //                                      tags: response.tags,
      //                                      languages: response.languages,
      //                                      places: response.places })
      // $('#CMS_modal #CMS_modal_content').append(content)
      toggleProgressSpinner()
      return false
    })
    $('#CMS_index_content').on('click', '#cms_reference_pptx_edit', e => {
      e.preventDefault()
      toggleProgressSpinner()
      // insert ajax to reference show
      // $('#CMS_modal').modal('show')
      // let type = 'pptx'
      // $('#CMS_modal #CMS_modal_header').append(`<h3>Reference ${type} - (.${type}) - Edit</h3>`)
      // let content = getReferenceEditForm({ reference_type: type,
      //                                      reference: response.reference_pptx,
      //                                      all_other_reference_links: response.reference_links,
      //                                      tags: response.tags,
      //                                      languages: response.languages,
      //                                      places: response.places })
      // $('#CMS_modal #CMS_modal_content').append(content)
      // $('#CMS_index_content').append(content)
      toggleProgressSpinner()
      return false
    })
    function getReferenceEditForm(args){
      return `<div id='${ args['reference'].id }'>
                <form id="CMS_reference_${ args['reference_type'] }_edit" class="ui form">
                  <div class="field">
                    <label>
                      <h4>
                        <a id='' href="${ args['reference'].absolute_url }" target='_blank'>
                          <i class="fa fa-search" aria-hidden="true"></i> <strong><u>Preview .pdf</u></strong>
                        </a><br>
                        <u>File name:</u> ${ _.isEmpty(args['reference'].document_file_name) ? 'No file name' : args['reference'].document_file_name }
                        <br>
                        <u>Title:</u>
                        <input type="text" placeholder="No title" name="reference_${ args['reference_type'] }[title]" value="${ (_.isNull(args['reference'].title) || args['reference'].title === '' || args['reference'].title === 'No title given') ? '' : args['reference'].title }" style='margin-bottom:5px' required>
                        <u>Video URL:</u>
                        <input type="text" placeholder="enter url for video" name="reference_${ args['reference_type'] }[video_url]" value="${ (_.isNull(args['reference'].video_url) || args['reference'].video_url === '' || args['reference'].video_url === 'No video url given') ? '' : args['reference'].video_url }" style='margin-bottom:5px' required>
                      </h4>
                    </label>
                    <label>Description:</label>
                    <textarea name="reference_${ args['reference_type'] }[description]" placeholder="descriptive text" required>${(_.isNull(args['reference'].description) || args['reference'].description === '' || args['reference'].description === 'Description coming soon') ? '' : args['reference'].description }</textarea>
                    ${ getReferenceDocumentLanguageInput(args['reference_type'], args['reference'].document_language) }
                    <label>Languages:</label>
                    ${ getSelectorWithoutPreview({ object_type: 'languages', selected_objects: args['reference']['languages'], objects: args['languages'] }) }
                    <label>Places:</label>
                    ${ getSelectorWithoutPreview({ object_type: 'places', selected_objects: args['reference']['places'], objects: args['places'] }) }
                    <label>Tags:</label>
                    ${ getSelectorWithoutPreview({ object_type: 'tags', selected_objects: args['reference']['tags'], objects: args['tags'] }) }
                    ${ args['reference_type'] === 'link' ? getReferenceLinkSelector({ all_other_reference_links: args['all_other_reference_links'], related_topics: args['reference']['related_topics'], reference_link_id: args['reference'].id, selector_header_label: 'Related reference links:', object_type: 'related_topics' }) : '' }
                  </div>
                  <button class="ui button" type="submit">Submit</button>
                </form>
              </div>`
    }
    function getSelectorWithoutPreview(args){
      return (`
        <div id='${args['object_type']}_checkboxes' class="field">
            <ul class='list-unstyled'>
            ${_.map(args['objects'], object => {
                let checked = !_.isEmpty(_.filter(args['selected_objects'], (selected_object) => { return selected_object.id === object.id })) ? "checked" : ""
                return `<li>
                          <input id=${object.id} ${checked} type='checkbox' name="reference_link[${args['object_type']}][]" value="${object.id}">
                          <label id='cms_reference_${args['object_type']}_label' class='filter-label' for=${ object.id }>${object.title}</label>
                        </li>`
            }).join('\n')}
            </ul>
        </div>
        `)
    }
    function getReferenceDocumentLanguageInput(type, reference_link_document_language){
      return `<label>Document Language:</label>
              <input type="text" placeholder="Example: EN FR" name="reference_${type}[document_language]" value="${(_.isNull(reference_link_document_language) || reference_link_document_language === '' || reference_link_document_language === 'No title given') ? '' : reference_link_document_language}" style='margin-bottom:5px' required>`
    }
    function getReferencePlacesInput(type, reference_link_places){
      return `<label>Places(seperate each with a space):</label>
              <input type="text" placeholder="Example: Nigeria Afghanistan Pakistan" name="reference_${type}[places]" value="${(_.isNull(reference_link_places) || reference_link_places === '' || reference_link_places === 'No title given') ? '' : reference_link_places}" style='margin-bottom:5px'>`
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
        $('#cms_reference_link_grid #'+response.id+'.reference_link_item').find('#cms_reference_link_document_language_div').text(response.document_language)
        $('#cms_reference_link_grid #'+response.id+'.reference_link_item').find('#cms_reference_link_places_div').text(_.map(response.places, place => { return place.title }).join(' '))
        $('#cms_reference_link_grid #'+response.id+'.reference_link_item').find('#cms_reference_link_languages_div').text(_.map(response.languages, language => { return language.title }).join(' '))
        $('#cms_reference_link_grid #'+response.id+'.reference_link_item').find('#cms_reference_link_tags_div').text(_.map(response.tags, tag => { return tag.title}).join(' '))
        $('#cms_reference_link_grid #'+response.id+'.reference_link_item').find('#cms_reference_link_video_url_div').text(`${_.isEmpty(response.video_url) ? '' : response.video_url}`)
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
        $('#cms_reference_mp3_grid #'+response.id+'.reference_mp3_item').find('#cms_reference_mp3_document_language_div').text(response.document_language)
        $('#cms_reference_mp3_grid #'+response.id+'.reference_mp3_item').find('#cms_reference_mp3_places_div').text(response.places)
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
        $('#cms_reference_pptx_grid #'+response.id+'.reference_pptx_item').find('#cms_reference_pptx_document_language_div').text(response.document_language)
        $('#cms_reference_pptx_grid #'+response.id+'.reference_pptx_item').find('#cms_reference_pptx_places_div').text(response.places)
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
        url: '/cms/c4d_articles/'
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
        url: '/cms/embedded_images/',
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
    function getReferenceLinkSelector(args) {
      return (`
        <div id='reference_link_checkboxes' class="field">
          <label>${args['selector_header_label']}</label>
            <ul class='${ args['object_type'] === 'featured_links' ? 'featured_ul_select' : '' } list-unstyled'>
            ${_.map(args['all_other_reference_links'], reference_link => {
              if (reference_link.id !== args['current_reference_link_id']){
                let checked = !_.isEmpty(_.filter(args['related_topics'], (selected_reference) => { return selected_reference.id === reference_link.id })) ? "checked" : ""
                return `<li><input id=${ reference_link.id } ${ checked } type='checkbox' name="reference_link[${ args['object_type'] }][]" value="${ reference_link.id }">
                          <label id='cms_reference_link_label' class='filter-label' for=${ reference_link.id }>${ reference_link.document_file_name } -  <a href="${ reference_link.absolute_url }" target='_blank'><i class="fa fa-search" aria-hidden="true"></i></a></label>
                        </li>`
              } else {
                return ''
              }
            }).join('\n')}
            </ul>
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
    $('#CMS_featured_reference_links').click(e => {
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: '/cms/featured_references/'
      }).done(response => {
        $('#CMS_index_content').empty()
        $('#CMS_index_content').append("<h2 id='cms_reference_links_list_header'>Selected Featured Reference Links - (.pdf's) Index</h2>")
        $('#CMS_index_content').append(getReferenceLinkGrid(response.reference_links, response.reference_link_categories, null, 'link', response.categories, true, true, 'featured'))
        loadIsotopeHandlers('link')
      })
      return false
    })
    $('#CMS_index_content').on('click', '#reference_link_featured_delete', e => {
      e.preventDefault()
      $.ajax({
        method: 'DELETE',
        url: '/cms/featured_references/' + e.currentTarget.parentElement.parentElement.id
      }).done(response => {
        $('#CMS_featured_reference_links').trigger('click')
      })
      return false
    })
    $('#CMS_featured_reference_links_select').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/reference_links/utilized'
      }).done(response => {
        let reference_links = response.reference_links
        $.ajax({
          method: 'GET',
          url: '/cms/featured_references/'
        }).done(response => {
          toggleProgressSpinner()
          let type = 'link'
          $('#CMS_index_content').empty()
          let content = getFeaturedReferenceSelectorForm(reference_links, response.reference_links)
          $('#CMS_index_content').append("<h2 id='cms_reference_links_list_header'>Select Reference Links To Feature</h2>")
          $('#CMS_index_content').append(content)
        })
      })
      return false
    })
    function getFeaturedReferenceSelectorForm(reference_links, related_reference_links){
      return `<form id="CMS_reference_link_feature_select_form" class="ui form">
                <div class="field">
                  ${getReferenceLinkSelector({ reference_links: reference_links, related_topics: null, reference_link_id: null, selector_header_label: 'Reference Link List', object_type: 'featured_links' })}
                </div>
                <button class="ui button" type="submit">Submit</button>
              </form>`
    }
    $('#CMS_index_content').on('submit', '#CMS_reference_link_feature_select_form', e => {
      e.preventDefault()
      $.ajax({
        method: 'POST',
        url: '/cms/featured_references/',
        data: $(e.currentTarget).serialize()
      }).done(response => {
        $('#CMS_featured_reference_links').trigger('click')
      })
      return false
    })
  }
})
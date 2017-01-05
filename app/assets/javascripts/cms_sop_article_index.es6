$(() => {
  if ($('#CMS_index_content').css('visibility') === 'visible') {
    $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
      action: 'hide',
      transition: 'drop'
    })

    $('select.dropdown').dropdown({
        action: 'hide'
    })

    $('#CMS_sop_articles_link').click(e => {
      toggleProgressSpinner()
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: 'cms/sop_articles/'
      }).done(response => {
        let sop_articles = response.sop_articles
        let sop_time_periods = response.sop_time_periods
        let sop_categories = response.sop_categories
        $.ajax({
          method: 'GET',
          url: 'cms/users/'
        }).done(response => {
          toggleProgressSpinner()
          $('#CMS_index_content').empty()
          $('#CMS_index_content').append("<h2 id='cms_sop_article_list_header'>SOP Article Index</h2>")
          // appendSopArticleTableHeader()
          appendSopArticleRows(sop_articles, response.users, sop_time_periods, sop_categories)
          loadIsotopeHandlers()
        })
      })
    })

    let updatedSortFlow = false
    let createdSortFlow = false
    let alphaSortFlow = false
    function loadIsotopeHandlers(){
      $('#CMS_index_content #cms_sop_articles_filter_dropdown').dropdown({
        on: 'hover',
        action: 'nothing',
        transition: 'horizontal flip'
      })

      $(`#CMS_index_content #CMS_sop_articles_grid`).isotope({
        itemSelector: `.cms_sop_article_row`,
        layoutMode: 'fitRows',
        getSortData: {
          updatedSort: function (ele) {
            return Date.parse($(ele).find('#updated_at_div').text()) * (updatedSortFlow ? -1 : 1)
          },
          createdSort: function (ele) {
            return (Date.parse($(ele).find('#created_at_div').text())) * (createdSortFlow ? -1 : 1)
          },
          alphaSort: '#cms_sop_article_title',
          orderIdSort: function (ele) {
            return parseInt($(ele).find('#cms_sop_article_order_id_div').text())
          }
        }
      })

      $('#CMS_index_content').on('click', '#title_div', e => {
        e.preventDefault()
        $('#CMS_sop_articles_grid').isotope({
          sortAscending: alphaSortFlow
        })
        $('#CMS_sop_articles_grid').isotope({ sortBy: 'alphaSort' })
        alphaSortFlow = !alphaSortFlow
      })

      $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter')
        // use filter function if value matches
        $(`#CMS_index_content #CMS_sop_articles_grid`).isotope({ filter: filterValue })
      })

      $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup )
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked')
          $( this ).addClass('is-checked')
        })
      })
    }

    $('#CMS_index_content').on('submit', '#cms_sop_articles_search_form', e => {
      e.preventDefault()
      var filterFunc =  function() {
        let search_value = $('#cms_sop_articles_search_form input').val()
        let title = $(this).find('#cms_sop_article_title a').text();
        let regex_search_value = new RegExp(search_value, 'i')
        let found_title = title.match(regex_search_value)
        return found_title
      }
      $('#CMS_sop_articles_grid').isotope({ filter: filterFunc })
      return false
    })

    function toggleProgressSpinner(){
      if ($('#progress_spinner').css('visibility') === 'hidden')
        $('#progress_spinner').css('visibility', 'visible')
      else
        $('#progress_spinner').css('visibility', 'hidden')
    }

    $('#CMS_index_content').on('click', '#CMS_sop_toggle_published', e => {
      let id = e.currentTarget.parentElement.id
      toggleProgressSpinner()
      $.ajax({
        method: 'PATCH',
        url: 'cms/sop_articles/publish/' + id,
        data: { authenticity_token: _.escape($('meta[name=csrf-token]').attr('content')) }
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_sop_articles_link').trigger('click')
        $('.ui.dimmer').dimmer('show')
        _.delay(() => {
          $('.ui.dimmer').dimmer('hide')
        }, 1000, 'later');
        history.pushState({}, null, 'cms');
      })
    })

    function getPublishToggleDropdown(id){
      return (
        `<div id="cms_user_edit_dropdown" class="ui compact menu">
          <div id="CMS_actions_dropdown" class="ui simple dropdown item">
            Actions &nbsp;
            <i class="fa fa-caret-down" aria-hidden="true"></i>
            <div class="menu left">
              <div id="${id}" class="item">
                <span id="CMS_sop_toggle_published">Toggle published</span>
              </div>
            </div>
          </div>
        </div>`
        )
    }

    function appendSopArticleTableHeader(){
      $('#CMS_index_content').append('<table id="CMS_sop_articles_table" class="ui celled table"></table>')
      $('#CMS_sop_articles_table').append('<thead><tr><th class="text-center"> Order id </th><th class="text-center"> Time Period </th><th class="text-center"> Category </th><th class="text-center"> Title </th><th class="text-center"> Status </th><th class="text-center"> Updated </th><th class="text-center"> Created </th><th class="text-center"> Author </th><th class="text-center"></th></tr></thead>')
    }

    function appendSopArticleRows(sop_articles, users, sop_time_periods, sop_categories){
      let idx = 0
      let last_idx = sop_articles.length - 1
      let content = `<div id='cms_sop_articles_filter_dropdown' class="ui pointing dropdown col-md-3">
                      <div class='text'><i class="fa fa-filter fa-2x" aria-hidden="true"></i><strong>Hover to select a filter</strong></div>
                      <div id="" class="menu">
                        <div class='item'>
                          <div id='cms_sop_articles_filter_menu' class="button-group filter-button-group col-md-12">
                            <div class='col-md-6'>
                              <div class='col-md-12'>Filter by:</div>
                              <button data-filter="*" class='button is-checked'>show all</button>
                            </div>
                            <div class='col-md-9'>
                              <div class='col-md-12'>Filter by SOP Time Periods:</div>
                              <div class='col-md-6'>
                                ${_.map(sop_time_periods, time => {
                                    return `<button data-filter=".${time.period.replace(new RegExp(' ', 'g'), '_')}" class='button'>${time.period}</button>`
                                }).join('')}
                              </div>
                            </div>
                            <div class='col-md-9'>
                              <div class='col-md-12'>Filter by SOP Categories:</div>
                              <div class='col-md-6'>
                              ${_.map(sop_categories, category => {
                                  return `<button data-filter=".${category.title.replace(new RegExp(' ', 'g'), '_')}" class='button'>${category.title}</button>`
                              }).join('')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class='col-md-offset-2 col-md-7'>
                      <form id='cms_sop_articles_search_form'>
                        <label>Search SOP articles by title:</label>
                        <input class="sop_articles_input" type="text" name="cms_sop_articles_search" value="">
                        <button type="submit">search</button>
                      </form>
                    </div>
                    <div id='cms_sop_articles_index_header' class='col-md-12 cms_div_borders'>
                      <div class="col-md-1 text-center"> Order id </div>
                      <div class="col-md-1 text-center"> Time Period </div>
                      <div class="col-md-2 text-center"> Category </div>
                      <div class="col-md-3 text-center"><a id='title_div' href=''> Title </a></div>
                      <div class="col-md-1 text-center"> Status </div>
                      <div class="col-md-1 text-center"><a id='updated_at_div' href=''> Updated </a></div>
                      <div class="col-md-1 text-center"><a id='created_at_div' href=''> Created </a></div>
                      <div class="col-md-1 text-center"> Author </div>
                      <div class="col-md-1 text-center"> Actions </div>
                    </div>
                    <div id='CMS_sop_articles_grid' class='col-md-12'>`
      let rows = ''
      _.forEach(sop_articles, article => {
        rows += `<div id="${article.id}" class="${idx === 0 ? 'sop_first_article' : ''}${ idx === last_idx ? 'sop_last_article' : ''} col-md-12 cms_sop_article_row ${sop_categories[article.sop_category_id-1].title.replace(new RegExp(' ', 'g'), '_')} ${sop_time_periods[article.sop_time_id-1].period.replace(new RegExp(' ', 'g'), '_')}">
                  <div class='col-md-1 cms_div_borders'>
                    <div class='col-md-12'>
                      <a id='sop_order_id_up' href=''><i class="fa fa-sort-asc fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div id='cms_sop_article_order_id_div' class='col-md-12'>
                      ${article.order_id}
                    </div>
                    <div class='col-md-12'>
                      <a id='sop_order_id_down' href=''><i class="fa fa-sort-desc fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
                  <div class='col-md-1 cms_div_borders'>${ sop_time_periods[article.sop_time_id-1].period }</div>
                  <div class='col-md-2 cms_div_borders'>${ sop_categories[article.sop_category_id-1].title }</div>
                  <div class='col-md-3 cms_div_borders'>
                    <div id='cms_sop_article_title'>
                      <a id="${article.id}" href="" class='bold_underline'>${article.title}</a>
                    </div>
                  </div>
                  <div class='col-md-1 cms_div_borders'>
                    ${formatPublished(article.published)}
                  </div>
                  <div id='updated_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(article.updated_at)}
                  </div>
                  <div id='created_at_div' class='col-md-1 cms_div_borders'>
                    ${new Date(article.created_at)}
                  </div>
                  <div class='col-md-1 cms_div_borders'>
                    ${users[article.author_id].first_name + ' ' + users[article.author_id].last_name}
                  </div>
                  <div class='col-md-1 cms_div_borders'>
                    ${getPublishToggleDropdown(article.id)}
                  </div>
                </div>`
        idx += 1
      })
      content = content + rows
      content += `</div>`
      $('#CMS_index_content').append(content)
    }

    $('#CMS_index_content').on('click', '#updated_at_div', e => {
      e.preventDefault()
      $('#CMS_sop_articles_grid').isotope({
        sortAscending: updatedSortFlow
      })
      $('#CMS_sop_articles_grid').isotope({ sortBy: 'updatedSort' })
      updatedSortFlow = !updatedSortFlow
    })

    $('#CMS_index_content').on('click', '#created_at_div', e => {
      e.preventDefault()
      $('#CMS_sop_articles_grid').isotope({
        sortAscending: createdSortFlow
      })
      $('#CMS_sop_articles_grid').isotope({ sortBy: 'createdSort' })
      createdSortFlow = !createdSortFlow
    })

    $('#CMS_index_content').on('click', '#sop_order_id_up', e => {
      e.preventDefault()
      let id = e.currentTarget.parentElement.parentElement.parentElement.id
      let current_row = $('#CMS_index_content').find('#'+id+'.cms_sop_article_row')
      let visible_elements = $('#CMS_sop_articles_grid').isotope('getFilteredItemElements')
      let idx_of_current_row = -1
      _.find(visible_elements, el => { idx_of_current_row+=1; return $(el).attr('id') === id })
      let prev_row = idx_of_current_row > 0 ? $(visible_elements[idx_of_current_row - 1]) : null
      if (!(current_row.hasClass('sop_first_article')) && !_.isNull(prev_row)) {
        toggleProgressSpinner()
        document.getElementById('CMS_index_content').style.pointerEvents = 'none'
        let prev_id = $(prev_row).attr('id')
        $.ajax({
          method: 'PATCH',
          url: 'cms/sop_articles/orderUp/' + id + '?prev_id=' + prev_id
        }).done(response => {
          if (response.status === 200){
            current_row.find('#cms_sop_article_order_id_div').text(response.current_sop_article_order_id)
            prev_row.find('#cms_sop_article_order_id_div').text(response.prev_sop_article_order_id)
            if (prev_row.hasClass('sop_first_article')) {
              prev_row.removeClass('sop_first_article')
              current_row.addClass('sop_first_article')
            }
            else if (current_row.hasClass('sop_last_article')) {
              prev_row.addClass('sop_last_article')
              current_row.removeClass('sop_last_article')
            }
          }
        })
        _.delay(() => {
          $('#CMS_sop_articles_grid').isotope('reloadItems').isotope({ sortBy: 'orderIdSort' })
          toggleProgressSpinner()
          document.getElementById('CMS_index_content').style.pointerEvents = 'auto'
        }, 100, 'later');
      }
      return false
    })

    $('#CMS_index_content').on('click', '#sop_order_id_down', e => {
      e.preventDefault()
      let id = e.currentTarget.parentElement.parentElement.parentElement.id
      let current_row = $('#CMS_index_content').find('#'+id+'.cms_sop_article_row')
      let visible_elements = $('#CMS_sop_articles_grid').isotope('getFilteredItemElements')
      let idx_of_current_row = -1
      _.find(visible_elements, el => { idx_of_current_row += 1; return $(el).attr('id') === id })
      let next_row = idx_of_current_row !== visible_elements.length - 1 ? $(visible_elements[idx_of_current_row + 1]) : null
      if (!(current_row.hasClass('sop_last_article')) && !_.isNull(next_row)) {
        toggleProgressSpinner()
        document.getElementById('CMS_index_content').style.pointerEvents = 'none'
        let next_id = $(next_row).attr('id')
        $.ajax({
          method: 'PATCH',
          url: 'cms/sop_articles/orderDown/' + id + '?next_id=' + next_id
        }).done(response => {
          if (response.status === 200){
            current_row.find('#cms_sop_article_order_id_div').text(response.current_sop_article_order_id)
            next_row.find('#cms_sop_article_order_id_div').text(response.next_sop_article_order_id)
            if (next_row.hasClass('sop_last_article')) {
              next_row.removeClass('sop_last_article')
              current_row.addClass('sop_last_article')
            }
            else if (current_row.hasClass('sop_first_article')) {
              next_row.addClass('sop_first_article')
              current_row.removeClass('sop_first_article')
            }
          }
        })
        _.delay(() => {
          $('#CMS_sop_articles_grid').isotope('reloadItems').isotope({ sortBy: 'orderIdSort' })
          toggleProgressSpinner()
          document.getElementById('CMS_index_content').style.pointerEvents = 'auto'
        }, 100, 'later');
      }
      return false
    })

    function formatPublished(published) {
      return published ? 'Published' : 'Not Published'
    }

    $('#CMS_index_content').on('click', '#cms_sop_article_title a', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: 'cms/reference_links'
      }).done(response => {
        let reference_links = response.reference_links
        $.ajax({
          method: 'GET',
          url: 'cms/sop_articles/' + e.currentTarget.id
        }).done(response => {
          toggleProgressSpinner()
          $('#CMS_modal').modal('show')
          // $('#CMS_index_content').empty()
          $('#CMS_modal #CMS_modal_header').append("<h2 id='cms_sop_article_list_header'>SOP Article Edit</h2>")
          let content = getCMSSopArticleContent(response.sop_article, response.sop_times, response.sop_categories, response.responsible_offices, response.support_affiliations, reference_links, response.selected_reference_links, response.selected_reference_mp3s, response.selected_reference_pptxes, response.reference_mp3s, response.reference_pptxes)
          // $('#CMS_index_content').append(content)
          $('#CMS_modal #CMS_modal_content').append(content)
          initializeCKEditor()
          $('#editor').val(response.sop_article.content)
        })
      })
    })

    function getCMSSopArticleContent(article, sop_times, sop_categories, responsible_offices, support_affiliations, reference_links, selected_reference_links, selected_reference_mp3s, selected_reference_pptxes, reference_mp3s, reference_pptxes) {
      return (`
      <div id="${article.id}" class="CMS_sop_article_form_div">
        <span><strong>Order ID: ${article.order_id}</strong></span>
        &nbsp;
        <form id="CMS_sop_article_form" class="ui form">
          ${getSopTimeDropdown("Time", "sop_time_id", sop_times, article.sop_time_id)}
          ${getDropdown("Category", "sop_category_id", sop_categories, article.sop_category_id, true)}
          <div class="field">
            <label>Title</label>
            <input type="text" name="article[title]" placeholder="Title" value="${article.title}" required>
          </div>
          <div class="field">
            <label>Responsible</label>
            <input type="text" name="article[responsible]" placeholder="" value="${article.responsible}">
          </div>
          <div class="field">
            <label>Support</label>
            <input type="text" name="article[support]" placeholder="" value="${article.support}">
          </div>
          ${getDropdown("Responsible", "responsible_office_id", responsible_offices, article.responsible_office_id, true)}
          ${getDropdown("Support", "support_affiliation_id", support_affiliations, article.support_affiliation_id, false)}
          <div class="field">
            <label>Content</label>
            <textarea name="article[content]" id="editor" required></textarea>
          </div>
          <div class="field">
            <label>Video URL</label>
            <input type="text" name="article[video_url]" value="${article.video_url}">
          </div>
          ${getReferenceLinkSelector(reference_links, selected_reference_links)}
          ${getReferenceLinksList(selected_reference_links, article.reference_link_order)}
          ${getReferenceMp3Selector(reference_mp3s, selected_reference_mp3s)}
          ${getReferenceMp3sList(selected_reference_mp3s, article.reference_mp3_order)}
          ${getReferencePptxSelector(reference_pptxes, selected_reference_pptxes)}
          ${getReferencePptxesList(selected_reference_pptxes, article.reference_pptx_order)}
          <button class="ui button" type="submit">Submit</button>
        </form>
      </div>
      `)
    }
    function getReferenceLinksList(selected_reference_links, reference_link_order) {
      let idx = 0
      let last_idx = selected_reference_links.length - 1
      let rows = ''
      _.isNull(reference_link_order) ?  reference_link_order = _.map(selected_reference_links, link => { return link.id }) : reference_link_order = reference_link_order.split(' ')
      _.forEach(reference_link_order, id => {
        _.forEach(selected_reference_links, reference_link =>{
          if (reference_link.id === parseInt(id)) {
            rows += `<div id='${reference_link.id}' class='col-md-12 reference_link_row ${idx === 0 ? 'first_reference_link' : ''} ${ idx === last_idx ? 'last_reference_link' : '' }'>
                    <div id='${reference_link.id}' class='col-md-1' style='width:5%;'>
                      <div id='sop_article_reference_id_up_div' class='col-md-6'><a id='sop_article_reference_id_up' href=''><i class="fa fa-sort-asc" aria-hidden="true"></i></a></div>
                      <div id='sop_article_reference_id_down_div' class='col-md-6'><a id='sop_article_reference_id_down' href=''><i class="fa fa-sort-desc" aria-hidden="true"></i></a></div>
                    </div>
                    <div id='${reference_link.id}' class='col-md-11'>
                      <strong>Reference Link: </strong>${reference_link.document_file_name} - <a href="${reference_link.absolute_url}" target="_blank">${reference_link.absolute_url}</a>
                    </div>
                  </div>`
          }
        })
        idx += 1
      })
      let content = `<div id='cms_sop_article_reference_link_list' class='col-md-12'>
                      Attached reference link ordering:
                      ${rows}
                     </div>`
      return content
    }
    function getReferenceMp3sList(selected_reference_mp3s, reference_mp3_order) {
      let idx = 0
      let last_idx = selected_reference_mp3s.length - 1
      let rows = ''
      _.isNull(reference_mp3_order) ?  reference_mp3_order = _.map(selected_reference_mp3s, link => { return link.id }) : reference_mp3_order = reference_mp3_order.split(' ')
      _.forEach(reference_mp3_order, id => {
        _.forEach(selected_reference_mp3s, reference_mp3 =>{
          if (reference_mp3.id === parseInt(id)) {
            rows += `<div id='${reference_mp3.id}' class='col-md-12 reference_mp3_row ${idx === 0 ? 'first_reference_mp3' : ''} ${ idx === last_idx ? 'last_reference_mp3' : '' }'>
                    <div id='${reference_mp3.id}' class='col-md-1' style='width:5%;'>
                      <div id='sop_article_reference_mp3_id_up_div' class='col-md-6'><a id='sop_article_reference_mp3_id_up' href=''><i class="fa fa-sort-asc" aria-hidden="true"></i></a></div>
                      <div id='sop_article_reference_mp3_id_down_div' class='col-md-6'><a id='sop_article_reference_mp3_id_down' href=''><i class="fa fa-sort-desc" aria-hidden="true"></i></a></div>
                    </div>
                    <div id='${reference_mp3.id}' class='col-md-11'>
                      <strong>Reference Mp3: </strong>${reference_mp3.clip_file_name} - <a href="${reference_mp3.absolute_url}" target="_blank">${reference_mp3.absolute_url}</a>
                    </div>
                  </div>`
          }
        })
        idx += 1
      })
      let content = `<div id='cms_sop_article_reference_mp3_list' class='col-md-12'>
                      Attached reference mp3 ordering:
                      ${rows}
                     </div>`
      return content
    }
    $('#CMS_index_content').on('click', '#sop_article_reference_pptx_id_up_div', e => {
      e.preventDefault()
      return false
    })
    $('#CMS_index_content').on('click', '#sop_article_reference_pptx_id_down_div', e => {
      e.preventDefault()
      return false
    })
    $('#CMS_index_content').on('click', '#sop_article_reference_mp3_id_up_div', e => {
      e.preventDefault()
      return false
    })
    $('#CMS_index_content').on('click', '#sop_article_reference_mp3_id_down_div', e => {
      e.preventDefault()
      return false
    })
    function getReferencePptxesList(selected_reference_pptxes, reference_pptx_order) {
      let idx = 0
      let last_idx = selected_reference_pptxes.length - 1
      let rows = ''
      _.isNull(reference_pptx_order) ?  reference_pptx_order = _.map(selected_reference_pptxes, link => { return link.id }) : reference_pptx_order = reference_pptx_order.split(' ')
      _.forEach(reference_pptx_order, id => {
        _.forEach(selected_reference_pptxes, reference_pptx =>{
          if (reference_pptx.id === parseInt(id)) {
            rows += `<div id='${reference_pptx.id}' class='col-md-12 reference_pptx_row ${idx === 0 ? 'first_reference_pptx' : ''} ${ idx === last_idx ? 'last_reference_pptx' : '' }'>
                    <div id='${reference_pptx.id}' class='col-md-1' style='width:5%;'>
                      <div id='sop_article_reference_pptx_id_up_div' class='col-md-6'><a id='sop_article_reference_pptx_id_up' href=''><i class="fa fa-sort-asc" aria-hidden="true"></i></a></div>
                      <div id='sop_article_reference_pptx_id_down_div' class='col-md-6'><a id='sop_article_reference_pptx_id_down' href=''><i class="fa fa-sort-desc" aria-hidden="true"></i></a></div>
                    </div>
                    <div id='${reference_pptx.id}' class='col-md-11'>
                      <strong>Reference Powerpoint: </strong>${reference_pptx.document_file_name} - <a href="${reference_pptx.absolute_url}" target="_blank">${reference_pptx.absolute_url}</a>
                    </div>
                  </div>`
          }
        })
        idx += 1
      })
      let content = `<div id='cms_sop_article_reference_pptx_list' class='col-md-12'>
                      Attached reference pptx ordering:
                      ${rows}
                     </div>`
      return content
    }
    $('#CMS_index_content').on('click', '#sop_article_reference_id_up', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_index_content #cms_sop_article_reference_link_list').find('.reference_link_row#'+id)
      if (!(current_row.hasClass('first_reference_link'))) {
        let prev_row = current_row.prev()
        if (current_row.hasClass('last_reference_link') && prev_row.hasClass('first_reference_link') ){
          prev_row.addClass('last_reference_link')
          current_row.removeClass('last_reference_link')
        }
        if (prev_row.hasClass('first_reference_link')) {
          prev_row.removeClass('first_reference_link')
          current_row.addClass('first_reference_link')
        } else if (current_row.hasClass('last_reference_link')) {
          prev_row.addClass('last_reference_link')
          current_row.removeClass('last_reference_link')
        }
        $(current_row).after(prev_row)
      }
      return false
    })
    $('#CMS_index_content').on('click', '#sop_article_reference_id_down', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_index_content #cms_sop_article_reference_link_list').find('.reference_link_row#'+id)
      if (!(current_row.hasClass('last_reference_link'))) {
        let next_row = current_row.next()
        if (current_row.hasClass('first_reference_link') && next_row.hasClass('last_reference_link') ){
          next_row.addClass('first_reference_link')
          current_row.removeClass('first_reference_link')
        }
        if (next_row.hasClass('last_reference_link')) {
          next_row.removeClass('last_reference_link')
          current_row.addClass('last_reference_link')
        }
        else if (current_row.hasClass('first_reference_link')) {
          next_row.addClass('first_reference_link')
          current_row.removeClass('first_reference_link')
        }
        $(next_row).after(current_row)
      }
      return false
    })
    $('#CMS_index_content').on('click', '#sop_article_reference_pptx_id_up', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_index_content #cms_sop_article_reference_pptx_list').find('.reference_pptx_row#'+id)
      let prev_row = current_row.prev()
      if (!(current_row.hasClass('first_reference_pptx'))) {
        if (current_row.hasClass('last_reference_pptx') && prev_row.hasClass('first_reference_pptx') ){
          prev_row.addClass('last_reference_pptx')
          current_row.removeClass('last_reference_pptx')
        }
        if (prev_row.hasClass('first_reference_pptx')) {
          prev_row.removeClass('first_reference_pptx')
          current_row.addClass('first_reference_pptx')
        } else if (current_row.hasClass('last_reference_pptx')) {
          prev_row.addClass('last_reference_pptx')
          current_row.removeClass('last_reference_pptx')
        }
        $(current_row).after(prev_row)
      }
      return false
    })
    $('#CMS_index_content').on('click', '#sop_article_reference_pptx_id_down', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_index_content #cms_sop_article_reference_pptx_list').find('.reference_pptx_row#'+id)
      if (!(current_row.hasClass('last_reference_pptx'))) {
        let next_row = current_row.next()
        if (current_row.hasClass('first_reference_pptx') && next_row.hasClass('last_reference_pptx') ){
          next_row.addClass('first_reference_pptx')
          current_row.removeClass('first_reference_pptx')
        }
        if (next_row.hasClass('last_reference_pptx')) {
          next_row.removeClass('last_reference_pptx')
          current_row.addClass('last_reference_pptx')
        }
        else if (current_row.hasClass('first_reference_pptx')) {
          next_row.addClass('first_reference_pptx')
          current_row.removeClass('first_reference_pptx')
        }
        $(next_row).after(current_row)
      }
      return false
    })

    $('#CMS_index_content').on('click', '#sop_article_reference_mp3_id_up', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_index_content #cms_sop_article_reference_mp3_list').find('.reference_mp3_row#'+id)
      let prev_row = current_row.prev()
      if (!(current_row.hasClass('first_reference_mp3'))) {
        if (current_row.hasClass('last_reference_mp3') && prev_row.hasClass('first_reference_mp3') ){
          prev_row.addClass('last_reference_mp3')
          current_row.removeClass('last_reference_mp3')
        }
        if (prev_row.hasClass('first_reference_mp3')) {
          prev_row.removeClass('first_reference_mp3')
          current_row.addClass('first_reference_mp3')
        } else if (current_row.hasClass('last_reference_mp3')) {
          prev_row.addClass('last_reference_mp3')
          current_row.removeClass('last_reference_mp3')
        }
        $(current_row).after(prev_row)
      }
      return false
    })
    $('#CMS_index_content').on('click', '#sop_article_reference_mp3_id_down', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_index_content #cms_sop_article_reference_mp3_list').find('.reference_mp3_row#'+id)
      if (!(current_row.hasClass('last_reference_mp3'))) {
        let next_row = current_row.next()
        if (current_row.hasClass('first_reference_mp3') && next_row.hasClass('last_reference_mp3') ){
          next_row.addClass('first_reference_mp3')
          current_row.removeClass('first_reference_mp3')
        }
        if (next_row.hasClass('last_reference_mp3')) {
          next_row.removeClass('last_reference_mp3')
          current_row.addClass('last_reference_mp3')
        }
        else if (current_row.hasClass('first_reference_mp3')) {
          next_row.addClass('first_reference_mp3')
          current_row.removeClass('first_reference_mp3')
        }
        $(next_row).after(current_row)
      }
      return false
    })

    function getReferenceLinkSelector(reference_links, selected_reference_links) {
      return (`
        <div id='reference_link_checkboxes' class="field">
          <label>Available reference links:</label>
            <ul class='list-unstyled'>
            ${_.map(reference_links, reference_link => {
              let checked = !_.isEmpty(_.filter(selected_reference_links, (selected_reference) => { return selected_reference.id === reference_link.id })) ? "checked" : ""
              return `<li><input id=${reference_link.id} ${checked} type='checkbox' name="article[reference_links][]" value="${reference_link.id}">
                      <label id='cms_reference_link_label' class='filter-label' for=${reference_link.id}>${reference_link.document_file_name} -  <a href="${ reference_link.absolute_url }" target='_blank'><i class="fa fa-search" aria-hidden="true"></i></a></label></li>`
            }).join('\n')}
            </ul>
        </div>
        `)
    }
    function getReferenceMp3Selector(reference_mp3s, selected_reference_mp3s) {
      return (`
        <div id='reference_link_checkboxes' class="field">
          <label>Available reference mp3s:</label>
            <ul class='list-unstyled'>
            ${_.map(reference_mp3s, reference_link => {
              let checked = !_.isEmpty(_.filter(selected_reference_mp3s, (selected_reference) => { return selected_reference.id === reference_link.id })) ? "checked" : ""
              return `<li><input id=${reference_link.id} ${checked} type='checkbox' name="article[reference_mp3s][]" value="${reference_link.id}">
                      <label id='cms_reference_link_label' class='filter-label' for=${reference_link.id}>${reference_link.clip_file_name} -  <a href="${ reference_link.absolute_url }" target='_blank'><i class="fa fa-search" aria-hidden="true"></i></a></label></li>`
            }).join('\n')}
            </ul>
        </div>
        `)
    }
    function getReferencePptxSelector(reference_pptxes, selected_reference_pptxes) {
      return (`
        <div id='reference_link_checkboxes' class="field">
          <label>Available reference powerpoints:</label>
            <ul class='list-unstyled'>
            ${_.map(reference_pptxes, reference_link => {
              let checked = !_.isEmpty(_.filter(selected_reference_pptxes, (selected_reference) => { return selected_reference.id === reference_link.id })) ? "checked" : ""
              return `<li><input id=${reference_link.id} ${checked} type='checkbox' name="article[reference_pptxes][]" value="${reference_link.id}">
                      <label id='cms_reference_link_label' class='filter-label' for=${reference_link.id}>${reference_link.document_file_name} -  <a href="${ reference_link.absolute_url }" target='_blank'><i class="fa fa-search" aria-hidden="true"></i></a></label></li>`
            }).join('\n')}
            </ul>
        </div>
        `)
    }

    function getSopTimeDropdown(label, option_name, sop_times, article_sop_time_id){
      return (`
        <div class="field">
          <label>${label}</label>
          <select name="article[${option_name}]" class="ui dropdown cms_dropdown_select" required>
            <option value="">Select Time Period</option>
            ${_.map(sop_times, time => {
              let selected = time.id === article_sop_time_id ? 'selected' : ''
              return `<option ${selected} value="${time.id}">${time.period}</option>`
            }).join('\n')}
          </select>
        </div>
        `)
    }

    $('#CMS_modal').on('submit', '#CMS_sop_article_form', e => {
      toggleProgressSpinner()
      e.preventDefault()
      let reference_link_order = getSOPArticleReferenceLinkOrder()
      let reference_mp3_order = getSOPArticleReferenceMp3Order()
      let reference_pptx_order = getSOPArticleReferencePptxOrder()
      $.ajax({
        method: 'PATCH',
        url: 'cms/sop_articles/' + e.currentTarget.parentElement.id,
        data: $('#CMS_sop_article_form').serialize() + reference_link_order + reference_mp3_order + reference_pptx_order
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_modal').modal('hide')
        history.pushState(null, null, 'cms');
      })
      return false
    })

    function getSOPArticleReferenceLinkOrder(){
      // "4&reference_link_order%5B%5D=6&reference_link_order%5B%5D=4"
      let children = $('#CMS_modal #cms_sop_article_reference_link_list').children()
      return _.isEmpty(children) ? '&reference_link_order%5B%5D=' : _.map(children, div => {
                return `&reference_link_order%5B%5D=${$(div).attr('id')}`
             }).join('')
    }
    function getSOPArticleReferenceMp3Order(){
      // "4&reference_link_order%5B%5D=6&reference_link_order%5B%5D=4"
      let children = $('#CMS_index_content #cms_sop_article_reference_mp3_list').children()
      return _.isEmpty(children) ? '&reference_mp3_order%5B%5D=' : _.map(children, div => {
                return `&reference_mp3_order%5B%5D=${$(div).attr('id')}`
             }).join('')
    }
    function getSOPArticleReferencePptxOrder(){
      // "4&reference_link_order%5B%5D=6&reference_link_order%5B%5D=4"
      let children = $('#CMS_index_content #cms_sop_article_reference_pptx_list').children()
      return _.isEmpty(children) ? '&reference_pptx_order%5B%5D=' : _.map(children, div => {
                return `&reference_pptx_order%5B%5D=${$(div).attr('id')}`
             }).join('')
    }

    function getDropdown(label, option_name, objects, id, is_required){
      return (`
        <div class="field">
          <label>${label}</label>
          <select name="article[${option_name}]" class="ui dropdown cms_dropdown_select" ${is_required ? 'required' : ''}>
            <option value="">Select Office</option>
            ${_.map(objects, object => {
              let selected = object.id === id ? 'selected' : ''
              return `<option ${selected} value="${object.id}">${object.title}</option>`
            }).join('\n')}
          </select>
        </div>
        `)
    }

    if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
      CKEDITOR.tools.enableHtml5Elements( document );

    // The trick to keep the editor in the sample quite small
    // unless user specified own height.
    CKEDITOR.config.height = 150;
    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.extraAllowedContent = 'iframe[*]';
    let initializeCKEditor = (function() {
      let wysiwygareaAvailable = isWysiwygareaAvailable(),
        isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );
      return function() {
        let editorElement = CKEDITOR.document.getById( 'editor' );

        // :(((
        // if ( isBBCodeBuiltIn ) {
        //   editorElement.setHtml(
        //     'Hello world!\n\n' +
        //     'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
        //   );
        // }
        // Depending on the wysiwygare plugin availability initialize classic or inline editor.
        if ( wysiwygareaAvailable ) {
          CKEDITOR.replace( 'editor' );
        } else {
          editorElement.setAttribute( 'contenteditable', 'true' );
          CKEDITOR.inline( 'editor' );

          // TODO we can consider displaying some info box that
          // without wysiwygarea the classic editor may not work.
        }
      };

      function isWysiwygareaAvailable() {
        // If in development mode, then the wysiwygarea must be available.
        // Split REV into two strings so builder does not replace it :D.
        if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
          return true;
        }

        return !!CKEDITOR.plugins.get( 'wysiwygarea' );
      }
    })()
  }
})
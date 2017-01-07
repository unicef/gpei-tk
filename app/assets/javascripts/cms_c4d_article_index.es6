$(() => {
  if ($('#CMS_index_content').css('visibility') === 'visible') {
    $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
      action: 'hide',
      transition: 'drop'
    })

    $('select.dropdown')
      .dropdown({
        action: 'hide'
      });

    $('#CMS_c4d_articles_link').click(e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/c4d_articles/'
      }).done(response => {
        let c4d_articles = response.c4d_articles
        let c4d_subcategories = response.c4d_subcategories
        let c4d_categories = response.c4d_categories
        $.ajax({
          method: 'GET',
          url: '/cms/users/'
        }).done(response => {
          toggleProgressSpinner()
          $('#CMS_index_content').empty()
          $('#CMS_index_content').append("<h2 id='cms_c4d_article_list_header'>C4D Article Index</h2>")
          // appendC4dArticleTableHeader()
          appendC4dArticleRows(c4d_articles, response.users, c4d_subcategories, c4d_categories)
          loadIsotopeHandlers()
        })
      })
    })

    let updatedSortFlow = false
    let createdSortFlow = false
    let alphaSortFlow = false
    function loadIsotopeHandlers(){
      $('#CMS_index_content #cms_c4d_articles_filter_dropdown').dropdown({
        on: 'hover',
        action: 'nothing',
        transition: 'horizontal flip'
      })
      $(`#CMS_index_content #CMS_c4d_articles_grid`).isotope({
        itemSelector: `.cms_c4d_article_row`,
        layoutMode: 'fitRows',
        getSortData: {
          updatedSort: function (ele) {
            return Date.parse($(ele).find('#updated_at_div').text()) * (updatedSortFlow ? -1 : 1)
          },
          createdSort: function (ele) {
            return (Date.parse($(ele).find('#created_at_div').text())) * (createdSortFlow ? -1 : 1)
          },
          alphaSort: '#cms_c4d_article_title',
          orderIdSort: function (ele) {
            return parseInt($(ele).find('#cms_c4d_article_order_id_div').text())
          }
        }
      })

      $('#CMS_index_content').on('click', '#title_div', e => {
        e.preventDefault()
        $('#CMS_c4d_articles_grid').isotope({
          sortAscending: alphaSortFlow
        })
        $('#CMS_c4d_articles_grid').isotope({ sortBy: 'alphaSort' })
        alphaSortFlow = !alphaSortFlow
      })

      $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter')
        // use filter function if value matches
        $(`#CMS_index_content #CMS_c4d_articles_grid`).isotope({ filter: filterValue })
      })

      $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup )
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked')
          $( this ).addClass('is-checked')
        })
      })
    }

    function toggleProgressSpinner(){
      if ($('#progress_spinner').css('visibility') === 'hidden')
        $('#progress_spinner').css('visibility', 'visible')
      else
        $('#progress_spinner').css('visibility', 'hidden')
    }

    function appendC4dArticleTableHeader(){
      $('#CMS_index_content').append('<table id="CMS_c4d_articles_table" class="ui celled table"></table>')
      $('#CMS_c4d_articles_grid').append('<thead><tr><th class="text-center"> Order id </th><th class="text-center"> Category </th><th class="text-center"> Subcategory </th><th class="text-center"> Title </th><th class="text-center"> Status </th><th class="text-center"> Updated </th><th class="text-center"> Created </th><th class="text-center"> Author </th><th class="text-center"></th></tr></thead>')
    }

    function formatPublished(published) {
      return published ? 'Published' : 'Not Published'
    }

    function appendC4dArticleRows(c4d_articles, users, c4d_subcategories, c4d_categories){
      let idx = 0
      let last_idx = c4d_articles.length - 1
      let content = `<div id='cms_c4d_articles_filter_dropdown' class="ui pointing dropdown col-md-3">
                  <div class='text'><i class="fa fa-filter fa-2x" aria-hidden="true"></i><strong>Hover to select a filter</strong></div>
                  <div id="" class="menu">
                    <div class='item'>
                      <div id='cms_c4d_articles_filter_menu' class="button-group filter-button-group col-md-12">
                        <div class='col-md-6'>
                          <div class='col-md-12'>Filter by:</div>
                          <button data-filter="*" class='button is-checked'>show all</button>
                        </div>
                        <div class='col-md-9'>
                          <div class='col-md-12'>Filter by C4D categories:</div>
                          <div class='col-md-6'>
                            ${_.map(c4d_categories, category => {
                                return `<button data-filter=".${category.title.replace(new RegExp(' ', 'g'), '_')}" class='button'>${category.title}</button>`
                            }).join('')}
                          </div>
                        </div>
                        <div class='col-md-9'>
                          <div class='col-md-12'>Filter by C4d subcategories:</div>
                          <div class='col-md-4'>
                          ${_.map(c4d_subcategories, category => {
                              return `<button data-filter=".${category.title.replace(new RegExp(' ', 'g'), '_')}" class='button'>${category.title}</button>`
                          }).join('')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col-md-offset-2 col-md-7'>
                  <form id='cms_c4d_articles_search_form'>
                    <label>Search C4D articles by title:</label>
                    <input class="c4d_articles_input" type="text" name="cms_c4d_articles_search" value="">
                    <button type="submit">search</button>
                  </form>
                </div>
                <div id='cms_c4d_articles_index_header' class='col-md-12 cms_div_borders'>
                  <div class="col-md-1 text-center"> Order id </div>
                  <div class="col-md-1 text-center"> Category </div>
                  <div class="col-md-2 text-center"> Subcategory </div>
                  <div class="col-md-3 text-center"><a id='title_div' href=''> Title </a></div>
                  <div class="col-md-1 text-center"> Status </div>
                  <div class="col-md-1 text-center"><a id='updated_at_div' href=''> Updated </a></div>
                  <div class="col-md-1 text-center"><a id='created_at_div' href=''> Created </a></div>
                  <div class="col-md-1 text-center"> Author </div>
                  <div class="col-md-1 text-center"> Actions </div>
                </div>
                <div id='CMS_c4d_articles_grid' class='col-md-12'>`
      let rows = ``
      _.forEach(c4d_articles, article => {
        rows += `<div id="${ article.id }" class="${idx === 0 ? 'c4d_first_article' : ''}${ idx === last_idx ? 'c4d_last_article' : ''} cms_c4d_article_row col-md-12 ${c4d_categories[article.c4d_category_id-1].title.replace(new RegExp(' ', 'g'), '_')} ${c4d_subcategories[article.c4d_subcategory_id-1].title.replace(new RegExp(' ', 'g'), '_')}">
                    <div class='col-md-1 text-center cms_div_borders'>
                      <div class='col-md-12'>
                        <a id='c4d_order_id_up' href=''><i class="fa fa-sort-asc fa-2x" aria-hidden="true"></i></a>
                      </div>
                      <div id='cms_c4d_article_order_id_div'>${ article.order_id }</div>
                      <div class='col-md-12'>
                        <a id='c4d_order_id_down' href=''><i class="fa fa-sort-desc fa-2x" aria-hidden="true"></i></a>
                      </div>
                    </div>
                    <div class='col-md-1 text-center cms_div_borders'>${ c4d_categories[article.c4d_category_id-1].title }</div>
                    <div class='col-md-2 text-center cms_div_borders'>${ c4d_subcategories[article.c4d_subcategory_id-1].title }</div>
                    <div class='col-md-3 text-center cms_div_borders'><div id='cms_c4d_article_title'><a id="${ article.id }" href="" class='bold_underline'>${ article.title }</a></div></div>
                    <div class='col-md-1 text-center cms_div_borders'>${ formatPublished(article.published) }</div>
                    <div class='col-md-1 text-center cms_div_borders'>${ new Date(article.updated_at) }</div>
                    <div class='col-md-1 text-center cms_div_borders'>${ new Date(article.created_at) }</div>
                    <div class='col-md-1 text-center cms_div_borders'>${ users[article.author_id].first_name + ' ' + users[article.author_id].last_name }</div>
                    <div class='col-md-1 text-center cms_div_borders'>${ getUserActionDropdown(article.id) }</div>
                  </div>`
        idx += 1
      })
      content += rows
      content += '</div>'
      $('#CMS_index_content').append(content)
    }

    $('#CMS_index_content').on('submit', '#cms_c4d_articles_search_form', e => {
      e.preventDefault()
      var filterFunc =  function() {
        let search_value = $('#cms_c4d_articles_search_form input').val()
        let title = $(this).find('#cms_c4d_article_title a').text();
        let regex_search_value = new RegExp(search_value, 'i')
        let found_title = title.match(regex_search_value)
        return found_title
      }
      $('#CMS_c4d_articles_grid').isotope({ filter: filterFunc })
      return false
    })

    $('#CMS_index_content').on('click', '#updated_at_div', e => {
      e.preventDefault()
      $('#CMS_c4d_articles_grid').isotope({
        sortAscending: updatedSortFlow
      })
      $('#CMS_c4d_articles_grid').isotope({ sortBy: 'updatedSort' })
      updatedSortFlow = !updatedSortFlow
    })

    $('#CMS_index_content').on('click', '#created_at_div', e => {
      e.preventDefault()
      $('#CMS_c4d_articles_grid').isotope({
        sortAscending: createdSortFlow
      })
      $('#CMS_c4d_articles_grid').isotope({ sortBy: 'createdSort' })
      createdSortFlow = !createdSortFlow
    })

    $('#CMS_index_content').on('click', '#c4d_order_id_up', e => {
      e.preventDefault()
      let id = e.currentTarget.parentElement.parentElement.parentElement.id
      let current_row = $('#CMS_index_content').find('#'+id+'.cms_c4d_article_row')
      let visible_elements = $('#CMS_c4d_articles_grid').isotope('getFilteredItemElements')
      let idx_of_current_row = -1
      _.find(visible_elements, el => { idx_of_current_row+=1; return $(el).attr('id') === id })
      let prev_row = idx_of_current_row > 0 ? $(visible_elements[idx_of_current_row - 1]) : null
      if (!(current_row.hasClass('c4d_first_article')) && !_.isNull(prev_row)) {
        toggleProgressSpinner()
        document.getElementById('CMS_index_content').style.pointerEvents = 'none'
        let prev_id = $(prev_row).attr('id')
        $.ajax({
          method: 'PATCH',
          url: '/cms/c4d_articles/orderUp/' + id + '?prev_id=' + prev_id
        }).done(response => {
          if (response.status === 200){
            current_row.find('#cms_c4d_article_order_id_div').text(response.current_c4d_article_order_id)
            prev_row.find('#cms_c4d_article_order_id_div').text(response.prev_c4d_article_order_id)
            if (prev_row.hasClass('c4d_first_article')) {
              prev_row.removeClass('c4d_first_article')
              current_row.addClass('c4d_first_article')
            }
            else if (current_row.hasClass('c4d_last_article')) {
              prev_row.addClass('c4d_last_article')
              current_row.removeClass('c4d_last_article')
            }
          }
        })
        _.delay(() => {
          $('#CMS_c4d_articles_grid').isotope('reloadItems').isotope({ sortBy: 'orderIdSort' })
          toggleProgressSpinner()
          document.getElementById('CMS_index_content').style.pointerEvents = 'auto'
        }, 100, 'later');
      }
      return false
    })
    $('#CMS_index_content').on('click', '#c4d_order_id_down', e => {
      e.preventDefault()
      let id = e.currentTarget.parentElement.parentElement.parentElement.id
      let current_row = $('#CMS_index_content').find('#'+id+'.cms_c4d_article_row')
      let visible_elements = $('#CMS_c4d_articles_grid').isotope('getFilteredItemElements')
      let idx_of_current_row = -1
      _.find(visible_elements, el => { idx_of_current_row += 1; return $(el).attr('id') === id })
      let next_row = idx_of_current_row !== visible_elements.length - 1 ? $(visible_elements[idx_of_current_row + 1]) : null
      if (!(current_row.hasClass('c4d_last_article')) && !_.isNull(next_row)) {
        toggleProgressSpinner()
        document.getElementById('CMS_index_content').style.pointerEvents = 'none'
        let next_id = $(next_row).attr('id')
        $.ajax({
          method: 'PATCH',
          url: '/cms/c4d_articles/orderDown/' + id + '?next_id=' + next_id
        }).done(response => {
          if (response.status === 200){
            current_row.find('#cms_c4d_article_order_id_div').text(response.current_c4d_article_order_id)
            next_row.find('#cms_c4d_article_order_id_div').text(response.next_c4d_article_order_id)
            if (next_row.hasClass('c4d_last_article')) {
              next_row.removeClass('c4d_last_article')
              current_row.addClass('c4d_last_article')
            }
            else if (current_row.hasClass('c4d_first_article')) {
              next_row.addClass('c4d_first_article')
              current_row.removeClass('c4d_first_article')
            }
          }
        })
        _.delay(() => {
          $('#CMS_c4d_articles_grid').isotope('reloadItems').isotope({ sortBy: 'orderIdSort' })
          toggleProgressSpinner()
          document.getElementById('CMS_index_content').style.pointerEvents = 'auto'
        }, 100, 'later');
      }
      return false
    })
    $('#CMS_index_content').on('click', '#CMS_c4d_articles_grid #cms_c4d_article_title', e => {
      e.preventDefault()
      toggleProgressSpinner()
      $.ajax({
        method: 'GET',
        url: '/cms/reference_links/'
      }).done(response => {
        let reference_links = response.reference_links
        $.ajax({
          method: 'GET',
          url: '/cms/c4d_articles/' + e.currentTarget.children[0].id
        }).done(response => {
          toggleProgressSpinner()
          $('#CMS_modal').modal('show')
          $('#CMS_modal #CMS_modal_header').append("<h2 id='cms_c4d_article_list_header'>C4D Article Edit</h2>")
          // $('#CMS_index_content').empty()
          // $('#CMS_index_content').append()
          let content = getCMSC4dArticleContent(response.c4d_article,
                                                response.c4d_subcategories,
                                                response.c4d_categories,
                                                response.embedded_images,
                                                response.selected_reference_links,
                                                reference_links)
          $('#CMS_modal #CMS_modal_content').append(content)
          // $('#CMS_index_content').append(content)
          initializeCKEditor()
          $('#editor').val(response.c4d_article.content)
        })
      })
    })

    function getCMSC4dArticleContent(article, c4d_subcategories, c4d_categories, embedded_images, selected_reference_links, reference_links) {
      return (`
      <div id="${article.id}" class="CMS_c4d_article_form_div">
        <span><strong>Order ID: ${article.order_id}</strong></span>
        &nbsp;
        <form id="CMS_c4d_article_form" class="ui form">
          ${getDropdown("Category", "c4d_category_id", c4d_categories, article.c4d_category_id)}
          ${getDropdown("Subcategory", "c4d_subcategory_id", c4d_subcategories, article.c4d_subcategory_id)}
          <div class="field">
            <label>Title</label>
            <input type="text" name="article[title]" placeholder="Title" value="${article.title}" required>
          </div>
          <div class="field">
            <label>Content</label>
            <textarea name="article[content]" id="editor" required></textarea>
          </div>
          <div id="field">
            ${getEmbeddedImagesList(embedded_images)}
          </div>
          ${ getReferenceLinkSelector(reference_links, selected_reference_links) }
          ${ getReferenceLinksList(selected_reference_links, article.reference_link_order) }
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
                      <div id='c4d_article_reference_id_up_div' class='col-md-6'><a id='c4d_article_reference_id_up' href=''><i class="fa fa-sort-asc" aria-hidden="true"></i></a></div>
                      <div id='c4d_article_reference_id_down_div' class='col-md-6'><a id='c4d_article_reference_id_down' href=''><i class="fa fa-sort-desc" aria-hidden="true"></i></a></div>
                    </div>
                    <div id='${reference_link.id}' class='col-md-11'>
                      <strong>Reference Link: </strong>${reference_link.document_file_name} - <a href="${reference_link.absolute_url}" target="_blank">${reference_link.absolute_url}</a>
                    </div>
                  </div>`
          }
        })
        idx += 1
      })
      let content = `<div id='cms_c4d_article_reference_link_list' class='col-md-12'>
                      ${rows}
                     </div>`
      return content
    }
    $('#CMS_modal').on('click', '#c4d_article_reference_id_up', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_modal #cms_c4d_article_reference_link_list').find('.reference_link_row#'+id)
      if (!(current_row.hasClass('first_reference_link'))) {
        let prev_row = current_row.prev()
        if (current_row.hasClass('last_reference_link') && prev_row.hasClass('first_reference_link') ){
          prev_row.addClass('last_reference_link')
          current_row.removeClass('last_reference_link')
        }
        if (prev_row.hasClass('first_reference_link')) {
          prev_row.removeClass('first_reference_link')
          current_row.addClass('first_reference_link')
        }
        else if (current_row.hasClass('last_reference_link')) {
          prev_row.addClass('last_reference_link')
          current_row.removeClass('last_reference_link')
        }
        $(current_row).after(prev_row)
      }
      return false
    })

    $('#CMS_modal').on('click', '#c4d_article_reference_id_down', e => {
      e.preventDefault()
      let parent = e.currentTarget.parentElement.parentElement.parentElement
      let id = parent.id
      let current_row = $('#CMS_modal #cms_c4d_article_reference_link_list').find('.reference_link_row#'+id)
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

    function getEmbeddedImagesList(embedded_images){
      return `${_.map(embedded_images, embedded_image => {
                return (`<p><strong>Attached Image: </strong>${embedded_image.image_file_name} - <a href="${embedded_image.absolute_url}" target="_blank">${embedded_image.absolute_url}</a></p>`)
              }).join('\n')}`
    }
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

    $('#CMS_index_content').on('click', '#CMS_c4d_toggle_published', e => {
      let id = e.currentTarget.parentElement.id
      toggleProgressSpinner()
      $.ajax({
        method: 'PATCH',
        url: '/cms/c4d_articles/publish/' + id,
        data: { authenticity_token: _.escape($('meta[name=csrf-token]').attr('content')) }
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_c4d_articles_link').trigger('click')
        $('.ui.dimmer').dimmer('show')
        _.delay(() => {
          $('.ui.dimmer').dimmer('hide')
        }, 1000, 'later');
        history.pushState({}, null, 'cms');
      })
    })

    function getUserActionDropdown(id){
      return (
        `<div id="cms_user_edit_dropdown" class="ui compact menu">
          <div id="CMS_actions_dropdown" class="ui simple dropdown item">
            Actions &nbsp;
            <i class="fa fa-caret-down" aria-hidden="true"></i>
            <div class="menu">
              <div id="${id}" class="item">
                <span id="CMS_c4d_toggle_published">Toggle published</span>
              </div>
            </div>
          </div>
        </div>`
        )
    }

    function getDropdown(label, option_name, categories, id){
      return (`
        <div class="field">
          <label>${label}</label>
          <select name="article[${option_name}]" class="ui dropdown cms_dropdown_select" required>
            <option value="">Select ${label}</option>
            ${_.map(categories, category => {
              let selected = category.id === id ? 'selected' : ''
              return `<option ${selected} value="${category.id}">${category.title}</option>`
            }).join('\n')}
          </select>
        </div>
        `)
    }

    $('#CMS_modal').on('submit', '#CMS_c4d_article_form', e => {
      toggleProgressSpinner()
      e.preventDefault()
      let reference_link_order = getC4dArticleReferenceLinkOrder()
      $.ajax({
        method: 'PATCH',
        url: '/cms/c4d_articles/' + e.currentTarget.parentElement.id,
        data: $('#CMS_c4d_article_form').serialize() + reference_link_order
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_modal').modal('hide')
        history.pushState(null, null, 'cms');
      })
      return false
    })

    function getC4dArticleReferenceLinkOrder(){
      // "4&reference_link_order%5B%5D=6&reference_link_order%5B%5D=4"
      let children = $('#CMS_modal #cms_c4d_article_reference_link_list').children()
      return _.isEmpty(children) ? '&reference_link_order%5B%5D=' : _.map(children, div => {
                return `&reference_link_order%5B%5D=${$(div).attr('id')}`
             }).join('')
    }

    if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
      CKEDITOR.tools.enableHtml5Elements( document );

    // The trick to keep the editor in the sample quite small
    // unless user specified own height.
    CKEDITOR.config.height = 300;
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
$(() => {
  $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
    action: 'hide',
    transition: 'drop'
  })

  $('select.dropdown')
    .dropdown({
      action: 'hide'
    });

  $('#CMS_c4d_articles_link').click(e => {
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'cms/c4d_articles/'
    }).done(response => {
      let c4d_articles = response.c4d_articles
      $.ajax({
        method: 'GET',
        url: 'cms/users/'
      }).done(response => {
        $('#CMS_index_content').empty()
        appendC4dArticleTableHeader()
        appendC4dArticleRows(c4d_articles, response.users)
      })
    })
  })

  function appendC4dArticleTableHeader(){
    $('#CMS_index_content').append('<table id="CMS_c4d_articles_table" class="ui celled table"></table>')
    $('#CMS_c4d_articles_table').append('<thead><tr><th class="text-center"> ID </th><th class="text-center"> Title </th><th class="text-center"> Status </th><th class="text-center"> Updated </th><th class="text-center"> Created </th><th class="text-center"> Author </th><th class="text-center"></th></tr></thead>')
  }

  function formatPublished(published) {
    return published ? 'Published' : 'Not Published'
  }

  function appendC4dArticleRows(c4d_articles, users){
    _.forEach(c4d_articles, article => {
      let row = '<tr id="' + article.id + '">' + '<td>' + article.order_id + '</td>' + '<td><a id="' + article.id + '" href="">' + article.title + '</td>' + '<td>' + formatPublished(article.published) + '</td>' + '<td>' + moment(article.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + moment(article.created_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + users[article.author_id].first_name + ' ' + users[article.author_id].last_name + '</td>' + '<td>' + getUserActionDropdown(article.id) + '</td>' + '</tr>'
      $('#CMS_c4d_articles_table').append(row)
    })
  }

  $('#CMS_index_content').on('click', '#CMS_c4d_articles_table a', e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: 'cms/reference_links/'
    }).done(response => {
      let reference_links = response.reference_links
      $.ajax({
        method: 'GET',
        url: 'cms/c4d_articles/' + e.currentTarget.id
      }).done(response => {
        $('#CMS_index_content').empty()
        let content = getCMSC4dArticleContent(response.c4d_article,
                                              response.c4d_subcategories,
                                              response.c4d_categories,
                                              response.embedded_images,
                                              response.selected_reference_links,
                                              reference_links)
        $('#CMS_index_content').append(content)
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
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="article[cms_title]" placeholder="${article.cms_title}" value="${article.cms_title}">
        </div>
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
        ${ getReferenceLinksList(selected_reference_links) }
        <button class="ui button" type="submit">Submit</button>
      </form>
    </div>
    `)
  }
  function getReferenceLinksList(selected_reference_links) {
    return `${_.map(selected_reference_links, reference_link => {
              return (`<p><strong>Reference Link: </strong>${reference_link.document_file_name} - <a href="${reference_link.url}" target="_blank">${reference_link.url}</a></p>`)
            }).join('\n')}`
  }
  function getEmbeddedImagesList(embedded_images){
    return `${_.map(embedded_images, embedded_image => {
              return (`<p><strong>Embedded Image: </strong>${embedded_image.image_file_name} - <a href="${embedded_image.url}" target="_blank">${embedded_image.url}</a></p>`)
            }).join('\n')}`
  }
  function getReferenceLinkSelector(reference_links, selected_reference_links) {
    return (`
      <div id='reference_link_multi_select' class="field">
        <label>Reference Links</label>
        <select name="article[reference_links][]" class="ui dropdown cms_dropdown_select" size=30 multiple>
          <option value="">Select Reference Links</option>
          ${_.map(reference_links, reference_link => {
            let selected = _.includes(selected_reference_links, reference_link.id) ? "selected=\"selected\"" : ""
            return `<option value="${reference_link.id}" ${selected}>${reference_link.document_file_name}</option>`
          }).join('\n')}
        </select>
      </div>
      `)
  }

  $('#CMS_index_content').on('click', '#CMS_c4d_toggle_published', e => {
    let id = e.currentTarget.parentElement.id
    $.ajax({
      method: 'PATCH',
      url: 'cms/c4d_articles/publish/' + id,
      data: { authenticity_token: _.escape($('meta[name=csrf-token]').attr('content')) }
    }).done(response => {
      $('#CMS_c4d_articles_link').trigger('click')
      $('.ui.dimmer').dimmer('show')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
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

  $('#CMS_index_content').on('submit', '#CMS_c4d_article_form', e => {
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: 'cms/c4d_articles/' + e.currentTarget.parentElement.id,
      data: $('#CMS_c4d_article_form').serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      $('#CMS_c4d_articles_link').trigger('click')
      $('.ui.dimmer').dimmer('show')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
    })
  })
  if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
    CKEDITOR.tools.enableHtml5Elements( document );

  // The trick to keep the editor in the sample quite small
  // unless user specified own height.
  CKEDITOR.config.height = 300;
  CKEDITOR.config.width = 'auto';

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
  })();
})
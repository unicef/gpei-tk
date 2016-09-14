$(() => {
  $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
    action: 'hide',
    transition: 'drop'
  })

  $('select.dropdown')
    .dropdown({
      action: 'hide'
    });

  $('#CMS_sop_articles_link').click(e => {
    toggleProgressSpinner()
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: 'cms/sop_articles/'
    }).done(response => {
      let sop_articles = response.sop_articles
      $.ajax({
        method: 'GET',
        url: 'cms/users/'
      }).done(response => {
        toggleProgressSpinner()
        $('#CMS_index_content').empty()
        appendSopArticleTableHeader()
        appendSopArticleRows(sop_articles, response.users)
      })
    })
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
      }, 3000, 'later');
      history.pushState({}, null, 'cms');
    })
  })
  function getPublishToggleDropdown(id){
    return (
      `<div id="cms_user_edit_dropdown" class="ui compact menu">
        <div id="CMS_actions_dropdown" class="ui simple dropdown item">
          Actions &nbsp;
          <i class="fa fa-caret-down" aria-hidden="true"></i>
          <div class="menu">
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
    $('#CMS_sop_articles_table').append('<thead><tr><th class="text-center"> ID </th><th class="text-center"> Title </th><th class="text-center"> Status </th><th class="text-center"> Updated </th><th class="text-center"> Created </th><th class="text-center"> Author </th><th class="text-center"></th></tr></thead>')
  }

  function appendSopArticleRows(sop_articles, users){
    _.forEach(sop_articles, article => {
      let row = '<tr id="' + article.id + '">' + '<td>' + article.order_id + '</td>' + '<td><a id="' + article.id + '" href="">' + article.title + '</td>' + '<td>' + formatPublished(article.published) + '</td>' + '<td>' + moment(article.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + moment(article.created_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + users[article.author_id].first_name + ' ' + users[article.author_id].last_name + '</td>' + '<td>' + getPublishToggleDropdown(article.id) + '</td>' + '</tr>'
      $('#CMS_sop_articles_table').append(row)
    })
  }

  function formatPublished(published) {
    return published ? 'Published' : 'Not Published'
  }

  $('#CMS_index_content').on('click', '#CMS_sop_articles_table a', e => {
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
        $('#CMS_index_content').empty()
        let content = getCMSSopArticleContent(response.sop_article, response.sop_times, response.sop_categories, response.responsible_offices, response.support_affiliations, reference_links, response.selected_reference_links)
        $('#CMS_index_content').append(content)
        initializeCKEditor()
        $('#editor').val(response.sop_article.content)
      })
    })
  })

  function getCMSSopArticleContent(article, sop_times, sop_categories, responsible_offices, support_affiliations, reference_links, selected_reference_links) {
    return (`
    <div id="${article.id}" class="CMS_sop_article_form_div">
      <span><strong>Order ID: ${article.order_id}</strong></span>
      &nbsp;
      <form id="CMS_sop_article_form" class="ui form">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="article[cms_title]" placeholder="${article.cms_title}" value="${article.cms_title}">
        </div>
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
        ${ getReferenceLinksList(selected_reference_links) }
        <button class="ui button" type="submit">Submit</button>
      </form>
    </div>
    `)
  }
  function getReferenceLinksList(selected_reference_links) {
    return `${_.map(selected_reference_links, reference_link => {
              return (`<p><strong>Reference Link: </strong>${reference_link.document_file_name} - <a href="${reference_link.absolute_url}" target="_blank">${reference_link.absolute_url}</a></p>`)
            }).join('\n')}`
  }

  function getReferenceLinkSelector(reference_links, selected_reference_links) {
    return (`
      <div id='reference_link_checkboxes' class="field">
        <label>Reference Links</label>
          <ul class='list-unstyled'>
          ${_.map(reference_links, reference_link => {
            let checked = !_.isEmpty(_.filter(selected_reference_links, (selected_reference) => { return selected_reference.id === reference_link.id })) ? "checked" : ""
            return `<li><input id=${reference_link.id} ${checked} type='checkbox' name="article[reference_links][]" value="${reference_link.id}">
                    <label id='cms_reference_link_label' class='filter-label' for=${reference_link.id}>${reference_link.document_file_name}</label></li>`
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

  $('#CMS_index_content').on('submit', '#CMS_sop_article_form', e => {
    toggleProgressSpinner()
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: 'cms/sop_articles/' + e.currentTarget.parentElement.id,
      data: $('#CMS_sop_article_form').serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      toggleProgressSpinner()
      $('#CMS_sop_articles_link').trigger('click')
      $('.ui.dimmer').dimmer('show')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
      history.pushState({}, null, 'cms');
    })
  })

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
  CKEDITOR.config.allowedContent = 'iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]';
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
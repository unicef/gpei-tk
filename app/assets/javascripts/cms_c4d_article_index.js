$(() => {
  $('#CMS_c4d_articles_link').click(e => {
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'cms/c4d_articles/'
    }).done(response => {
      $('#CMS_index_content').empty()
      appendC4dArticleTableHeader()
      appendC4dArticleRows(response.c4d_articles, response.users)
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
      let row = '<tr id="' + article.id + '">' + '<td>' + article.id + '</td>' + '<td><a id="' + article.id + '" href="">' + article.title + '</td>' + '<td>' + formatPublished(article.published) + '</td>' + '<td>' + moment(article.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + moment(article.created_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + users[article.author_id].first_name + ' ' + users[article.author_id].last_name + '</td>' + '<td>' + getUserActionDropdown(article.id) + '</td>' + '</tr>'
      $('#CMS_c4d_articles_table').append(row)
    })
  }

  $('#CMS_index_content').on('click', '#CMS_c4d_articles_table a', e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: 'cms/c4d_articles/' + e.currentTarget.id
    }).done(response => {
      $('#CMS_index_content').empty()
      let content = getCMSC4dArticleContent(response.c4d_article, response.c4d_subcategories, response.c4d_categories)
      $('#CMS_index_content').append(content)
      initSample()
      $('#editor').val(response.c4d_article.content)
    })
  })

  function getCMSC4dArticleContent(article, c4d_subcategories, c4d_categories) {
    return (`
    <div id="${article.id}" class="CMS_c4d_article_form_div">
      <form id="CMS_c4d_article_form" class="ui form">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="article[cms_title]" placeholder="${article.cms_title}" value="${article.cms_title}" required>
        </div>
        ${getDropdown("Subcategory", "c4d_subcategory_id", c4d_subcategories, article.c4d_subcategory_id)}
        ${getDropdown("Category", "c4d_category_id", c4d_categories, article.c4d_category_id)}
        <div class="field">
          <label>Title</label>
          <input type="text" name="article[title]" placeholder="Title" value="${article.title}" required>
        </div>
        <div class="field">
          <label>Content</label>
          <textarea name="article[content]" id="editor" required></textarea>
        </div>
        <div class="field">
          <label>Template Links</label>
          <input type="text" name="template_links" value="">
        </div>
        <div class="field">
          <label>Reference Links</label>
          <input type="text" name="reference_links" value="">
        </div>
        <button class="ui button" type="submit">Submit</button>
      </form>
    </div>
    `)
  }

  $('select.dropdown')
    .dropdown({
      action: 'hide'
    });

  function getUserActionDropdown(id){
    return (
      '<div class="ui buttons"><div id="CMS_actions_dropdown" class="ui button">Actions</div><div class="ui floating dropdown icon button"><i class="dropdown icon"></i><div class="menu"><div id="' + id + '" class="item"><span id="CMS_user_assign_role">Assign Roles</span></div><div id="' + id + '" class="item"><span id="CMS_user_delete_user">Delete User</span></div></div></div>'
    );
  }

  function getDropdown(label, option_name, categories, id){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="article[${option_name}]" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Category</option>
          ${_.map(categories, category => {
            selected = category.id == id ? 'selected' : ''
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
      data: $('#CMS_c4d_article_form').serialize() + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content'))
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
  CKEDITOR.config.height = 150;
  CKEDITOR.config.width = 'auto';

  var initSample = (function() {
    var wysiwygareaAvailable = isWysiwygareaAvailable(),
      isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );
    return function() {
      var editorElement = CKEDITOR.document.getById( 'editor' );

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
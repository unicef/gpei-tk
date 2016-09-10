$(() => {
  $('#CMS_create_c4d_article_link').click(e => {
    e.preventDefault()
    toggleProgressSpinner()
    let c4d_categories, c4d_subcategories
    $.ajax({
      method: 'GET',
      url: 'api/c4d_categories/'
    }).done(response => {
      c4d_categories = response.c4d_categories
      $.ajax({
        method: 'GET',
        url: 'api/c4d_subcategories/'
      }).done(response => {
        c4d_subcategories = response.c4d_subcategories
        $.ajax({
          method: 'GET',
          url: 'cms/reference_links/'
        }).done(response => {
          toggleProgressSpinner()
          let reference_links = response.reference_links
          $('#CMS_index_content').empty()
          let content = getEmptyC4dArticleForm(c4d_subcategories, c4d_categories, reference_links)
          $('#CMS_index_content').append(content)
          initializeCKEditor();
        })
      })
    })
  })

  function toggleProgressSpinner(){
    if ($('#progress_spinner').css('visibility') === 'hidden')
      $('#progress_spinner').css('visibility', 'visible')
    else
      $('#progress_spinner').css('visibility', 'hidden')
  }

  $('#CMS_index_content').on('submit', '#CMS_c4d_article_create_form', e => {
    toggleProgressSpinner()
    $.ajax({
      method: 'POST',
      url: 'cms/c4d_articles/',
      data: $('#CMS_c4d_article_create_form').serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      toggleProgressSpinner()
      $('#CMS_c4d_articles_link').trigger('click')
      $('.ui.dimmer').dimmer('show')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
      history.pushState({}, null, 'cms');
    })
  })

  function getEmptyC4dArticleForm(c4d_subcategories, c4d_categories, reference_links){
    return (`
      <form id="CMS_c4d_article_create_form" class="ui form CMS_c4d_article_form_div">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="article[cms_title]" placeholder="CMS Title" value="">
        </div>
        ${getDropdown("Category", "c4d_category_id", c4d_categories)}
        ${getDropdown("Subcategory", "c4d_subcategory_id", c4d_subcategories)}
        <div class="field">
          <label>Title</label>
          <input type="text" name="article[title]" placeholder="Title" value="" required>
        </div>
        <div class="field">
          <label>Content</label>
          <textarea name="article[content]" id="editor" required></textarea>
        </div>
        ${getReferenceLinkSelector(reference_links)}
        <button class="ui button" type="submit">Submit</button>
      </form>
    `)
  }

  function getReferenceLinkSelector(reference_links) {
    return (`
      <div id='reference_link_checkboxes' class="field">
        <label>Reference Links</label>
          <ul class='list-unstyled'>
          ${_.map(reference_links, reference_link => {
            return `<li><input id=${reference_link.id} type='checkbox' name="article[reference_links][]" value="${reference_link.id}">
                    <label id='cms_reference_link_label' class='filter-label' for=${reference_link.id}>${reference_link.document_file_name}</label></li>`
          }).join('\n')}
          </ul>
      </div>
      `)
  }


  function getDropdown(label, option_name, categories){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="article[${option_name}]" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Subcategory</option>
          ${_.map(categories, category => { return `<option value="${category.id}">${category.title}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }
  if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
    CKEDITOR.tools.enableHtml5Elements( document );

  // The trick to keep the editor in the sample quite small
  // unless user specified own height.
  CKEDITOR.config.height = 300;
  CKEDITOR.config.width = 'auto';

  var initializeCKEditor = (function() {
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
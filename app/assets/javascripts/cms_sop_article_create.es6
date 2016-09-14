$(() => {
  $('#CMS_create_sop_article_link').click(e => {
    e.preventDefault();
    let sop_categories, sop_times, responsible_offices
    toggleProgressSpinner()
    $.ajax({
      method: 'GET',
      url: 'api/sop_categories/'
    }).done(response => {
      let sop_categories = response.sop_categories
      $.ajax({
        method: 'GET',
        url: 'api/sop_times/'
      }).done(response => {
        let sop_times = response.sop_times
        $.ajax({
          method: 'GET',
          url: 'api/responsible_offices/'
        }).done(response => {
          let responsible_offices = response.responsible_offices
          $.ajax({
            method: 'GET',
            url: 'api/support_affiliations/'
          }).done(response => {
            let support_affiliations = response.support_affiliations
            $.ajax({
              method: 'GET',
              url: 'cms/reference_links'
            }).done(response => {
              toggleProgressSpinner()
              let reference_links = response.reference_links
              $('#CMS_index_content').empty()
              let content = getEmptySopArticleForm(sop_times, sop_categories, responsible_offices, support_affiliations, reference_links)
              $('#CMS_index_content').append(content)
              initializeCKEditor()
            })
          })
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

  $('#CMS_index_content').on('submit', '#CMS_sop_article_create_form', e => {
    toggleProgressSpinner()
    $.ajax({
      method: 'POST',
      url: 'cms/sop_articles/',
      data: $('#CMS_sop_article_create_form').serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
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

  function getEmptySopArticleForm(sop_times, sop_categories, responsible_offices, support_affiliations, reference_links){
    return (`
      <form id="CMS_sop_article_create_form" class="ui form CMS_sop_article_form_div">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="article[cms_title]" placeholder="CMS Title" value="">
        </div>
        ${getSopTimeDropdown("Time", "sop_time_id", sop_times)}
        ${getDropdown("Category", "sop_category_id", sop_categories)}
        <div class="field">
          <label>Title</label>
          <input type="text" name="article[title]" placeholder="Title" value="" required>
        </div>
        <div class="field">
          <label>Responsible</label>
          <input type="text" name="article[responsible]" placeholder="" value="">
        </div>
        <div class="field">
          <label>Support</label>
          <input type="text" name="article[support]" placeholder="" value="">
        </div>
        ${getDropdown("Responsible", "responsible_office_id", responsible_offices, true)}
        ${getDropdown("Support", "support_affiliation_id", support_affiliations, false)}
        <div class="field">
          <label>Content</label>
          <textarea name="article[content]" id="editor" required>
          </textarea>
        </div>
        <div class="field">
          <label>Video URL</label>
          <input type="text" name="article[video_url]" value="">
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

  function getSopTimeDropdown(label, option_name, sop_times, is_required){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="article[${option_name}]" class="ui dropdown cms_dropdown_select" ${is_required ? 'required' : ''}>
          <option value="">Select Time Period</option>
          ${_.map(sop_times, time => { return `<option value="${time.id}">${time.period}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }

  function getDropdown(label, option_name, responsible_offices, is_required){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="article[${option_name}]" class="ui dropdown cms_dropdown_select" ${is_required ? 'required' : ''}>
          <option value="">Select ${label}</option>
          ${_.map(responsible_offices, office => { return `<option value="${office.id}">${office.title}</option>` }).join('\n')}
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
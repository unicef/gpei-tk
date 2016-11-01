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
              let reference_links = response.reference_links
              $.ajax({
                method: 'GET',
                url: 'cms/reference_mp3s'
              }).done(response => {
                let reference_mp3s = response.reference_mp3s
                $.ajax({
                  method: 'GET',
                  url: 'cms/reference_pptxes'
                }).done(response => {
                  let reference_pptxes = response.reference_pptxes
                  toggleProgressSpinner()
                  $('#CMS_index_content').empty()
                  $('#CMS_index_content').append("<h2 id='cms_c4d_article_list_header'>SOP Article Create</h2>")
                  let content = getEmptySopArticleForm(sop_times, sop_categories, responsible_offices, support_affiliations, reference_links, reference_mp3s, reference_pptxes)
                  $('#CMS_index_content').append(content)
                  initializeCKEditor()
                })
              })
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
    let reference_link_order = getSOPArticleReferenceLinkOrder()
    let reference_mp3_order = getSOPArticleReferenceMp3Order()
    let reference_pptx_order = getSOPArticleReferencePptxOrder()
    $.ajax({
      method: 'POST',
      url: 'cms/sop_articles/',
      data: $('#CMS_sop_article_create_form').serialize() + reference_link_order + reference_mp3_order + reference_pptx_order + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      toggleProgressSpinner()
      $('#CMS_sop_articles_link').trigger('click')
      $('.ui.dimmer').dimmer('show')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
      history.pushState(null, null, 'cms')
    })
    return false
  })

  function getSOPArticleReferenceLinkOrder(){
    // "4&reference_link_order%5B%5D=6&reference_link_order%5B%5D=4"
    return _.isEmpty($('#CMS_index_content #cms_sop_article_reference_link_list').children()) ? '&reference_link_order%5B%5D=' : _.map($('#CMS_index_content #cms_sop_article_reference_link_list').children(), div => {
              return `&reference_link_order%5B%5D=${$(div).attr('id')}`
           }).join('')
  }
  function getSOPArticleReferenceMp3Order(){
    // "4&reference_link_order%5B%5D=6&reference_link_order%5B%5D=4"
    return _.isEmpty($('#CMS_index_content #cms_sop_article_reference_mp3_list').children()) ? '&reference_mp3_order%5B%5D=' : _.map($('#CMS_index_content #cms_sop_article_reference_mp3_list').children(), div => {
              return `&reference_mp3_order%5B%5D=${$(div).attr('id')}`
           }).join('')
  }
  function getSOPArticleReferencePptxOrder(){
    // "4&reference_link_order%5B%5D=6&reference_link_order%5B%5D=4"
    return _.isEmpty($('#CMS_index_content #cms_sop_article_reference_pptx_list').children()) ? '&reference_pptx_order%5B%5D=' : _.map($('#CMS_index_content #cms_sop_article_reference_pptx_list').children(), div => {
              return `&reference_pptx_order%5B%5D=${$(div).attr('id')}`
           }).join('')
  }

  function getEmptySopArticleForm(sop_times, sop_categories, responsible_offices, support_affiliations, reference_links, reference_mp3s, reference_pptxes){
    return (`
      <form id="CMS_sop_article_create_form" class="ui form CMS_sop_article_form_div">
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
        ${getReferenceMp3Selector(reference_mp3s)}
        ${getReferencePptxSelector(reference_pptxes)}
        <button class="ui button" type="submit">Submit</button>
      </form>
    `)
  }

  function getReferenceLinkSelector(reference_links) {
    return (`
      <div id='reference_link_checkboxes' class="field">
        <label>Available reference links:</label>
          <ul class='list-unstyled'>
          ${_.map(reference_links, reference_link => {
            return `<li><input id=${reference_link.id} type='checkbox' name="article[reference_links][]" value="${reference_link.id}">
                    <label id='cms_reference_link_label' class='filter-label' for=${reference_link.id}>${reference_link.document_file_name}</label></li>`
          }).join('\n')}
          </ul>
      </div>
      `)
  }

  function getReferenceMp3Selector(reference_mp3s) {
    return (`
      <div id='reference_link_checkboxes' class="field">
        <label>Available reference links:</label>
          <ul class='list-unstyled'>
          ${_.map(reference_mp3s, reference_mp3 => {
            return `<li><input id=${reference_mp3.id} type='checkbox' name="article[reference_mp3s][]" value="${reference_mp3.id}">
                    <label id='cms_reference_mp3_label' class='filter-label' for=${reference_mp3.id}>${reference_mp3.clip_file_name}</label></li>`
          }).join('\n')}
          </ul>
      </div>
      `)
  }

  function getReferencePptxSelector(reference_pptxes) {
    return (`
      <div id='reference_link_checkboxes' class="field">
        <label>Available reference links:</label>
          <ul class='list-unstyled'>
          ${_.map(reference_pptxes, reference_pptx => {
            return `<li><input id=${reference_pptx.id} type='checkbox' name="article[reference_pptxes][]" value="${reference_pptx.id}">
                    <label id='cms_reference_pptx_label' class='filter-label' for=${reference_pptx.id}>${reference_pptx.document_file_name}</label></li>`
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
  CKEDITOR.config.height = 250;
  CKEDITOR.config.width = 'auto';
  CKEDITOR.config.extraAllowedContent = 'iframe[*]';
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
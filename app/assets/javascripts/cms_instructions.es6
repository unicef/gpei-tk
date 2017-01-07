$(() => {
  if ($('#CMS_items').css('visibility') === 'visible'){
    $('#CMS_instructions').click(e => {
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: '/cms/how_to_instructions/'
      }).done(response => {
        $('#CMS_index_content').empty()
        if (!_.isNull(response.cms_instructions)){
          $('#CMS_index_content').append(response.cms_instructions.content)
        }
      })
      return false
    })
    $('#CMS_update_instructions').click(e => {
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: '/cms/how_to_instructions/'
      }).done(response => {
        let form = getFormForInstructions()
        $('#CMS_index_content').empty()
        $('#CMS_index_content').append(form)
        if (!_.isNull(response.cms_instructions)){
          $('#CMS_index_content #editor').val(response.cms_instructions.content)
        }
        initializeCKEditor()
      })
      return false
    })

    $('#CMS_index_content').on('submit', '#CMS_how_to_instructions_form', e => {
      e.preventDefault()
      let data = $(e.currentTarget).serialize()
      $.ajax({
        method: 'POST',
        url: '/cms/how_to_instructions/',
        data: data
      }).done(response => {
        $('#CMS_instructions').trigger('click')
      })
      return false
    })
    function getFormForInstructions() {
      return `<form id="CMS_how_to_instructions_form" class="ui form">
                <div class="field">
                  <label>Edit CMS instructions:</label>
                  <textarea name="how_to_instructions[content]" id="editor" required></textarea>
                </div>
                <button class="ui button" type="submit">Submit</button>
              </form>`
    }
    if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
    CKEDITOR.tools.enableHtml5Elements( document );

    // The trick to keep the editor in the sample quite small
    // unless user specified own height.
    CKEDITOR.config.height = 300;
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
    })()
  }
})
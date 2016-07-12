$(() => {
  $('#CMS_assets_link').click(e => {
    e.preventDefault()
  })

  $('#CMS_references_link').click(e => {
    e.preventDefault()
  })

  $('#CMS_templates_link').click(e => {
    e.preventDefault()
  })

  $('#CMS_references_link_upload').click(e => {
    e.preventDefault()
  })

  $('#CMS_templates_link_upload').click(e => {
    e.preventDefault()
  })

  $('#CMS_index_content').on('click', '#add_template_link_input', e => {
    e.preventDefault()
    $(e.currentTarget.parentElement.parentElement).after(getTemplateLinkField())
    return false
  })

  $('#CMS_index_content').on('click', '#add_reference_link_input', e => {
    e.preventDefault()
    $(e.currentTarget.parentElement.parentElement).after(getReferenceLinkField())
    return false
  })

  function getTemplateLinkField() {
    return (`
      <div class="field">
        <label>Template Links<a id="add_template_link_input"  href=''><i class="fa fa-plus" aria-hidden="true"></i></a></label>
        <input class="template_link_file" type="file" name="template_links" value="">
      </div>
    `)
  }

  function getReferenceLinkField() {
    return (`
      <div class="field">
        <label>Reference Links<a id="add_reference_link_input"  href=''><i class="fa fa-plus" aria-hidden="true"></i></a></label>
        <input class="reference_link_file" type="file" name="reference_links" value="">
      </div>
    `)
  }
})
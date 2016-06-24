$(() => {
  $('#CMS_create_c4d_article_link').click(e => {
    e.preventDefault();
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
        $('#CMS_index_content').empty()
        let content = getEmptyC4dArticleForm(c4d_subcategories, c4d_categories)
        $('#CMS_index_content').append(content)
      })
    })
  })

  $('#CMS_index_content').on('submit', '#CMS_c4d_article_create_form', e => {
    $.ajax({
      method: 'POST',
      url: 'cms/c4d_articles/',
      data: $('#CMS_c4d_article_create_form').serialize() + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      $('#CMS_c4d_articles_link').trigger('click')
      $('.ui.dimmer').dimmer('show')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
    })
  })

  function getEmptyC4dArticleForm(c4d_subcategories, c4d_categories){
    return (`
      <form id="CMS_c4d_article_create_form" class="ui form CMS_c4d_article_form_div">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="cms_title" placeholder="CMS Title" value="" required>
        </div>
        ${getC4dSubcategoryDropdown("Subcategory", "c4d_subcategory_id", c4d_subcategories)}
        ${getC4dCategoryDropdown("Category", "c4d_category_id", c4d_categories)}
        <div class="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="Title" value="" required>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea name="description"></textarea>
        </div>
        <div class="field">
          <label>Template Links</label>
          <input type="text" name="template_links" value="">
        </div>
        <div class="field">
          <label>Reference Links</label>
          <input type="text" name="reference_links" value="">
        </div>
        <div id="response_status_div"></div>
        <button class="ui button" type="submit">Submit</button>
      </form>
    `)
  }

  function getC4dSubcategoryDropdown(label, option_name, c4d_subcategories){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="${option_name}" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Subcategory</option>
          ${_.map(c4d_subcategories, subcategory => { return `<option value="${subcategory.id}">${subcategory.title}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }

  function getC4dCategoryDropdown(label, option_name, c4d_categories){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="${option_name}" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Category</option>
          ${_.map(c4d_categories, category => { return `<option value="${category.id}">${category.title}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }
})
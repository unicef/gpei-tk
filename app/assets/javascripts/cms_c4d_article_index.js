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

  function appendC4dArticleRows(c4d_articles, users){
    _.forEach(c4d_articles, article => {
      let row = '<tr id="' + article.id + '">' + '<td>' + article.id + '</td>' + '<td><a id="' + article.id + '" href="">' + article.title + '</td>' + '<td>' + article.status + '</td>' + '<td>' + moment(article.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + moment(article.created_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + users[article.owner_id].first_name + ' ' + users[article.owner_id].last_name + '</td>' + '<td>' + getUserActionDropdown(article.id) + '</td>' + '</tr>'
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
    })
  })

  function getCMSC4dArticleContent(article, c4d_subcategories, c4d_categories) {
    return (`
    <div id='article_header' class='row'>
      <div class='col-md-3'>
      ID: ${article.id}
      </div>
      <div class='col-md-3'>
      Version: ${article.version}
      </div>
      <div class='col-md-3'>
      Status: ${article.status}
      </div>
    </div>
    <div id="${article.id}" class="CMS_c4d_article_form_div">
      <form id="CMS_c4d_article_form" class="ui form">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="cms_title" placeholder="${article.cms_title}" value="${article.cms_title}" required>
        </div>
        ${getC4dSubcategoryDropdown("Subcategory", "c4d_subcategory_id", c4d_subcategories)}
        ${getC4dCategoryDropdown("Category", "c4d_category_id", c4d_categories)}
        <div class="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="Title" value="${article.title}" required>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea name="description">${article.description}</textarea>
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

  function getUserActionDropdown(id){
    return (
      '<div class="ui buttons"><div id="CMS_actions_dropdown" class="ui button">Actions</div><div class="ui floating dropdown icon button"><i class="dropdown icon"></i><div class="menu"><div id="' + id + '" class="item"><span id="CMS_user_assign_role">Assign Roles</span></div><div id="' + id + '" class="item"><span id="CMS_user_delete_user">Delete User</span></div></div></div>'
    );
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

  $('#CMS_index_content').on('submit', '#CMS_c4d_article_form', e => {
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: 'cms/c4d_articles/' + e.currentTarget.parentElement.id,
      data: $('#CMS_c4d_article_form').serialize() + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      $('.ui.dimmer').dimmer('show')
    })
  })
})
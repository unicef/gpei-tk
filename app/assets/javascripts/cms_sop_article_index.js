$(() => {
  $('#CMS_sop_articles_link').click(e => {
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'cms/sop_articles/'
    }).done(response => {
      $('#CMS_index_content').empty()
      appendSopArticleTableHeader()
      appendSopArticleRows(response.sop_articles, response.users)
    })
  })

  function getUserActionDropdown(id){
    return (
      '<div class="ui buttons"><div id="CMS_actions_dropdown" class="ui button">Actions</div><div class="ui floating dropdown icon button"><i class="dropdown icon"></i><div class="menu"><div id="' + id + '" class="item"><span id="CMS_user_assign_role">Assign Roles</span></div><div id="' + id + '" class="item"><span id="CMS_user_delete_user">Delete User</span></div></div></div>'
    );
  }

  function appendSopArticleTableHeader(){
    $('#CMS_index_content').append('<table id="CMS_sop_articles_table" class="ui celled table"></table>')
    $('#CMS_sop_articles_table').append('<thead><tr><th class="text-center"> ID </th><th class="text-center"> Title </th><th class="text-center"> Status </th><th class="text-center"> Updated </th><th class="text-center"> Created </th><th class="text-center"> Author </th><th class="text-center"></th></tr></thead>')
  }

  function appendSopArticleRows(sop_articles, users){
    _.forEach(sop_articles, article => {
      let row = '<tr id="' + article.id + '">' + '<td>' + article.id + '</td>' + '<td><a id="' + article.id + '" href="">' + article.title + '</td>' + '<td>' + article.status + '</td>' + '<td>' + moment(article.updated_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + moment(article.created_at, "YYYY-MM-DD").format("MMM DD, YYYY") + '</td>' + '<td>' + users[article.owner_id].first_name + ' ' + users[article.owner_id].last_name + '</td>' + '<td>' + getUserActionDropdown(article.id) + '</td>' + '</tr>'
      $('#CMS_sop_articles_table').append(row)
    })
  }

  $('#CMS_index_content').on('click', '#CMS_sop_articles_table a', e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: 'cms/sop_articles/' + e.currentTarget.id
    }).done(response => {
      $('#CMS_index_content').empty()
      let content = getCMSSopArticleContent(response.sop_article, response.sop_times, response.sop_categories, response.offices)
      $('#CMS_index_content').append(content)
    })
  })

  function getCMSSopArticleContent(article, sop_times, sop_categories, offices) {
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
    <div id="${article.id}" class="CMS_sop_article_form_div">
      <form id="CMS_sop_article_form" class="ui form">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="cms_title" placeholder="${article.cms_title}" value="${article.cms_title}" required>
        </div>
        ${getSopTimeDropdown("Time", "sop_time_id", sop_times)}
        ${getSopCategoryDropdown("Category", "sop_category_id", sop_categories)}
        <div class="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="Title" value="${article.title}" required>
        </div>
        <div class="field">
          <label>Responsible</label>
          <input type="text" name="responsible" value="${article.responsible}" required>
        </div>
        ${getOfficesDropdown("Office", "responsibility_id", offices)}
        <div class="field">
          <label>Support</label>
          <input type="text" name="support" value="${article.support}" required>
        </div>
        <div class="field">
          <label>Article</label>
          <textarea name="article">${article.article}</textarea>
        </div>
        <div class="field">
          <label>Video URL</label>
          <input type="text" name="video_url" value="${article.video_url}">
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

  function getSopTimeDropdown(label, option_name, sop_times){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="${option_name}" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Time Period</option>
          ${_.map(sop_times, time => { return `<option value="${time.id}">${time.period}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }

  function getSopCategoryDropdown(label, option_name, sop_categories){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="${option_name}" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Category</option>
          ${_.map(sop_categories, category => { return `<option value="${category.id}">${category.title}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }

  $('#CMS_index_content').on('submit', '#CMS_sop_article_form', e => {
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: 'cms/sop_articles/' + e.currentTarget.parentElement.id,
      data: $('#CMS_sop_article_form').serialize() + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      $('.ui.dimmer').dimmer('show')
    })
  })
})
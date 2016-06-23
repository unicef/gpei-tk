$(() => {
  $('.ui.styled.accordion')
  .accordion({
    selector: {
      trigger: '.title'
    }
  });

  $('.ui.modal')
    .modal({
      onHide: () => {
        $('.ui.modal .content').empty()
        $('.ui.modal .header').empty()
      }
    })

  $('.ui.modal').on('submit', '#CMS_create_user_form', e => {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'cms/users/',
      data: $('#CMS_create_user_form').serialize()
    }).done(response => {
      $('.ui.modal').modal('toggle')
      let content = '<tr id="' + response.user.id + '">' + '<td>' + response.user.first_name + '</td>' + '<td>' + response.user.last_name + '</td>' + '<td>' + response.user.email + '</td>' + '<td>' + response.role.title + '</td>' + '<td>' + getUserActionDropdown(response.user.id) + '</td>' + '</tr>'
      $('#CMS_index_content #CMS_users_table').append(content)
      $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
          action: 'hide',
          transition: 'drop'
      });
    })
  })

  $('#CMS_create_user_link').click(e => {
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'roles/'
    }).done(response => {
      $('.ui.modal').modal('toggle')
      $('.ui.modal .header').append('Create User')
      let content = getUserFormEmptyForm(response.roles)
      $('.ui.modal .content').append(content)
      $('.ui.radio.checkbox')
      .checkbox();
    })
  })

  $('#CMS_index_content').on('click', '#CMS_user_assign_role', e => {
    $('.ui.modal')
      .modal('toggle')
      // .modal('show');

    $('.ui.modal .header').append('Modify User Role')
    $.ajax({
      method: 'GET',
      url: 'roles/'
    }).done(response => {
      let element_id = '#CMS_index_content tr#' + e.currentTarget.parentElement.id + ' td'
      let user_element = $(element_id)
      let content = getUserForm(user_element, response.roles, e.currentTarget.parentElement.id)
      $('.ui.modal .content').append(content)
      $('.ui.radio.checkbox')
      .checkbox();
      modifyRoleSubmit()
    })
  })

  function modifyRoleSubmit(){
    $(document).find('.ui.modal').submit((e) => {
      e.preventDefault();
      $.ajax({
        method: 'PATCH',
        url: 'cms/users/' + $(e.currentTarget).find('form').attr('id') + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content')),
        data: $(e.currentTarget).find('.ui.form').serialize()
      }).done(response => {
        $('.ui.modal').modal('hide')
        $('#CMS_users_table').find('#'+response.id).find('td')[$('#CMS_users_table').find('#'+response.id).find('td').length-2].innerHTML = response.role.title
      })
    })
  }

  function getUserForm(user_element, roles, id) {
    return (
    `<form id="${id}" class="ui form">
      <div class="disabled field">
        <label>First Name</label>
        <input type="text" name="first_name" placeholder="${user_element[0].innerHTML}" value="${user_element[0].innerHTML}">
      </div>
      <div class="disabled field">
        <label>Last Name</label>
        <input type="text" name="last_name" placeholder="${user_element[1].innerHTML}" value="${user_element[1].innerHTML}">
      </div>
      <div class="disabled field">
        <label>Email</label>
        <input type="text" name="email" placeholder="${user_element[2].innerHTML}" value="${user_element[2].innerHTML}">
      </div>
      ${getRolesRadioCheckBoxWithUserRole(roles, user_element[3].innerHTML)}
      <button class="ui button" type="submit">Submit</button>
    </form>`)
  }

  function getUserFormEmptyForm(roles) {
    return (
    `<form id="CMS_create_user_form" class="ui form">
      <div class="field">
        <label>First Name</label>
        <input type="text" name="first_name" placeholder="John" value="" required>
      </div>
      <div class="field">
        <label>Last Name</label>
        <input type="text" name="last_name" placeholder="Smith" value="" required>
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" value="" required>
      </div>
      ${getRolesRadioCheckBox(roles)}
      <button class="ui button" type="submit">Submit</button>
    </form>`)
  }
  function getRolesRadioCheckBoxWithUserRole(roles, user_role) {
    return (
      `<div class="inline fields">
        <label for="role">Select user role:</label>
        ${_.map(roles, role => {
            let checked = ''
            if (user_role === role.title) {
              checked = 'checked="checked"' }
            return `<div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="role_id" tabindex="0" class="hidden" ${checked} value="${role.id}">
                <label>${role.title}</label>
              </div>
            </div>`
          }).join('')}
      </div>`
    )
  }
  function getRolesRadioCheckBox(roles) {
    return (
      `<div class="inline fields">
        <label for="role">Select user role:</label>
        ${_.map(roles, role => {
            let checked = ''
            return `<div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="role_id" checked="${checked}" tabindex="0" class="hidden" value="${role.id}">
                <label>${role.title}</label>
              </div>
            </div>`
          }).join('')}
      </div>`
    )
  }


  $('#CMS_index_content').on('click', '#CMS_user_delete_user', e => {
    $.ajax({
      method: 'DELETE',
      url: 'cms/users/' + e.currentTarget.parentElement.id + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content')),
      data: $(e.currentTarget).find('.ui.form').serialize()
    }).done(response => {
      let element = _.filter($('#CMS_users_table tr'), tr => {
        if (tr.id === response.id) {
          return tr
        }
      })
      $(element).empty()
    })
  })

  $('#CMS_users_link').click(e => {
    e.preventDefault();

    $.ajax({
      method: 'GET',
      url: 'cms/users/'
    }).done(response => {
      $('#CMS_index_content').empty()
      let table = '<table id="CMS_users_table" class="ui celled table"></table>'
      $('#CMS_index_content').append(table)
      let header = '<thead><tr><th class="text-center"> First Name </th><th class="text-center"> Last Name </th><th class="text-center"> Email </th><th class="text-center"> Role </th><th class="text-center"></th></tr></thead>'
      $('#CMS_users_table').prepend(header)
      _ .forEach(response.users, user => {
        let row = '<tr id="' + user.id + '">' + '<td>' + user.first_name + '</td>' + '<td>' + user.last_name + '</td>' + '<td>' + user.email + '</td>' + '<td>' + response.roles[user.role_id - 1].title + '</td>' + '<td>' + getUserActionDropdown(user.id) + '</td>' + '</tr>'
        $('#CMS_users_table').append(row)
      })
      $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
          action: 'hide',
          transition: 'drop'
      });
    })
  })
  function getUserActionDropdown(id){
    return (
      '<div class="ui buttons"><div id="CMS_actions_dropdown" class="ui button">Actions</div><div class="ui floating dropdown icon button"><i class="dropdown icon"></i><div class="menu"><div id="' + id + '" class="item"><span id="CMS_user_assign_role">Assign Roles</span></div><div id="' + id + '" class="item"><span id="CMS_user_delete_user">Delete User</span></div></div></div>'
    );
  }

  // SOP
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
      let content = getCMSSopArticleContent(response.sop_article, response.sop_times, response.sop_categories)
      $('#CMS_index_content').append(content)
    })
  })
  function getCMSSopArticleContent(article, sop_times, sop_categories) {
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
        <div id="response_status_div"></div>
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
      url: 'cms/sop_articles/' + e.currentTarget.parentElement.id + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content')),
      data: $('#CMS_sop_article_form').serialize()
    }).done(response => {
      $('.ui.dimmer').dimmer('show')
    })
  })
});
$(() => {
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
})
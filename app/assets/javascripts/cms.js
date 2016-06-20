$(function(){
  $('.ui.styled.accordion')
  .accordion({
    selector: {
      trigger: '.title .icon'
    }
  });
  $('#CMS_index_content').on('click', '#CMS_user_assign_role', function(e){
    
  })
  $('#CMS_index_content').on('click', '#CMS_user_remove_membership', function(e){

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
      let header = '<thead><tr>' + '<th class="text-center"> First Name </th>' + '<th class="text-center"> Last Name </th>' + '<th class="text-center"> Email </th>' + '<th class="text-center"> Role </th>' + '<th class="text-center"></th>' + '</tr></thead>'
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
  function getUserHeader(){

  }
  function getUserActionDropdown(id){
    return (
      '<div class="ui buttons"><div id="CMS_actions_dropdown" class="ui button">Actions</div><div class="ui floating dropdown icon button"><i class="dropdown icon"></i><div class="menu"><div id="' + id + '" class="item"><span id="CMS_user_assign_role">Assign Roles</span></div><div id="' + id + '" class="item"><span id="CMS_user_remove_membership">Remove Membership</span></div></div></div>'
    );
  }
});
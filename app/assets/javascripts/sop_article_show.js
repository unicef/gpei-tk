// sop_checklist_icons

  var $sopcheck_list_icons = $('#sop_checklist_icons')
  $sopcheck_list_icons.on('click', '#grid_add', function(e){
    debugger
    var article_title = e.currentTarget.parentElement.querySelector('#grid_item_article_title').innerHTML;
    $.ajax({
      method: 'POST',
      url: '/sop/checklist/' + article_title
    }).done(function(response) {
      toggleVisibility(e.currentTarget);

      var grid_check = e.currentTarget.nextElementSibling

      toggleVisibility(e.currentTarget.nextElementSibling);
      var article_id = $('#sop_article_id').text()
      var list_item = "<li id=\"" + article_title + "\"><a href=\"sop_articles/" + article_id + "\">" + article_title + "</a><i class=\"fa fa-remove\" aria-hidden=\"true\"></i></li>";
      $('#sop_checklist_list').append(list_item);
    });
  });

  $sopcheck_list_icons.on('click', '#grid_check', function(e){
    debugger
    var article_title = e.currentTarget.parentElement.querySelector('#grid_item_article_title').innerHTML;
    $.ajax({
      method: 'DELETE',
      url: '/sop/checklist/' + article_title
    }).done(function(response) {
      toggleVisibility(e.currentTarget);

      var grid_check = e.currentTarget.previousElementSibling

      toggleVisibility(e.currentTarget.previousElementSibling);

      var article_list_item = '#sop_checklist_list #'+article_title;
      $(article_list_item).remove();
    });
  });
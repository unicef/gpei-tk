$(function(){
  let $sopcheck_list_icons = $('#sop_article_logo_row')
  $sopcheck_list_icons.on('click', '.grid_add', function(e){
    let article_title = e.currentTarget.parentElement.querySelector('#grid_item_article_title').innerHTML;
    let id = e.currentTarget.id
    debugger
    $.ajax({
      method: 'POST',
      url: '/sop/checklist/',
      data: { title: article_title, id: id }
    }).done(function(response) {
      toggleVisibility(e.currentTarget);

      let grid_check = e.currentTarget.nextElementSibling

      toggleVisibility(e.currentTarget.nextElementSibling);
      let article_title = response.article_title
      let id = response.id
      let list_item = "<div id=\"" + id + "\" class=\"item\" style='background-color: black;color: white;'><a href=sop_articles/" + id + " style='background-color: black;color: white;'>" + article_title + "</a> <i id=\"checklist_item" + article_title + "\" class=\"fa fa-remove\" aria-hidden=\"true\" style='background-color: black;color: white;'></i></div>"
      removeNoArticlesSelected('#sop_no_items_selected')
      $('#sop_checklist_list').append(list_item);
    });
  });

  $sopcheck_list_icons.on('click', '.grid_check', function(e){
    let article_title = e.currentTarget.parentElement.querySelector('#grid_item_article_title').innerHTML;
    let id = e.currentTarget.id
    debugger
    $.ajax({
      method: 'DELETE',
      url: '/sop/checklist/',
      data: { title: article_title, id: id }
    }).done(function(response) {
      debugger
      toggleVisibility(e.currentTarget);

      let grid_check = e.currentTarget.previousElementSibling

      toggleVisibility(e.currentTarget.previousElementSibling);

      let article_list_item = '#sop_checklist_list #'+response.id;
      $(article_list_item).remove();
      checkIfArticlesSelectedAndAppend('#sop_checklist_list')
    });
  });

  function toggleVisibility(el) {
    if ($(el).css('visibility') == 'hidden' )
      $(el).css('visibility','visible');
    else
      $(el).css('visibility','hidden');
  }

  function checkIfArticlesSelectedAndAppend(el_id){
    var items = el_id + " .item"
    if ($(items).length === 0) {
      var list_id = el_id
      var no_items = "<div class=\"item\" id=\"sop_no_items_selected\"><span style='background-color: black;color: white;'>No articles selected</span></div>"
      $(list_id).append(no_items)
    }
  }
  function removeNoArticlesSelected(ele) {
    var el = "#sop_checklist_list " + ele
    $(el).remove()
  }

})
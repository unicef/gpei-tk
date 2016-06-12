$(function(){
  var $container = $('#isotope_container').isotope({
    itemSelector: '.item'
  });

  // clear-all filter listener
  var $filter_clear = $('#sop_filter_clear_all');
  var $checkboxes = $('.sop_checkboxes input');
  $filter_clear.click(function(){
    for (var idx = 0; idx < $checkboxes.length; idx++)
      $checkboxes[idx].checked = false;
    updateIsotope();
  });

  //isotope listener
  var $output = $('#sop_filter');
  $checkboxes.change(function() {
    updateIsotope();
  });

  function updateIsotope(){
    var inclusives = [];
    $checkboxes.each( function( i, elem ) {
      if ( elem.checked )
        inclusives.push( elem.value );
    });
    var filterValue = inclusives.length ? inclusives.join(', ') : '*';
    $container.isotope({ filter: filterValue })
    filterValue = filterValue === '*' ? '' : filterValue
    $output.html("<li id=\"checklist_article\">" + filterValue + "</li>");
  }
  function toggleVisibility(el) {
    if ($(el).css('visibility') == 'hidden' )
      $(el).css('visibility','visible');
    else
      $(el).css('visibility','hidden');
  }
  var $add = $('.grid_add')

  $add.click(function(e){

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

  var $remove = $('.grid_check')
  $remove.click(function(e){

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

  $('#sop_checklist_list').on('click', 'i', function(e) {
    var parent_element = e.currentTarget.parentElement
    var article_title = parent_element.id
    debugger
    $.ajax({
      method: 'DELETE',
      url: '/sop/checklist/' + article_title
    }).done(function(response) {
      var $grid_tile = $('#grid_tile_'+article_title)
      var $check_icon = $('#grid_tile_'+ article_title + ' .grid_add')
      var $add_icon = $('#grid_tile_'+ article_title + ' .grid_check')
      toggleVisibility($check_icon);
      toggleVisibility($add_icon);

      var sop_checklist_list_item = '#sop_checklist_list #' + parent_element.id
      debugger
      $(sop_checklist_list_item).remove()
    })
  });
});
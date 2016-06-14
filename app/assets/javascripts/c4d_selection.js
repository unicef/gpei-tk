$(function(){
  var $grid = $('#c4d_isotope_container').isotope({
    itemSelector: '.c4d_grid_item'
  });

// // filter functions
//   var filterFns = {
//     // show if number is greater than 50
//     numberGreaterThan50: function() {
//       var number = $(this).find('.number').text();
//       return parseInt( number, 10 ) > 50;
//     },
//     // show if name ends with -ium
//     ium: function() {
//       var name = $(this).find('.name').text();
//       return name.match( /ium$/ );
//     }
//   };
// bind filter button click
$('.c4d-filters-button-group').on('click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  // use filterFn if matches value
  // filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
// change is_checked class on buttons
$('.button-group').each(function(i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is_checked').removeClass('is_checked');
    $(this).addClass('is_checked');
  });
});

//   // clear-all filter listener
//   var $filter_clear = $('#sop_filter_clear_all');
//   var $checkboxes = $('.sop_checkboxes input');
//   $filter_clear.click(function(){
//     for (var idx = 0; idx < $checkboxes.length; idx++)
//       $checkboxes[idx].checked = false;
//     updateIsotope();
//   });

//   //isotope listener
//   var $output = $('#sop_filter');
//   $checkboxes.change(function() {
//     updateIsotope();
//   });

//   function updateIsotope(){
//     var inclusives = [];
//     $checkboxes.each( function( i, elem ) {
//       if ( elem.checked )
//         inclusives.push( elem.value );
//     });
//     var filterValue = inclusives.length ? inclusives.join(', ') : '*';
//     $container.isotope({ filter: filterValue })
//     filterValue = filterValue === '*' ? '' : filterValue
//     $output.html("<li id=\"checklist_article\">" + filterValue + "</li>");
//   }
  function toggleVisibility(el) {
    if ($(el).css('visibility') == 'hidden' )
      $(el).css('visibility','visible');
    else
      $(el).css('visibility','hidden');
  }
  var $add = $('.c4d_grid_add')

  $add.click(function(e){
    var article_title = e.currentTarget.parentElement.querySelector('.c4d_grid_item_article_title').innerHTML;
    $.ajax({
      method: 'POST',
      url: '/c4d/toolkit/' + article_title
    }).done(function(response) {
      toggleVisibility(e.currentTarget);

      var grid_check = e.currentTarget.nextElementSibling

      toggleVisibility(e.currentTarget.nextElementSibling);
      var article_id = $('#c4d_article_id').text()
      var list_item = "<div id=\"" + article_title + "\" class=\"item\" style='background-color: black;color: white;'><a href=c4d_articles/" + article_id + "\" style='background-color: black;color: white;'>" + article_title + "</a> <i id=\"" + article_title + "\" class=\"fa fa-remove\" aria-hidden=\"true\" style='background-color: black;color: white;'></i></div>"
      removeNoArticlesSelected('#c4d_no_items_selected')
      $('#c4d_toolkit_list').append(list_item);
    });
  });
  function removeNoArticlesSelected(ele) {
    var el = "#c4d_toolkit_list " + ele
    $(el).remove()
  }

  var $remove = $('.c4d_grid_check')
  $remove.click(function(e){

    var article_title = e.currentTarget.parentElement.querySelector('.c4d_grid_item_article_title').innerHTML;
    $.ajax({
      method: 'DELETE',
      url: '/sop/checklist/' + article_title
    }).done(function(response) {
      toggleVisibility(e.currentTarget);

      var grid_check = e.currentTarget.previousElementSibling

      toggleVisibility(e.currentTarget.previousElementSibling);

      var article_list_item = '#c4d_toolkit_list #'+article_title;
      $(article_list_item).remove();
      checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
    });
  });

  $('#c4d_toolkit_list').on('click', 'i', function(e) {
    var article_title = e.currentTarget.id
    var parent_element = e.currentTarget.parentElement
    $.ajax({
      method: 'DELETE',
      url: '/c4d/toolkit/' + article_title
    }).done(function(response) {
      var $grid_tile = $('#c4d_grid_tile_'+article_title)
      var $check_icon = $grid_tile.find('.c4d_grid_check')
      var $add_icon = $grid_tile.find('.c4d_grid_add')

      toggleVisibility($check_icon);
      toggleVisibility($add_icon);
      var c4d_toolkit_list_item = '#c4d_toolkit_list #' + parent_element.id
      $(c4d_toolkit_list_item).remove()
      checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
    })
  });

  function checkIfArticlesSelectedAndAppend(el_id){
    var items = el_id + " .item"
    if ($(items).length === 0) {
      var list_id = el_id
      var no_items = "<div class=\"item\" id=\"c4d_no_items_selected\"><span style='background-color: black;color: white;'>No articles selected</span></div>"
      $(list_id).append(no_items)
    }
  }

});
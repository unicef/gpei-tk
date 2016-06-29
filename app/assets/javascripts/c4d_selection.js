$(function(){
  let $grid = $('#c4d_category_grid').isotope({
    itemSelector: '.c4d_grid_item'
  });
// // filter functions
//   let filterFns = {
//     // show if number is greater than 50
//     numberGreaterThan50: function() {
//       let number = $(this).find('.number').text();
//       return parseInt( number, 10 ) > 50;
//     },
//     // show if name ends with -ium
//     ium: function() {
//       let name = $(this).find('.name').text();
//       return name.match( /ium$/ );
//     }
//   };
// bind filter button click
$('.c4d-filters-button-group').on('click', 'button', e => {
  let filterValue = $(e.currentTarget).attr('data-filter')
  // use filterFn if matches value
  // filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
// change is_checked class on buttons
$('.button-group').each(function(i, buttonGroup) {
  let $buttonGroup = $(buttonGroup);
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is_checked').removeClass('is_checked');
    // let color_class = getColorClass($(this).attr('class').substr(7,$(this).attr('class').length))
    $(this).addClass('is_checked');
  });
  // function getColorClass(class_string) {
  //   if (class_string === 'c4d_selection_background_Act') {
  //     return 'Act_color';
  //   } else if (class_string === 'c4d_selection_background_Understand') {
  //     return 'Understand_color';
  //   } else if (class_string === 'c4d_selection_background_Plan') {
  //     return 'Plan_color';
  //   } else if (class_string === 'c4d_selection_background_Tools') {
  //     return 'Tools_color';
  //   }
  // }
});
// $('.button-group').on('click', '.c4d_selection_background_Act', function(){
//   $(this).toggleClass('Act_color')
// })
// $('.button-group').on('click', '.c4d_selection_background_Plan', function(){
//   $(this).toggleClass('Plan_color')
// })
// $('.button-group').on('click', '.c4d_selection_background_Understand', function(){
//   $(this).toggleClass('Understand_color')
// })
// $('.button-group').on('click', '.c4d_selection_background_Tools', function(){
//   $(this).toggleClass('Tools_color')
// })

//   //isotope listener
//   let $output = $('#sop_filter');
//   $checkboxes.change(function() {
//     updateIsotope();
//   });

//   function updateIsotope(){
//     let inclusives = [];
//     $checkboxes.each( function( i, elem ) {
//       if ( elem.checked )
//         inclusives.push( elem.value );
//     });
//     let filterValue = inclusives.length ? inclusives.join(', ') : '*';
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
  let $add = $('#c4d_category_grid .c4d_grid_add')

  $add.click(e => {
    e.preventDefault()
    let article_title = e.currentTarget.parentElement.querySelector('.c4d_grid_item_article_title').innerHTML;
    let article_id = e.currentTarget.parentElement.id
    $.ajax({
      method: 'POST',
      url: '/c4d/toolkit/',
      data: { title: article_title, id: article_id }
    }).done(function(response) {
      toggleVisibility(e.currentTarget);

      let grid_check = e.currentTarget.nextElementSibling

      toggleVisibility(e.currentTarget.nextElementSibling);
      let article_id = response.id
      let list_item = "<div id=\"" + article_id + "\" class=\"item\" style='background-color: black;color: white;'><a href=/c4d_articles/" + article_id + " style='background-color: black;color: white;'>" + article_title + "</a> <i id=\"" + article_title + "\" class=\"fa fa-remove\" aria-hidden=\"true\" style='background-color: black;color: white;'></i></div>"
      removeNoArticlesSelected('#c4d_no_items_selected')
      $('#c4d_toolkit_list').append(list_item);
    });
  });
  function removeNoArticlesSelected(ele) {
    let el = "#c4d_toolkit_list " + ele
    $(el).remove()
  }

  let $remove = $('#c4d_category_grid .c4d_grid_check')
  $remove.click(e => {
    e.preventDefault()
    let article_title = e.currentTarget.parentElement.querySelector('.c4d_grid_item_article_title').innerHTML;
    let article_id = e.currentTarget.parentElement.id
    $.ajax({
      method: 'DELETE',
      url: '/c4d/toolkit/',
      data: { title: article_title, id: article_id }
    }).done(function(response) {
      toggleVisibility(e.currentTarget);

      let grid_check = e.currentTarget.previousElementSibling

      toggleVisibility(e.currentTarget.previousElementSibling);
      let article_list_item = '#c4d_toolkit_list #'+response.id;
      $(article_list_item).remove();
      checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
    });
  });

  $('#c4d_toolkit_list').on('click', 'i', e => {
    e.preventDefault()
    let article_title = e.currentTarget.id
    let parent_element = e.currentTarget.parentElement
    $.ajax({
      method: 'DELETE',
      url: '/c4d/toolkit/',
      data: { title: article_title, id: parent_element.id }
    }).done(function(response) {
      let $grid_tile = $('#c4d_category_grid #'+ parent_element.id)
      let $check_icon = $grid_tile.find('.c4d_grid_check')
      let $add_icon = $grid_tile.find('.c4d_grid_add')
      toggleVisibility($check_icon);
      toggleVisibility($add_icon);
      let c4d_toolkit_list_item = '#c4d_toolkit_list #' + parent_element.id
      $(c4d_toolkit_list_item).remove()
      checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
    })
  });

  function checkIfArticlesSelectedAndAppend(el_id){
    let items = el_id + " .item"
    if ($(items).length === 0) {
      let list_id = el_id
      let no_items = "<div class=\"item\" id=\"c4d_no_items_selected\"><span style='background-color: black;color: white;'>No articles selected</span></div>"
      $(list_id).append(no_items)
    }
  }

});
$(function(){
  var $container = $('#c4d_isotope_container').isotope({
    itemSelector: '.item'
  });

  // clear-all filter listener
  var $filter_clear = $('#filter_clear_all');
  var $c4d_categories = $('.c4d_category input');
  $filter_clear.click(function(){
    for (var idx = 0; idx < $c4d_categories.length; idx++)
      $c4d_categories[idx].checked = false;
    updateIsotope();
  });

  //isotope listener
  $c4d_categories.change(function() {
    updateIsotope();
  });

  function updateIsotope(){
    var inclusives = [];
    $c4d_categories.each( function( i, elem ) {
      if ( elem.checked )
        inclusives.push( elem.value );
    });
    var filterValue = inclusives.length ? inclusives.join(', ') : '*';
    $container.isotope({ filter: filterValue })
    filterValue = filterValue === '*' ? '' : filterValue
    $output.html("<li id=\"checklist_article\">" + filterValue + "</li>");
  }
});
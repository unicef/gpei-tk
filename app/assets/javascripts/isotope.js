$(function(){
  var $container = $('#isotope_container').isotope({
    itemSelector: '.item'
  });

  // clear-all filter listener
  var $filter_clear = $('#filter_clear_all');
  var $checkboxes = $('.sop_checkboxes input');
  $filter_clear.click(function(){
    for (var idx = 0; idx < $checkboxes.length; idx++)
      $checkboxes[idx].checked = false;
    updateIsotope();
  });

  //isotope listener
  var $output = $('#sop_filter');
  var $checkboxes = $('.sop_checkboxes input');
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
});
$(function(){
  $('#my_rhizome_dropdown')
  .mouseover(function() {
    $('.ui.selection.dropdown').dropdown('show');
  })
  .mouseleave(function() {
    $('.ui.selection.dropdown').dropdown('hide');
  });
});


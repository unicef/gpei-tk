$(function(){
  $('.grid').masonry()
  $('.grid .grid-item').click(function(e){
    var article_title = e.target.parentElement.querySelector('#title').innerHTML;
    $.ajax({
      method: 'patch',
      url: '/sop/checklist/' + article_title
    }).done(function(response) {

    });
  })
})
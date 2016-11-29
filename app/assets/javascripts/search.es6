$(() => {
  $('#article_search_modal').modal({
    onHide: () => {
      $('#article_search_modal .content').empty()
      $('#article_search_modal .header').empty()
    }
  })

  $('#nav_search_link').click(e => {
    e.preventDefault()
    $('#article_search_modal').modal('show')
    $('#article_search_modal .header').append(getArticleSearchHeader())
    $('#article_search_modal .content').append(getArticleSearchContent())
  })
  function getArticleSearchHeader(){
    return `<h2>Search poliok.it</h2>`
  }
  function getArticleSearchContent(){
    return `<form id="article_search_form" class="ui form">
              <input id='article_search_input' placeholder='Search' name='search[text]' type='text' alt='Search'>
            </form>`
  }
  $('#article_search_modal').on('submit', '#article_search_form', e => {
    e.preventDefault()

    return false
  })
})
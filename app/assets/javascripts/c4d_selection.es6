$(() => {
  if ($('#c4d_selection_page').css('visibility') === 'visible') {
    $('.ui.styled.accordion').accordion({
      selector: {
        trigger: '.title'
      }
    })

    let $grid = $('#c4d_category_grid').isotope({
      itemSelector: '.c4d_grid_item'
    })
    // $('.c4d-filters-button-group').on('click', 'button', e => {
    //   let filterValue = $(e.currentTarget).attr('data-filter')
    //   $grid.isotope({ filter: filterValue })
    // })
    // change is_checked class on buttons
    function getColorClass(category_text) {
      if (category_text === 'Understand')
        return '#8DA900'
      else if (category_text === 'Plan')
        return '#0735AC'
      else if (category_text === 'Act')
        return '#008953'
      else if (category_text === 'Tools')
        return '#009DA4'
    }
    function toggleVisibility(el) {
      if ($(el).css('visibility') == 'hidden' )
        $(el).css('visibility','visible')
      else
        $(el).css('visibility','hidden')
    }
    let $add = $('.c4d_grid_add')

    $('#application').on('click', '.c4d_grid_add', e => {
      e.preventDefault()
      let article_id = e.currentTarget.id
      $.ajax({
        method: 'POST',
        url: '/c4d/toolkit/',
        data: { id: article_id }
      }).done(response => {
        toggleVisibility(e.currentTarget)
        let grid_check = e.currentTarget.parentElement.querySelector('.c4d_grid_check')

        toggleVisibility(grid_check)
        let article_title = response.title
        let article_id = response.id
        let list_item = "<div id=\"" + article_id + "\" class=\"item\"><a class=\"white_text_black_bg\" href=\"/c4d_articles/" + article_id + "\">" + article_title + "</a> <i id=\"" + article_title + "\" class=\"fa fa-remove white_text_black_bg\" aria-hidden=\"true\"></i></div>"
        removeNoArticlesSelected('#c4d_no_items_selected')
        $('#c4d_toolkit_list').append(list_item)

        if (!$(e.currentTarget.parentElement).is('td')){
          toggleVisibility($.grep($('#c4d_subcategory_accordion td .c4d_grid_check'), function(f){ return f.id == e.currentTarget.id; })[0])
          toggleVisibility($.grep($('#c4d_subcategory_accordion td .c4d_grid_add'), function(f){ return f.id == e.currentTarget.id; })[0])
        }

      })
    })
    function removeNoArticlesSelected(ele) {
      let el = "#c4d_toolkit_list " + ele
      $(el).remove()
    }

    let $remove = $('.c4d_grid_check')
    $('#application').on('click', '.c4d_grid_check', e => {
      e.preventDefault()
      let article_id = e.currentTarget.id
      $.ajax({
        method: 'DELETE',
        url: '/c4d/toolkit/',
        data: { id: article_id }
      }).done(response => {
        toggleVisibility(e.currentTarget)

        let add_icon = e.currentTarget.parentElement.querySelector('.c4d_grid_add')
        toggleVisibility(add_icon)
        let article_list_item = '#c4d_toolkit_list #'+response.id
        $(article_list_item).remove()

        if (!$(e.currentTarget.parentElement).is('td')){
          toggleVisibility($.grep($('#c4d_subcategory_accordion td .c4d_grid_check'), function(f){ return f.id == e.currentTarget.id; })[0])
          toggleVisibility($.grep($('#c4d_subcategory_accordion td .c4d_grid_add'), function(f){ return f.id == e.currentTarget.id; })[0])
        }

        checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
      })
    })

    $('#c4d_toolkit_list').on('click', 'i', e => {
      e.preventDefault()
      let article_title = e.currentTarget.id
      let parent_element = e.currentTarget.parentElement
      $.ajax({
        method: 'DELETE',
        url: '/c4d/toolkit/',
        data: { title: article_title, id: parent_element.id }
      }).done(response => {
        let $grid_tile = $('#c4d_selection_page #c4d_subcategory_accordion #'+ parent_element.id)
        let $check_icon = $grid_tile.find('.c4d_grid_check')
        let $add_icon = $grid_tile.find('.c4d_grid_add')

        toggleVisibility($check_icon)
        toggleVisibility($add_icon)
        let c4d_toolkit_list_item = '#c4d_toolkit_list #' + parent_element.id
        $(c4d_toolkit_list_item).remove()
        checkIfArticlesSelectedAndAppend('#c4d_toolkit_list')
      })
    })

    function checkIfArticlesSelectedAndAppend(el_id){
      let items = el_id + " .item"
      if ($(items).length === 0) {
        let list_id = el_id
        let no_items = "<div id=\"c4d_no_items_selected\" class=\"item white_text_black_bg\">No articles selected</div>"
        $(list_id).append(no_items)
      }
    }

    // c4d article modal show
    $('#c4d_article_show_modal').modal({
      onHide: () => {
        $('#c4d_article_show_modal .content').empty()
        $('#c4d_article_show_modal .header').empty()
        clearUrlState()
      }
    })

    $('#c4d_subcategory_accordion #c4d_grid_tile_title').click(e => {
      e.preventDefault()
      $.ajax({
        method: 'GET',
        url: '/c4d_articles/' + e.currentTarget.parentElement.id
      }).done(response => {
        clearC4dModalText()
        setUrlStateForArticleShow(response.article)
        let content = c4d_article_content({ article: response.article,
                                            c4d_categories: response.c4d_categories,
                                            c4d_subcategories: response.c4d_subcategories,
                                            current_user: response.current_user,
                                            toolkit_articles: response.toolkit_articles,
                                            reference_links: response.reference_links,
                                            c4d_related_topics: response.c4d_related_topics,
                                            next_article: response.next_article,
                                            previous_article: response.previous_article })
        let header = c4d_article_header({ c4d_subcategories: response.c4d_subcategories, article: response.article, c4d_categories: response.c4d_categories })
        $('#c4d_article_show_modal .header').append(header)
        $('#c4d_article_show_modal .content').append(content)
        $('#c4d_article_show_modal').modal('show')
        _.forEach($('#c4d_article_show_modal #c4d_article_content img'), img => {
          $(img).addClass('img-responsive')
          $(img).css('height', 'auto')
        })

      })
    })
    function clearUrlState(){
      history.pushState(null, null, window.location.href.split('/').slice(0, -1).join('/') + '/')
    }
    function setUrlStateForArticleShow(article){
      let title = article.id + '-' + article.title.replace(new RegExp(' ', 'g'), '_')
      history.pushState(null, null, title)
    }
    function clearC4dModalText() {
      $('#c4d_article_show_modal .content').empty()
      $('#c4d_article_show_modal .header').empty()
    }
    function c4d_article_header(params) {
      return `
        <div id="c4d_article_show_header" class='row' style='background-color:${ params['c4d_subcategories'][params['article'].c4d_subcategory_id-1].color } ;'>
          <div id='c4d_category_and_article_title' class='col-md-12 text-center' style='background-color:${ params['c4d_subcategories'][params['article'].c4d_subcategory_id-1].color };'>${ params['article'].title }</div>
          <div id='c4d_close_icon' class='text-right'><a href=''>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></a></div>
        </div>`
    }
    function get_color_for_subcategory(article_subcategory){
      let special_categories = ['ID Your Scenario', 'Monitor Evaluate', 'Innovations']
      if (_.includes(special_categories, article_subcategory))
        return 'black'
      else
        return 'white'
      end
    }

    function c4d_article_content(params) {
      ga('send', { 'hitType': 'pageview', 'page': `/c4d_articles/${ params['article'].id }-${ params['article'].title }` })
      let category = params['c4d_categories'][params['article'].c4d_category_id - 1]
      return `
        <div id="c4d_article_show_page">
          <div id="c4d_article_show_info_column" class='col-md-3'>
            <div id="c4d_article_show_info_column_content">
              ${ getRelatedTopicsDiv(params['c4d_related_topics'], params['c4d_categories'], params['article']) }
              ${  category.title !== 'Tools' ? getReferenceLinksDiv(params) : '' }
            </div>
          </div>
          <div id='c4d_article_content_div' class='col-md-9' class='black_text'>
            ${ getAddToToolkitRow(params) }
            <div id='c4d_article_content'>
              ${ params['article'].content }
              ${ category.title === 'Tools' ? getC4dToolsReferenceLinks(params) : ''}
            </div>
            ${ getArticleCycleDiv(params) }
          </div>
        </div>`
    }

    function getArticleCycleDiv(params){
      return `<div id='article_cycle_div'>
                ${ _.isNull(params['previous_article']) ? '' : getPreviousArticleDiv(params) }
                ${ _.isNull(params['next_article']) ? '' : getNextArticleDiv(params) }
              </div>`
    }

    function getPreviousArticleDiv(params){
      return `<div id='prev_c4d_article'>
                <span>Previous Article:</span>
                <div>
                  <a href='/c4d_articles/${ params['previous_article'].id }' class='black_text'><i class="fa fa-arrow-left" aria-hidden="true"></i> ${ params['previous_article'].title }</a>
                </div>
              </div>`
    }

    function getNextArticleDiv(params){
      return `<div id='next_c4d_article'>
                <span>Next Article:</span>
                <div>
                  <a href='/c4d_articles/${ params['next_article'].id }' class='black_text'> ${ params['next_article'].title } <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                </div>
              </div>`
    }

    function getC4dToolsReferenceLinks(params){
      let reference_links = params['reference_links']
      let idx = 0
      let rows = ''
      let reference_link_order = ''
      reference_link_order = _.isNull(params['article'].reference_link_order) ? _.map(reference_links, link => { return link.id }) : params['article'].reference_link_order.split(' ')
      _.forEach(reference_link_order, id => {
        _.forEach(reference_links, reference_link => {
          if (reference_link.id === parseInt(id)){
            let reference_title = ''
            if (reference_link.title === '' || _.isNull(reference_link.title)){
              reference_title = _.replace(reference_link.document_file_name, new RegExp("_","g")," ")
              reference_title = _.replace(reference_title, new RegExp(".pdf","g"),"")
            } else {
              reference_title = reference_link.title
            }
            rows += `${ idx % 2 === 0 ? `<tr><div class='col-md-12'>` : '' }
                      <td>
                        <img class='tools_reference_link_pdf_icon' src="${_.replace(reference_link.absolute_url, new RegExp(".pdf","g"),".png")}">
                      </td>
                      <td class='tools_reference_link_description'>
                        <div class='col-md-12'>
                          <div class='col-md-12'>
                            <strong><a href="${ reference_link.absolute_url }" target='_blank'>${ reference_title }</a></strong>
                          </div>
                          <div class='col-md-12' style='height:8px'>
                          </div>
                          <div class='col-md-12'>
                            ${ _.isNull(reference_link.description) ? 'Description coming soon' : reference_link.description }
                          </div>
                        </div>
                      </td>
                    ${ idx % 2 === 1 ? `</div></tr>` : '' }`
            idx += 1
          }
        })
      })
      return `<table>
                ${rows}
              </table>`
    }

    function getAddToToolkitRow(params){
      return (
        `<div class='c4d_email_icon'>
          <a id='c4d_email_icon_link' href=''><i class="fa fa-envelope" aria-hidden="true"></i></a>
        </div>
        <div class='c4d_print_icon'>
          <a id='c4d_print_icon_link' href=''><i class="fa fa-print" aria-hidden="true"></i></a>
        </div>
        <div id="${ params['article'].id }" class='text-center'>
          <div id='c4d_add_to_toolkit_text'>ADD TO MY TOOLKIT</div>
        </div>
        <a id='${ params['article'].id }' class='c4d_grid_add' href='' style="${ c4d_style_visible('add', params['current_user'], params['article'], params['toolkit_articles']) };color:black;right:3px;" title='Add to toolkit' data-toggle='tooltip'><img id='add_article_image' src='/assets/icons/add-to.png'></a>
        <a id='${ params['article'].id }' class='c4d_grid_check' href='' style="${ c4d_style_visible('check', params['current_user'], params['article'], params['toolkit_articles']) };color:black;right:3px;" title='Remove from toolkit' data-toggle='tooltip'><img id='remove_article_image' src='/assets/icons/remove-check.png'></a>
        `)
    }
    function getRelatedTopicsDiv(related_topics, c4d_categories, current_article){
      let content = ''
      if (!_.isEmpty(related_topics)) {
        content = `
          <div class='row'>
            <div id='related_topics_header' class='row text-left'>
              <strong>JUMP TO:</strong>
            </div>
            <div id="related_topics_list"> ${_.map(related_topics, article => {
              return `<div id='related_topic_link_div' class='col-md-12'>
                        ${ article.title !== current_article.title ? getRelatedTopicLink(c4d_categories, article) : getCurrentArticleLink(current_article) }
                      </div>`
            }).join('\n')}
            </div>
          </div>`
      }
      return content
    }

    function getCurrentArticleLink(article){
      return `<div class='col-md-10'>
                <div id='current_article_div'>${ article.title }</div>
              </div>
              <div class='col-md-2 text-right'>
                <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
              </div>`
    }

    function getRelatedTopicLink(c4d_categories, article){
      return `<div class='col-md-10'>
                <a id='${ article.id }' href='/c4d/${c4d_categories[article.c4d_category_id - 1].title.toLowerCase()}/${ article.id }-${article.title.replace(new RegExp(' ', 'g'), '_')}' class="black_text">${ article.title }</a>
              </div>
              <div class='col-md-2'>
                <a id='${ article.id }' href='/c4d/${c4d_categories[article.c4d_category_id - 1].title.toLowerCase()}/${ article.id }-${article.title.replace(new RegExp(' ', 'g'), '_')}' class="black_text"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
              </div>`
    }
    function getReferenceLinksDiv(params){
      let reference_links = params['reference_links']
      let content = ""
      let hasReferenceLinks = !_.isEmpty(reference_links)
      if (hasReferenceLinks) {
        let rows = ''
        let reference_link_order = _.isNull(params['article'].reference_link_order) ? _.map(reference_links, link => { return link.id }) : params['article'].reference_link_order.split(' ')
        _.forEach(reference_link_order, id => {
          _.forEach(reference_links, reference_link => {
            if (reference_link.id === parseInt(id)){
              let reference_title = ''
              if (reference_link.title === '' || _.isNull(reference_link.title)){
                reference_title = _.replace(reference_link.document_file_name, new RegExp("_","g")," ")
                reference_title = _.replace(reference_title, new RegExp(".pdf","g"),"")
              } else {
                reference_title = reference_link.title
              }
              rows += `<div id='reference_link_row' class='row'>
                        <div class='col-md-2'>
                          <img class='reference_link_pdf_icon' src='${_.replace(reference_link.absolute_url, new RegExp(".pdf","g"),".png")}'>
                        </div>
                        <div id='reference_link_anchor_div' class='col-md-10'>
                          <strong><a class='reference_link_anchor' href="${ reference_link.absolute_url }" target='_blank'>&nbsp;${ reference_title }</a></strong>
                        </div>
                      </div>`
            }
          })
        })
        content = `
        <div class='row'>
          <div id='c4d_show_references'>
            <div id='reference_header_text_div' class='col-md-12'>
              <strong>REFERENCES:</strong>
            </div>
            ${rows}
          </div>
        </div>`
      }
      return content
    }

    function c4d_style_visible (icon, user, article, toolkit_articles) {
      let visibility_style = ''
      if (icon === 'add') {
        visibility_style = 'visibility:visible'
        if (!_.isNull(user)){
          _.forEach(toolkit_articles, check_list_article => {
            if (check_list_article.title === article.title)
              visibility_style = 'visibility:hidden'
          })
        }
        return visibility_style
      }
      else {
        visibility_style = 'visibility:hidden'
        if (!_.isNull(user)){
          _.forEach(toolkit_articles, check_list_article => {
            if (check_list_article.title === article.title)
              visibility_style = 'visibility:visible'
          })
        }
        return visibility_style
      }
    }

    $('#c4d_article_show_modal').on('click', 'a', e => {
      if ($(e.currentTarget).attr('href').indexOf('c4d_articles') !== -1) {
        e.preventDefault()
        let article_id = $(e.currentTarget).attr('href').substr($(e.currentTarget).attr('href').indexOf('c4d_articles')+13, $(e.currentTarget).attr('href').length)
        let target = { id: article_id}
        loadC4dArticle(target)
      }
    })


    $('#c4d_article_show_modal').on('click', '#c4d_print_icon_link', e => {
      e.preventDefault()
      $('#application').after($('#c4d_article_show_modal #c4d_article_content').html())
      $('#application').after($('#c4d_article_show_modal .header').html())
      $('#application').css({ display: 'none' })
      window.print()
      $('#application').nextAll().remove()
      $('#application').css({ display: 'block' })
    })
    $('#c4d_article_show_modal').on('click', '#c4d_email_icon_link', e => {
      e.preventDefault()
      window.location.href=`mailto:?subject=C4D Article: ${$('#c4d_category_and_article_title').html()}&body=Click <a href='${window.location.protocol + '//' + window.location.host}/c4d_articles/${$('#c4d_add_to_toolkit_text').parent().attr('id')}' target='_blank'>here</a> to view the shared article!`;
    })

    $('#c4d_article_show_modal').on('click', '#related_topics_list a', e => {
      e.preventDefault()
      loadC4dArticle(e.currentTarget)
      return false
    })

    function loadC4dArticle(target) {
      $.ajax({
        method: 'GET',
        url: '/c4d_articles/' + target.id
      }).done(response => {
        clearC4dModalText()
        setUrlStateForArticleShow(response.article)
        let content = c4d_article_content({ article: response.article,
                                            c4d_categories: response.c4d_categories,
                                            c4d_subcategories: response.c4d_subcategories,
                                            current_user: response.current_user,
                                            toolkit_articles: response.toolkit_articles,
                                            reference_links: response.reference_links,
                                            c4d_related_topics: response.c4d_related_topics,
                                            next_article: response.next_article,
                                            previous_article: response.previous_article })
        let header = c4d_article_header({ c4d_subcategories: response.c4d_subcategories, article: response.article, c4d_categories: response.c4d_categories })
        $('#c4d_article_show_modal .header').append(header)
        $('#c4d_article_show_modal .content').append(content)
        _.forEach($('#c4d_article_show_modal #c4d_article_content img'), img => {
          $(img).addClass('img-responsive')
          $(img).css('height', 'auto')
        })
      })
    }

    $('#c4d_toolkit_list').on('click', 'a', e => {
      e.preventDefault()
      loadC4dArticle(e.currentTarget.parentElement)
      $('#c4d_article_show_modal').modal('show')
      return false
    })
    $('#c4d_selection_page #c4d_subcategory_accordion').each((idx,div) => {
      $($(div).find('#c4d_subcategory_title_div')).click(e => {
        $(e.currentTarget).find('i').toggleClass('rotate_icon')
      })
    })

    if ($('#c4d_selection_page').css('visibility') === 'visible'){
      let offset = $('nav').outerHeight()
      $('#c4d_selection_page').offset({ top: offset })
    }

    if ($('#c4d_article_load_trigger_div').css('visibility') !== undefined) {
      var parent_element = $('#c4d_subcategory_accordion')
      var path_split = window.location.pathname.split('/')
      var path_split_length = window.location.pathname.split('/').length
      var article_id = path_split[path_split_length-1] === "" ? path_split[path_split_length-2] : path_split[path_split_length-1]
      // .replace(/([ #;&,.%+*~\':"!^$[\]()=>|\/])/g,'\\$1')
      article_id = article_id.split('-')[0]
      var element = '#c4d_selection_page #c4d_grid_tile_title ' + '#' + article_id
      history.pushState(null, null, $('#c4d_article_load_trigger_div div').attr('id'))
      $(element).trigger('click')
      $(element).parents('#c4d_subcategory_accordion').trigger('click')
    }
  }
})
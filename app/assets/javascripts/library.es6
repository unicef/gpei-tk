$(() => {
  function getSearchResultFilter(idx){
    if (idx <= 10) {
      return 1
    } else if (idx % 10 === 0) {
      return (idx / 10)
    } else {
      return Math.floor(idx / 10 + 1)
    }
  }

  let sortFlags = {
    relevance: true,
    publication: true,
    created: true,
    title: true,
    author: true,
    download: true,
    like: true
  }
  if ($('#library').css('visibility') === 'visible'){
    let search_grid = ''

    let offset = $('nav').outerHeight()
    $('#library').offset({ top: offset })
    let $featured_grid = $(`#library_index_content_featured_content_grid`)

    $featured_grid.isotope({
      itemSelector: `.featured_content_item`,
      layoutMode: 'masonryHorizontal',
      filter: '.featured_content_item_1'
    })

    $('#library_content_search_form').submit(e => {
      e.preventDefault()
      appendSpinnerLibModal()
      $('#library_index_content_popular_content_grid_wrapper').css('display', 'none')
      $('#library_index_content_popular_content_grid_wrapper_header').css('display', 'none')
      $('#library_index_content_popular_header_text').css('display', 'block')
      $('#library_search_select').css('display', 'block')
      $('#library_content_cell_progress_spinner').css('display', 'block')
      window.location.href = '/library/?' + $(e.currentTarget).serialize()
      // $.ajax({
      //   method: 'GET',
      //   url: '/library/reference_search/',
      //   data: $(e.currentTarget).serialize()
      // }).done(response => {
      //   if (response.status === 200){
      //     $('#library_reference_links_filtered_wrapper').empty()
      //     // referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
      //     $("#library_index_content_popular_header_text").text("Results:")
      //     loadDocumentCount(response.references.length)
      //     $('#library_content_cell_progress_spinner').css('display', 'none')
      //     // $('#library_content_modal .header').append(`<div class='col-md-10'>${response.category}</div><div class='library_content_modal_close col-md-2 text-right'><span style='cursor:pointer;'>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></span></div>`)
      //     $('#library_reference_links_filtered_wrapper').append(getSearchResultContent({ references: response.references, reference_links_data: response.reference_links_data, users: response.users, places: response.places, languages: response.languages, tags: response.tags, sopCount: response.sopCount, c4dCount: response.c4dCount }))
      //     loadSearchGridFilters(response)
      //     loadSearchGrid()
      //   }
      // })
    })

    // ######NEW LIBRARY CONTENT
    //
    //
    function loadDocumentCount(referenceCount) {
      var countText =`<span id="search_count_span"> ${referenceCount} <i class="fa fa-file-text-o"></i></span> <span id="search_count_text_span" style="font-weight:bold;color:black !important;">DOCUMENTS</span>`
      $('#library_document_count_wrapper').empty()
      $('#library_reference_count_wrapper').append(countText)
    }
    $('#library_content_modal').modal({
      allowMultiple: true,
      observeChanges: true,
      onHide: () => {
        $('#library_content_modal .content').empty()
        $('#library_content_modal .header').empty()
      }
    })
    let $lib_grid = $('#library_browse_isotope_grid').isotope({
      itemSelector: '.library_browse_grid_cell',
      filter: '.library_base_category',
      masonry: {
        // use element for option
        columnWidth: 5
      }
    })
    $('.library_browse_grid_cell').click(e => {
      if (!e.target.classList.contains('library_subcategory_cell') === true) {
        $lib_grid.isotope({ filter: $(e.target).attr('data-filter') })
      }
    })
    $('#library_browse_clear_all').click(e => {
      $('#library_reference_links_filtered_wrapper').empty()
      $('#library_index_content_popular_content_grid_wrapper').css('display', 'block')
      $('#library_index_content_popular_content_grid_wrapper_header').css('display', 'block')
      $('#library_index_content_popular_header_text').css('display', 'none')

      $('#library_browse_indicator_span').empty()
      $lib_grid.isotope({ filter: '.library_base_category' })
    })
    function appendSpinnerLibModal() {
      $('#library_content_modal .content').append(`<div id='library_content_cell_progress_spinner'>
                Loading resources...<i class="fa fa-spinner fa-spin fa-fw"></i>
              </div>`)
    }
    $('.library_subcategory_cell').click(e => {
      $('#library_index_content_popular_content_grid_wrapper').css('display', 'none')
      $('#library_index_content_popular_content_grid_wrapper_header').css('display', 'none')
      $('#library_index_content_popular_header_text').css('display', 'block')
      $('#library_search_select').css('display', 'block')
      $('#library_content_cell_progress_spinner').css('display', 'block')
      e.preventDefault()
      appendSpinnerLibModal()
      var subcategory_title = $(e.target).attr('data-filter')
      var category_title = $(e.target).attr('data-id')
      var category_show_title = _.capitalize(category_title.replace('.',''))
      // $('#library_browse_indicator_span').append(`<b>${category_show_title === 'C4d' || category_show_title == 'Sop' ? _.toUpper(category_show_title) : category_show_title } ${subcategory_title.replace('.', '')}</b>`)
      $.ajax({
        method: 'GET',
        url: '/library/reference_links/',
        data: { search: subcategory_title, category: category_title, tag: subcategory_title }
      }).done(response => {
        if (response.status === 200){
          $('#library_reference_links_filtered_wrapper').empty()
          $("#library_reference_count_wrapper").text("Results:")
          loadDocumentCount(response.references.length)
          $('#library_content_cell_progress_spinner').css('display', 'none')
          // $('#library_content_modal .header').append(`<div class='col-md-10'>${response.category}</div><div class='library_content_modal_close col-md-2 text-right'><span style='cursor:pointer;'>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></span></div>`)
          $('#library_reference_links_filtered_wrapper').append(getSearchResultContent({ references: response.references, reference_links_data: response.reference_links_data, users: response.users, places: response.places, languages: response.languages, tags: response.tags, sopCount: response.sopCount, c4dCount: response.c4dCount }))
          loadSearchGridFilters(response)
          $('#library_search_select').css('display', 'block')
          loadSearchGrid(response)
        }
        return false
      })
    })
    $('#application').on('change', '#search_grid_select_wrapper select', e => {
      var selectedValues = _.map($('#search_grid_select_wrapper option:selected'), function(el){
        if ($(el).val() !== "") {
          return "." + _.replace($(el).val(), new RegExp(" ","g"),"_");
        }
      })
      selectedValues = _.join(_.compact(selectedValues), "")
      search_grid.isotope({ filter: selectedValues })
      $('#library_reference_count_wrapper').text("")
      $('#library_search_select').css('display', 'block')
      $('#library_reference_count_wrapper').text("Results: ")
      var itemCount = $(search_grid).data('isotope').filteredItems.length
      loadDocumentCount(itemCount)
      var tagFilter = ""
      var placeFilter = ""
      var languageFilter = ""
      var fileTypeFilter = ""
      // filters[tag]=
      if ($('#application select[name="reference_links_theme"]').val() !== "") {
        tagFilter = `filters[tag]=${$('#application select[name="reference_links_theme"]').val()}&`
      }
      if ($('#application select[name="reference_links_language"]').val() !== "") {
        languageFilter = `filters[language]=${$('#application select[name="reference_links_language"]').val()}&`
      }
      if ($('#application select[name="reference_links_place"]').val() !== "") {
        placeFilter = `filters[place]=${$('#application select[name="reference_links_place"]').val()}&`
      }
      if ($('#application select[name="reference_links_file_type"]').val() !== "") {
        fileTypeFilter = `filters[file-type]=${$('#application select[name="reference_links_file_type"]').val()}`
      }
      var searchValue = $('#library_content_search_input').val()
      if (searchValue !== '') {
        searchValue = `search=${searchValue}&`
      }
      var pushState = "/library/?" + searchValue + tagFilter + languageFilter + placeFilter + fileTypeFilter 
      window.history.pushState("", "", pushState);
      return false
    })
    $('#application').on('change', '#search_grid_clear', e => {
      search_grid.isotope({ filter: "*" })
      return false
    })
    function loadSearchGridFilters(response) {
      var themes = `<select class='grid_filter_select' name="reference_links_theme"><option value='' selected="selected">Any Theme</option>${response.tags.map(tag => { 
        return `<option class='option_background_color' value="${tag[0].trim()}" ${response.parent_category === "" ? '' : (response.parent_category === 'tags' ? (tag[0] === response.category ? 'selected' : '') : '')}>${tag[0].trim()}</option>`}).join(' ')}</select>`
      var places = `<select class='grid_filter_select' name="reference_links_place"><option value='' selected="selected">Any Place</option>${response.places.map(place => { 
        return `<option class='option_background_color' value="${place[0].trim()}">${place[0].trim()}</option>`}).join(' ')}</select>`
      var languages = `<select class='grid_filter_select' name="reference_links_language"><option value='' selected="selected">Any Language</option>${response.languages.map(language => { 
        return `<option class='option_background_color' value="${language[0].trim()}">${language[0].trim()}</option>`}).join(' ')}</select>`
      var file_types = `<select class='grid_filter_select' name="reference_links_file_type"><option value='' selected="selected">Any File Type</option>${response.file_types.map(file_type => { 
        return `<option class='option_background_color' value="${file_type.trim()}">${file_type.trim()}</option>`}).join(' ')}</select>`
      // var fileTypes = `<div class='col-md-3'><select name="reference_links_place"><option selected="selected">Any Place</option>${response.tags.map(tag => { 
      //   return `<option value="${tag[0]}">${tag[0]}</option>`}).join(' ')}</select></div>`
      $('#library_search_filter_wrapper').empty()
      var filterContent = `<div class='col-md-12 search_query_indicator_div'>${_.isUndefined(response.query) ? '' : `<span id='search_query_indicator_div_header'>Current Search:</span> ${response.query}`}</div><div id='search_grid_select_wrapper'>${themes}${places}${languages}${file_types}</div><div id='search_parameter_select_dropdown'>
      <div class='black_text col-md-12 boldtext'>Sort Results By:</div>
        <select id='library_search_select'>
          <option value='relevance' selected='selected'>Relevance</option>
          <option value='like'>Popular</option>
          <option value='alphabetical'>Alphabetical</option>
          <option value='publicaion'>Publication Date</option>
        </select>
      </div>`
      $('#library_search_filter_wrapper').append(filterContent)
      return false
    }
    $('#application').on('change', '#library_search_select', e => {
      var selectValue = $(e.target).val()
      if (selectValue === 'alphabetical') {
        search_grid.isotope({ sortBy: 'alphabetical' })
      } else if (selectValue === 'relevance') {
        search_grid.isotope({ sortBy: 'relevance' })   
      } else if (selectValue === 'like') {
        search_grid.isotope({ sortBy: 'like' })   
      } else if (selectValue === 'publication') {
        search_grid.isotope({ sortBy: 'publication' })
      }
      search_grid.isotope({ sortAscending: sortFlags[selectValue] })
      if (selectValue !== 'relevance') {
        sortFlags[selectValue] = !sortFlags[selectValue]
      }
      return false
    })
    $('#application').on('click', '#library_start_button', e => {
      window.location = '/library'
    })
    $('#library_reference_count_wrapper').on('click', e => {
      // #initial_reference_count_div
      if ($('#library_reference_count_wrapper').has('#initial_reference_count_div').length > 0) {
        appendSpinnerLibModal()
        $('#library_index_content_popular_content_grid_wrapper').css('display', 'none')
        $('#library_index_content_popular_content_grid_wrapper_header').css('display', 'none')
        $('#library_index_content_popular_header_text').css('display', 'block')
        $('#library_search_select').css('display', 'block')
        $('#library_content_cell_progress_spinner').css('display', 'block')
        // $('#library_browse_indicator_span').append(`<b>${category_show_title === 'C4d' || category_show_title == 'Sop' ? _.toUpper(category_show_title) : category_show_title } ${subcategory_title.replace('.', '')}</b>`)
        $.ajax({
          method: 'GET',
          url: '/library/reference_links/',
          data: { search: '', category: 'all' }
        }).done(response => {
          if (response.status === 200){
            $('#library_reference_links_filtered_wrapper').empty()
            $("#library_reference_count_wrapper").text("Results:")
            loadDocumentCount(response.references.length)
            $('#library_content_cell_progress_spinner').css('display', 'none')
            // $('#library_content_modal .header').append(`<div class='col-md-10'>${response.category}</div><div class='library_content_modal_close col-md-2 text-right'><span style='cursor:pointer;'>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></span></div>`)
            $('#library_reference_links_filtered_wrapper').append(getSearchResultContent({ references: response.references, reference_links_data: response.reference_links_data, users: response.users, places: response.places, languages: response.languages, tags: response.tags, sopCount: response.sopCount, c4dCount: response.c4dCount }))
            loadSearchGridFilters(response)
            $('#library_search_select').css('display', 'block')
            loadSearchGrid(response)
          }
          return false
        })        
      }
    })
    $('.library_base_category').click(e => {
      if ($(e.target).attr('data-category') !== "c4d") {
        return false
      }
      e.preventDefault()
      appendSpinnerLibModal()
      $('#library_index_content_popular_content_grid_wrapper').css('display', 'none')
      $('#library_index_content_popular_content_grid_wrapper_header').css('display', 'none')
      $('#library_index_content_popular_header_text').css('display', 'block')
      $('#library_search_select').css('display', 'block')
      $('#library_content_cell_progress_spinner').css('display', 'block')
      // $('#library_browse_indicator_span').append(`<b>${category_show_title === 'C4d' || category_show_title == 'Sop' ? _.toUpper(category_show_title) : category_show_title } ${subcategory_title.replace('.', '')}</b>`)
      $.ajax({
        method: 'GET',
        url: '/library/reference_links/',
        data: { search: '', category: 'c4d' }
      }).done(response => {
        if (response.status === 200){
          $('#library_reference_links_filtered_wrapper').empty()
          $("#library_reference_count_wrapper").text("Results:")
          loadDocumentCount(response.references.length)
          $('#library_content_cell_progress_spinner').css('display', 'none')
          // $('#library_content_modal .header').append(`<div class='col-md-10'>${response.category}</div><div class='library_content_modal_close col-md-2 text-right'><span style='cursor:pointer;'>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></span></div>`)
          $('#library_reference_links_filtered_wrapper').append(getSearchResultContent({ references: response.references, reference_links_data: response.reference_links_data, users: response.users, places: response.places, languages: response.languages, tags: response.tags, sopCount: response.sopCount, c4dCount: response.c4dCount }))
          loadSearchGridFilters(response)
          $('#library_search_select').css('display', 'block')
          loadSearchGrid(response)
        }
        return false
      })
    })

    $('#application').on('click', '.library_content_modal_close', e => {
      $('#library_content_modal').modal('hide')
      return false
    })
    //

    function loadSearchGrid(response) {
      var itemSelector = '.search_content_item'
      if (!_.isUndefined(response.parent_category)) {
        if (response.parent_category === 'tags') {
          itemSelector = "." + _.join(_.split(response.category, " "), "_")
        }
      }
      search_grid = $(`#application #library_content_search_results_grid`)
      search_grid.isotope({
        itemSelector: itemSelector,
        getSortData: {
          relevance:  function (ele) {
            return parseInt(_.trim($(ele).find('#search_content_relevance').text()))
          },
          like:  function (ele) {
            return parseInt(_.trim($(ele).find('#search_like_count_div').attr('data-likes')))
          },
          publication: function (ele) {
            return parseInt($(ele).find('#publication_year').text())
          },
          alphabetical: function (ele) {
            return _.lowerCase(_.trim($(ele).find('#search_content_title_text a').text()))
          }
        }
      })
        //       getSortData: {
        //   relevance: function (ele) {
        //     return parseInt($(ele).find('#search_content_relevance').text())
        //   },
        //   created: function (ele) {
        //     return (Date.parse(_.trim($(ele).find('#search_content_created_at').text())))
        //   },
        //   title: function (ele) {
        //     return _.lowerCase(_.trim($(ele).find('#search_content_title_text a').text()))
        //   },
        //   author: function (ele) {
        //     return _.trim($(ele).find('#search_content_author').text())
        //   },
        //   download: function (ele) {
        //     return parseInt($(ele).find('#library_download_div .counter_indicator_text_div').text())
        //   },
        //   like: function (ele) {
        //     return parseInt($(ele).find('#library_like_div .counter_indicator_text_div').text())
        //   }
        // }

    }
    function getPaginator(references, reference_links_data, type_name){
      return `<div id='${type_name}_paginator_div' class='col-md-5'>
                ${references.length > 10 ? getResultsPaginator({ references: references, type_name: type_name }) : ''}
              </div>`
    }

    function getSearchResultsFilter(args){
      return `<div id='search_filter_row' class='col-md-12'>
                <div id="search_filter_dropdown" class="ui dropdown col-md-3">
                  <div id="" class="">
                    <span class='filter_header_text'><i class="fa fa-angle-down" aria-hidden="true"></i> SELECT FILTERS</span>
                  </div>
                  <div id='search_filter_dropdown_menu' class="menu">
                    <div id='' class="item col-md-12">
                      <div id='' class='col-md-4'>
                        <div class='search_filter_header'>
                          THEME
                        </div>
                        <div id='theme_checkboxes' class=''>
                          <ul class='list-unstyled'>
                            ${ args['c4dCount'] > 0 ?
                            `<li>
                              <input class='check_box' id='C4D' type='checkbox' value=".C4D">
                              <label for='C4D'>C4D <span class='filter_label_count'></span></label>
                            </li>` : ''
                            }
                            ${ args['sopCount'] > 0 ?
                            `<li>
                              <input class='check_box' id='SOP' type='checkbox' value=".SOP">
                              <label for='SOP'>SOP <span class='filter_label_count'></span></label>
                            </li>` : ''
                            }
                            ${ args['tags'].map(tag => {
                                return `<li>
                                          <input class='check_box' id='${ _.replace(tag[0], new RegExp(" ","g"),"_") }' type='checkbox' value=".${ tag[0] }">
                                          <label for='${ tag[0] }'>${ tag[0] } <span class='filter_label_count'></span></label>
                                        </li>`
                              }).join(' ')}
                          </ul>
                        </div>
                      </div>
                      <div id='' class='col-md-4'>
                        <div class='border_left_and_right search_filter_header'>
                          PLACE
                        </div>
                        <div id='place_checkboxes' class='border_left_and_right_gold'>
                          <ul class='list-unstyled'>
                            ${ args['places'].map(place => {
                              return `<li>
                                        <input class='check_box' id='${ _.replace(place[0], new RegExp(" ","g"),"_") }' type='checkbox' value=".${ place[0] }">
                                        <label for='${ place[0] }'>${ place[0] } <span class='filter_label_count'></span></label>
                                      </li>`
                            }).join(' ')}
                          </ul>
                        </div>
                      </div>
                      <div id='' class='col-md-4'>
                        <div class='search_filter_header'>
                          LANGUAGE
                        </div>
                        <div id='language_checkboxes' class=''>
                          <ul class='list-unstyled'>
                            ${ args['languages'].map(language => {
                              return `<li>
                                        <input class='check_box' id='${ _.replace(language[0], new RegExp(" ","g"),"_") }' type='checkbox' value=".${ language[0] }">
                                        <label for='${ language[0] }'>${ language[0] } <span class='filter_label_count'></span></label>
                                      </li>`
                            }).join(' ')}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='search_filter_clear_all' class='col-md-2 text-right'>
                  <a href=''>        Clear All</a>
                </div>
                <div id='search_filter_display_div' class='col-md-8'>
                </div>

              </div>`
    }
//                 ${ getSearchResultsSort()}
    function getSearchResultContent(args){
      // ${args['references'].length > 0 ? getSearchResultsFilter({ places: args['places'], tags: args['tags'], languages: args['languages'], sopCount: args['sopCount'], c4dCount: args['c4dCount'] }) : ''}
      return `${args['references'].length > 10  ? `<div id='search_results_header_wrapper' class='col-md-12'>
                <div id='library_index_content_search_results_header_text' class='col-md-3'>
                </div>
              </div>` : ''}
              <div class='col-md-12'>
                <div id='library_content_search_results_grid'>
                  ${getSearchResultRows(args['references'], args['reference_links_data'], args['users'])}
                </div>
              </div>
              <div id='search_results_border' class='div_border_underline col-md-12'></div>
              </div>
              `
    }
    // <div id='search_pagination_controls_wrapper' class='col-md-12'>
    //             ${args['references'].length > 10 ? getPaginator(args['references'], args['reference_links_data'], 'search') : ''}
    //           </div>



    function getSearchResultsSort(){
      return `<div id='search_sort_wrapper' class='col-md-offset-6 col-md-2'>

                <div class="ui compact menu">
                  <div class="ui simple dropdown item">
                    <span id='sort_search_dropdown_header'>SORT RESULTS</span>
                    <i class="dropdown icon"></i>
                    <div id='search_sort_radio_div' class="menu">
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" checked="checked" data-filter='relevance'>
                          <label>Relevance</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='title'>
                          <label>Title</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='download'>
                          <label>Downloads</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='like'>
                          <label>Most liked</label>
                        </div>
                      </div>
                      <div class="field item">
                        <div class="ui radio checkbox">
                          <input type="radio" name="sort_search" data-filter='created'>
                          <label>Date uploaded</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
    }

    function getResultsPaginator(args) {
      return `<div id='${args['type_name']}_paginator_left_angle' class=''><a href=''><i class='fa fa-angle-left fa-2x' aria-hidden='true'></i></a></div>
              <div id='' class='inline_block ${args['type_name']}_paginator_page_numbers'>${getPaginatorPageNumbers(args['references'], args['type_name'])}</div>
              <div id='${args['type_name']}_paginator_right_angle' class=''><a href=''><i id='${ getPaginatorLastPageNumber(args['references'].length) }' class='fa fa-angle-right fa-2x' aria-hidden='true'></i></a></div>`
    }

    function getPaginatorLastPageNumber(item_count) {
      let divided_idx = item_count / 10
      let modulus_idx = item_count % 10
      return (divided_idx >= 1 ? (parseInt(Math.floor(divided_idx)) + (modulus_idx === 0 ? 0 : 1 )) :  1)
    }

    function getPaginatorPageNumbers(items, type_name) {
      let item_idx = 0
      let last_idx = items.length
      return `${items.map(item => {
                  item_idx += 1
                  return `${item_idx % 10 === 0 || item_idx === last_idx ? `<div class='library_${type_name}_pagination_indicators ${item_idx === 10 ? 'active' : ''}'>${`<a id='${ getPaginatorIdNumber(item_idx, last_idx) }' href='' class='max_width'>${getPaginatorIdNumber(item_idx, last_idx)}</a>`}</div>` : ''}`
                }).join('')}`
    }

    function getPaginatorIdNumber(item_idx, last_idx){
      return `${item_idx === last_idx && item_idx % 10 !== 0 ? Math.floor(item_idx / 10 + 1) : Math.floor(item_idx / 10)}`
    }

    function loadIsotopeHandlers(type){
      // $('#CMS_index_content #cms_reference_link_filter_dropdown').dropdown({
      //   on: 'hover',
      //   action: 'nothing',
      //   transition: 'horizontal flip'
      // })
      $(`#application #library_content_search_results_grid`).isotope({
        itemSelector: `.reference_search_result_item`
      })
      // ,
      //   getSortData: {
      //     updatedSort: function (ele) {
      //       return Date.parse($(ele).find('#updated_at_div').text()) * (updatedSortFlow ? -1 : 1)
      //     },
      //     createdSort: function (ele) {
      //       return (Date.parse($(ele).find('#created_at_div').text())) * (createdSortFlow ? -1 : 1)
      //     }
      //   }

      // $('.filter-button-group').on('click', 'button', function() {
      //   var filterValue = $(this).attr('data-filter')
      //   // use filter function if value matches
      //   $(`#CMS_index_content #cms_reference_grid`).isotope({ filter: filterValue })
      // })
      // $('.button-group').each( function( i, buttonGroup ) {
      //   var $buttonGroup = $( buttonGroup )
      //   $buttonGroup.on( 'click', 'button', function() {
      //     $buttonGroup.find('.is-checked').removeClass('is-checked')
      //     $( this ).addClass('is-checked')
      //   })
      // })
    }

    function getSearchResultRows(references, reference_links_data, users){
      let idx = -1
      let last_idx = references.length - 1
      if (references.length === 0){
        return `<div class='col-md-12 search_content_item pagination_search_content_item_1' style='padding-left:5px;'><h3>No Results</h3></div>`
      }
      return `${references.map(reference_obj => {
        idx += 1
        return `<div id='${idx + 1}' class='col-md-12 ${ (_.isUndefined(reference_obj.file_type) ? '' : reference_obj.file_type.title) } ${reference_links_data[reference_obj.id].isSOP ? 'SOP' : ''} ${reference_links_data[reference_obj.id].isC4D ? 'C4D' : ''} ${ reference_obj['tags'] === undefined ? '' : reference_obj['tags'].map(tag => { return _.replace(tag.title, new RegExp(" ","g"), "_") }).join(' ') } ${ reference_obj['places'] === undefined ? '' : reference_obj['places'].map(place => { return _.replace(place.title, new RegExp(" ","g"), "_") }).join(' ') } ${ reference_obj['languages'] === undefined ? '' : reference_obj['languages'].map(language => { return _.replace(language.title, new RegExp(" ","g"), "_") }).join(' ') } search_content_item pagination_search_content_item_${ getSearchResultFilter(idx+1) } ${ idx === 0 ? 'active' : '' }'>
                  <div class='col-md-1'>
                    ${ reference_obj.is_video ? getThumbnailVideo.bind(reference_obj)() : getThumbnailImage.bind(reference_obj)() }
                  </div>
                  <div id='search_content_filter_div' class='display_none'>
                    <div id='search_content_relevance'>
                      ${ idx }
                    </div>
                    <div id='search_content_author'>
                      ${ users[reference_obj.author_id].first_name }
                    </div>
                    <div id='search_content_created_at'>
                      ${ reference_obj.created_at }
                    </div>
                  </div>
                  <div id='search_content_item_info_wrapper' class='col-md-11'>
                    <div id='search_content_title_text' class='col-md-12'>
                      <a id='${ reference_obj.id }' href="${ reference_obj.is_video ? reference_obj.video_url : reference_obj.absolute_url }" target='_blank' class='reference_download_tracker'>${ reference_obj.title ? reference_obj.title : _.replace(_.replace(reference_obj.document_file_name, new RegExp("_","g"), " "), new RegExp(".pdf","g"), "") }</a>
                    </div>
                    <div id='search_like_count_div' class='display_none' data-likes='${reference_obj.like_count}'></div>
                    <div id='like_and_download_wrapper' class='col-md-2'>
                      <div id='library_download_div' class='inline_block'>
                        <a id='${ reference_obj.id }' href="${ reference_obj.is_video ? reference_obj.video_url : reference_obj.absolute_url }" target='_blank' class='inline_block library_download_img reference_download_tracker'>
                          <img src='/assets/icons/icon-download2x.png' class='library_grid_icon'>
                        </a>
                        <div class='counter_indicator_text_div inline_block'>${ _.isNull(reference_obj['download_count']) ? '0' : reference_obj['download_count'] }</div>
                      </div>
                      <div id='library_like_div' class='inline_block ${ reference_links_data[reference_obj.id]['liked_by_user'] ? 'like_by_user_div' : '' }'>
                        <a id='${ reference_obj.id }' href='' class='inline_block library_like_img reference_like_tracker'>
                          <img src='${ reference_links_data[reference_obj.id]['liked_by_user'] ? '/assets/icons/icon-like-white-2x.png' : '/assets/icons/icon-like-grey2x.png' }' class='library_grid_icon'>
                        </a>
                        <div class='counter_indicator_text_div inline_block ${reference_links_data[reference_obj.id]['liked_by_user'] ? 'liked_by_user_white_text' : ''}'>${ _.isNull(reference_obj['like_count']) ? '0' : reference_obj['like_count'] }</div>
                      </div>
                    </div>
                    <div class='col-md-7'>
                      <div id='download_related_topics_div' class='bold_text col-md-3'>${ reference_obj.is_video ? 'VIEW' : 'DOWNLOAD' }</div>
                      <div class='col-md-3 langauage_indicator_wrapper'>
                        <a id='${ reference_obj.id }' href="${ reference_obj.is_video ? reference_obj.video_url : reference_obj.absolute_url }" target='_blank' class='reference_download_tracker'><div class='reference_search_result_info_language '>${ _.upperCase(!_.isEmpty(reference_obj.document_language) ? reference_obj.document_language : reference_obj.language) }</div> ${ reference_obj.is_video ? 'MOV' : ('PDF ' + convertBytesToKbOrMb(reference_obj.document_file_size)) }</a>
                      </div>
                      ${ reference_obj['publication_year'] === '' ? '' : `<div class="col-md-6"><span class="bold_text">Publication Date:</span> <span id="publication_year">${ reference_obj['publication_year'] }</span></div>` }
                    </div>
                    <div id='catalogue_wrapper' class='col-md-3 text-right'>
                      ${ reference_links_data[reference_obj.id]['isC4D'] ? "<div class='inline_block reference_search_result_is_c4d bold_text'>C4D </div>" : '' }
                      ${ reference_links_data[reference_obj.id]['isSOP'] ? "<div class='inline_block reference_search_result_is_sop bold_text'>SOP</div>" : '' }
                    </div>
                    <div id='library_search_reference_link_description' class='col-md-9'>
                      ${ !_.isNull(reference_obj.description) ? reference_obj.description : '' }
                    </div>
                    <div id='library_search_reference_link_related_topics' class='col-md-3  ${reference_obj.related_topics.length > 0 ? 'border_left': ''}'>
                      ${ reference_obj.related_topics.length > 0 ? getReferenceRelatedTopics(reference_obj.related_topics) : ''}
                    </div>
                  </div>
                  <div class='one_px_border_bottom col-md-12'>
                  </div>
                </div>`
          }).join('')
        }`
    }
    function getReferenceRelatedTopics(references){
      return `<div class='col-md-12' class='bold_underline'>Related topics:</div>${references.map(reference_obj => {
        return `<div class='col-md-12'>
                  <a id="${reference_obj.id}" href="${ reference_obj.is_video ? reference_obj.video_url : reference_obj.absolute_url }" target='_blank' class='reference_download_tracker'>- ${ reference_obj.title ? reference_obj.title : _.replace(_.replace(reference_obj.document_file_name, new RegExp("_","g"), " "), new RegExp(".pdf","g"), "") }</a>
                </div>`
      }).join('')}`
    }
    function getThumbnailVideo(){
      return `<div class='col-md-12'>
                <iframe src="${ _.replace(this.video_url, new RegExp("https://vimeo.com/","g"), "https://player.vimeo.com/video/") }" width="97%" height="auto" frameborder="0"></iframe>
              </div>`
    }
    function getThumbnailImage(){
      return `<a id='${ this.id }' href="${ this.absolute_url }" target='_blank' class='reference_download_tracker'><img id='search_content_item_image' src="${ _.replace(this.absolute_url, new RegExp("pdf","g"), "png") }" class='img-responsive'></a>`
    }

    function convertBytesToKbOrMb(bytes){
      let conversion = 0
      if (bytes > 1048576) {
        conversion = (bytes / 1048576).toFixed(1) + ' MB'
      } else {
        conversion = (bytes / 1024).toFixed(1) + ' KB'
      }
      return conversion
    }

    function getSearchReferenceIcon(reference_obj){
      let img_url = ''
      if (reference_obj.type === 'Reference link'){
        img_url = `<img class='img-responsive' src="${_.replace(reference_obj.reference.absolute_url, new RegExp(".pdf","g"),".png")}">`
      }
      else if (reference_obj.type === 'Reference mp3'){
        img_url = `<img class='img-responsive' src="/assets/reference_icons/icon-doc-mp3.png">`
      }
      else if (reference_obj.type === 'Reference pptx'){
        img_url = `<img class='img-responsive' src="/assets/reference_icons/icon-doc-ppt.png">`
      }
      return img_url
    }
    $('.library_featured_pagination_indicators a').click(e => {
      e.preventDefault()
      let id = e.currentTarget.id
      $('.library_featured_pagination_indicators.active').removeClass('active')
      $(e.currentTarget.parentElement).addClass('active')
      $featured_grid.isotope({ filter: `.featured_content_item_${id}`})
      return false
    })

    $('.library_featured_pagination_indicators').click(e => {
      e.preventDefault()
      let id = $(e.currentTarget).find('a').attr('id')
      $('.library_featured_pagination_indicators.active').removeClass('active')
      $(e.currentTarget).addClass('active')
      $featured_grid.isotope({ filter: `.featured_content_item_${id}`})
      return false
    })

    $('#library').on('click', '.library_search_pagination_indicators a', e => {
      e.preventDefault()
      let id = e.currentTarget.id
      $('.library_search_pagination_indicators.active').removeClass('active')
      $(e.currentTarget.parentElement).addClass('active')
      search_grid.isotope({ filter: `.pagination_search_content_item_${id}`})
      return false
    })

    $('#library').on('click', '.library_search_pagination_indicators', e => {
      e.preventDefault()
      let id = $(e.currentTarget).find('a').attr('id')
      $('.library_search_pagination_indicators.active').removeClass('active')
      $(e.currentTarget).addClass('active')
      search_grid.isotope({ filter: `.pagination_search_content_item_${id}`})
      return false
    })

    $('#library').on('click', '#featured_pagination_left_angle_div a', e => {
      e.preventDefault()
      let id = parseInt($('.library_featured_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#featured_pagination_right_angle_div a i').attr('id'))
      if (id !== 1){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${id-1}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${id-1}`})
      } else if (id === 1){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${max_id}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${max_id}`})
      }
      return false
    })

    $('#library').on('click', '#featured_pagination_right_angle_div a', e => {
      e.preventDefault()
      let id = parseInt($('.library_featured_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#featured_pagination_right_angle_div a i').attr('id'))
      if (id !== max_id){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #${id+1}`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_${id+1}`})
      } else if (id === max_id){
        $('.library_featured_pagination_indicators.active').removeClass('active')
        $(`.library_featured_pagination_indicators #1`).parent().addClass('active')
        $featured_grid.isotope({ filter: `.featured_content_item_1`})
      }
      return false
    })

    $('#library').on('click', '#search_paginator_left_angle a', e => {
      e.preventDefault()
      let id = parseInt($('.library_search_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#search_paginator_right_angle a i').attr('id'))
      if (id !== 1){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${id-1}`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_${id-1}`})
      } else if (id === 1){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${max_id}`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_${max_id}`})
      }
      return false
    })

    $('#library').on('click', '#search_paginator_right_angle a', e => {
      e.preventDefault()
      let id = parseInt($('.library_search_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#search_paginator_right_angle a i').attr('id'))
      if (id !== max_id){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #${id+1}`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_${id+1}`})
      } else if (id === max_id){
        $('#library .library_search_pagination_indicators.active').removeClass('active')
        $(`#library .library_search_pagination_indicators #1`).parent().addClass('active')
        search_grid.isotope({ filter: `.pagination_search_content_item_1`})
      }
      return false
    })

    $(window).load(() => {
      $featured_grid.isotope({filter: '.active'})
      $('#browse_filter_dropdown').dropdown({
        on:'hover',
        action:'nothing'
      })
      _.forEach($('.featured_content_item'), content_item => {
        $(content_item).css('visibility', 'visible')
      })
      if (!!document.getElementById('library_show_reference_links')) {
        var category = document.getElementById("library_show_reference_links").className
        var search = $('#library_show_reference_links').text()
        $('#library_content_cell_progress_spinner').css('display', 'block')
        $('#library_index_content_popular_content_grid_wrapper_header').css('display', 'none')
        var url = new URL(window.location.href)
        var tag = url.searchParams.get("tag")
        if (tag === null) {
          tag = url.searchParams.get("search")
        }
        $.ajax({
          method: 'GET',
          url: '/library/reference_links/',
          data: { search: search, category: category, tag: tag }
        }).done(response => {
          if (response.status === 200){
            $('#library_reference_links_filtered_wrapper').empty()
            $("#library_reference_count_wrapper").text("Results:")
            loadDocumentCount(response.references.length)
            $('#library_content_cell_progress_spinner').css('display', 'none')
            // $('#library_content_modal .header').append(`<div class='col-md-10'>${response.category}</div><div class='library_content_modal_close col-md-2 text-right'><span style='cursor:pointer;'>CLOSE&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></span></div>`)
            $('#library_reference_links_filtered_wrapper').append(getSearchResultContent({ references: response.references, reference_links_data: response.reference_links_data, users: response.users, places: response.places, languages: response.languages, tags: response.tags, sopCount: response.sopCount, c4dCount: response.c4dCount }))
            loadSearchGridFilters(response)
            $('#library_search_select').css('display', 'block')
            loadSearchGrid(response)
            setTimeout(function() {
              if (!!document.getElementById('library_show_reference_links')) {
                var tag = $(document.getElementById('library_show_reference_links')).attr('data-tag')
                var language = $(document.getElementById('library_show_reference_links')).attr('data-language')
                var place = $(document.getElementById('library_show_reference_links')).attr('data-place')
                var fileType = $(document.getElementById('library_show_reference_links')).attr('data-file-type')
                var tags = $('#application select[name="reference_links_theme"] option')
                var languages = $('#application select[name="reference_links_language"] option')
                var places = $('#application select[name="reference_links_place"] option')
                var fileTypes = $('#application select[name="reference_links_file_type"] option')
                for (var i = 0; i < tags.length; i++) {
                  if ($(tags[i]).val().trim() === tag) {
                    $('#application select[name="reference_links_theme"]').val(tag)    
                  }
                }
                for (var i = 0; i < languages.length; i++) {
                  if ($(languages[i]).val().trim() === language) {
                    $('#application select[name="reference_links_language"]').val(language)
                  }
                }
                for (var i = 0; i < places.length; i++) {
                  if ($(places[i]).val().trim() === place) {
                    $('#application select[name="reference_links_place"]').val(place)
                  }
                }
                for (var i = 0; i < fileTypes.length; i++) {
                  if ($(fileTypes[i]).val().trim() === fileType) {
                    $('#application select[name="reference_links_file_type"]').val(fileType)
                  }
                }
              }
              var selectedValues = _.map($('#search_grid_select_wrapper option:selected'), function(el){
                if ($(el).val() !== "") {
                  return "." + _.replace($(el).val(), new RegExp(" ","g"),"_");
                }
              })
              selectedValues = _.join(_.compact(selectedValues), "")
              search_grid.isotope({ filter: selectedValues })
              $('#library_index_content_popular_header_text').text("")
              $('#library_search_select').css('display', 'block')
              $('#library_reference_count_wrapper').text("Results: ")
              $('#library_index_content_popular_content_grid_wrapper').css('display', 'none')
              $('#library_index_content_popular_header_text').css('display', 'block')
              var itemCount = $(search_grid).data('isotope').filteredItems.length
              $("#library_reference_count_wrapper").text("Results:")
              loadDocumentCount(itemCount)

            }, 500);
          }
          return false
        })
      } else if (!document.getElementById('active_browse_filters')) {
        // loadBrowseGrid()
      }
      else {
        activateFiltersInBrowseGrid()
      }
    })

    function activateFiltersInBrowseGrid(){
      let filters = $('#active_browse_filters div')[0].textContent
      $(browse_grid).isotope({ filter: filters })
      _.forEach(filters.split('.').splice(1), filter => {
        let ele = $('#browse_filter_dropdown_parent').find(`input[value=".${filter}"]`)
        ele.prop('checked', true)
        browseFilterDisplayUpdate(ele[0])
      })
      updatePaginationIndicators({ filteredItems: $(browse_grid).data('isotope').filteredItems, type_name: 'browse' })
      updateFilteredItemClasses($(browse_grid).data('isotope').filteredItems)
      $(browse_grid).isotope({ filter: `.browse_content_item_1` })
    }

    function loadBrowseGrid(){
      browse_grid.isotope({
        itemSelector: `.browse_content_item`,
        layoutMode: 'masonryHorizontal',
        filter: '.browse_content_item_1',
        getSortData: {
          relevance: function (ele) {
            return parseInt($(ele).find('#browse_content_relevance').text())
          },
          created: function (ele) {
            return (Date.parse(_.trim($(ele).find('#browse_content_created_at').text())))
          },
          title: function (ele) {
            return _.lowerCase(_.trim($(ele).find('#popular_content_title_text a').text()))
          },
          author: function (ele) {
            return _.trim($(ele).find('#browse_content_author').text())
          },
          download: function (ele) {
            return parseInt($(ele).find('#library_download_div .counter_indicator_text_div').text())
          },
          like: function (ele) {
            return parseInt($(ele).find('#library_like_div .counter_indicator_text_div').text())
          }
        }
      })
    }

    $('#library_logo_text_link').click(e => {
      // e.preventDefault()
      // $('#library_index_content_featured').css('display', 'block')
      // $('#library_index_content_popular_downloads').css('display', 'block')
      // $('#library_content_search_results').empty()
      // $('#library_content_search_input').val('')
      // return false
    })
    $('#reference_link_show_modal').modal({
      allowMultiple: true,
      observeChanges: true,
      onHide: () => {
        history.back()
        $('#reference_link_show_modal .content').empty()
        $('#reference_link_show_modal .header').empty()
      }
    })
    // browse paginator clicks
    let browse_grid = $(`#library_index_content_popular_content_grid`)
    $('#library').on('click', '.library_browse_pagination_indicators a', e => {
      e.preventDefault()
      let id = e.currentTarget.id
      $('.library_browse_pagination_indicators.active').removeClass('active')
      $(e.currentTarget.parentElement).addClass('active')
      browse_grid.isotope({ filter: `.browse_content_item_${id}`})
      return false
    })

    $('#library').on('click', '.library_browse_pagination_indicators', e => {
      e.preventDefault()
      let id = $(e.currentTarget).find('a').attr('id')
      $('.library_browse_pagination_indicators.active').removeClass('active')
      $(e.currentTarget).addClass('active')
      browse_grid.isotope({ filter: `.browse_content_item_${id}`})
      return false
    })

    $('#library').on('click', '#browse_paginator_left_angle a', e => {
      e.preventDefault()
      let id = parseInt($('.library_browse_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#browse_paginator_right_angle a i').attr('id'))
      if (id !== 1){
        $('#library .library_browse_pagination_indicators.active').removeClass('active')
        $(`#library .library_browse_pagination_indicators #${id-1}`).parent().addClass('active')
        browse_grid.isotope({ filter: `.browse_content_item_${id-1}`})
      } else if (id === 1){
        $('#library .library_browse_pagination_indicators.active').removeClass('active')
        $(`#library .library_browse_pagination_indicators #${max_id}`).parent().addClass('active')
        browse_grid.isotope({ filter: `.browse_content_item_${max_id}`})
      }
      return false
    })

    $('#library').on('click', '#browse_paginator_right_angle a', e => {
      e.preventDefault()
      let id = parseInt($('.library_browse_pagination_indicators.active a').attr('id'))
      let max_id = parseInt($('#browse_paginator_right_angle a i').attr('id'))
      if (id !== max_id){
        $('#library .library_browse_pagination_indicators.active').removeClass('active')
        $(`#library .library_browse_pagination_indicators #${id+1}`).parent().addClass('active')
        browse_grid.isotope({ filter: `.browse_content_item_${id+1}`})
      } else if (id === max_id){
        $('#library .library_browse_pagination_indicators.active').removeClass('active')
        $(`#library .library_browse_pagination_indicators #1`).parent().addClass('active')
        browse_grid.isotope({ filter: `.browse_content_item_1`})
      }
      return false
    })
    $('#browse_sort_radio_div .ui.radio.checkbox').click(e => {
      let sortBy = $(e.currentTarget).find('input').attr('data-filter')

      browse_grid.isotope({ filter: '*' })
      browse_grid.isotope({
        sortAscending: sortFlags[sortBy]
      })
      browse_grid.isotope({ sortBy: sortBy })
      if ($(e.currentTarget).find('input').attr('data-filter') !== 'relevance'){
        sortFlags[sortBy] = !sortFlags[sortBy]
      }

      let idx = 0
      let sorted_grid_items = $(browse_grid).data('isotope').filteredItems
      _.forEach(sorted_grid_items, grid_item => {
        $(grid_item.element).removeClass (function (index, css) {
          return (css.match(/browse_content_item_\d+/) || []).join(' ')
        })
        $(grid_item.element).addClass(`browse_content_item_${getSearchResultFilter(idx+1)}`)
        idx +=1
      })
      let filter_value = '.browse_content_item_' + $('.library_browse_pagination_indicators.active a').attr('id')
      _.delay(() => {
        browse_grid.isotope({ filter: filter_value })
      }, 1000, 'later')
      return false
    })
    $('#application').on('click', '#search_sort_radio_div .ui.radio.checkbox', e => {
      let sortBy = $(e.currentTarget).find('input').attr('data-filter')
      search_grid.isotope({ filter: '*' })
      search_grid.isotope({
        sortAscending: sortFlags[sortBy]
      })
      search_grid.isotope({ sortBy: sortBy })
      sortFlags[sortBy] = !sortFlags[sortBy]
      let idx = 0
      let sorted_grid_items = $(search_grid).data('isotope').filteredItems
      _.forEach(sorted_grid_items, grid_item => {
        $(grid_item.element).removeClass (function (index, css) {
          return (css.match(/pagination_search_content_item_\d+/) || []).join(' ')
        })
        $(grid_item.element).addClass(`pagination_search_content_item_${getSearchResultFilter(idx+1)}`)
        idx +=1
      })
      let filter_value = `.pagination_search_content_item_${$('.library_search_pagination_indicators.active a').attr('id') === undefined ? '1' : $('.library_search_pagination_indicators.active a').attr('id')}`

      _.delay(() => {
        search_grid.isotope({ filter: filter_value })
      }, 1000, 'later')
      return false
    })

    $('#browse_filter_dropdown_menu input').change(e => {
      let filter_value = ''
      browseFilterDisplayUpdate(e.currentTarget)
      let theme_values = _.map($('#browse_filter_dropdown_menu #theme_checkboxes .check_box:checked'), input => { return _.trim($(input).val()).replace(new RegExp(' ', 'g'), '_') })
      let place_values = _.map($('#browse_filter_dropdown_menu #place_checkboxes .check_box:checked'), input => { return _.trim($(input).val()).replace(new RegExp(' ', 'g'), '_') })
      let language_values = _.map($('#browse_filter_dropdown_menu #language_checkboxes .check_box:checked'), input => { return _.trim($(input).val()).replace(new RegExp(' ', 'g'), '_') })
      filter_value = _.trim(theme_values.join('') + place_values.join('') + language_values.join(''))
      buildAndAppendUrlFilters({ themes: theme_values, places: place_values, languages: language_values })

      if (_.isEmpty(filter_value)) {
        updatePaginationIndicators({ filteredItems: $(browse_grid).data('isotope').items, type_name: 'browse' })
        updateFilteredItemClasses($(browse_grid).data('isotope').items)
        $(browse_grid).isotope({ filter: `.browse_content_item_${ $('.library_browse_pagination_indicators.active a').attr('id') === undefined ? '1' : $('.library_browse_pagination_indicators.active a').attr('id') }` })
      } else {
        $(browse_grid).isotope({ filter: filter_value })
        updatePaginationIndicators({ filteredItems: $(browse_grid).data('isotope').filteredItems, type_name: 'browse' })
        updateFilteredItemClasses($(browse_grid).data('isotope').filteredItems)
        $(browse_grid).isotope({ filter: `.browse_content_item_1` })
      }
    })

    function updateFilteredItemClasses(filtered_elements){
      let all_elements_with_filter = $('[class*="browse_content_item_"]')
      _.forEach(all_elements_with_filter, element => {
        let found_class_name = element.className.match(/browse_content_item_\d+/)[0]
        $(element).removeClass(found_class_name)
      })
      let idx = 1
      _.forEach(filtered_elements, element => {
        let class_name = 'browse_content_item_' + getSearchResultFilter(idx)
        $(element.element).addClass(class_name)
        idx++
      })
    }
    function updatePaginationIndicators(args) {
      var paginator = `${args['filteredItems'].length > 10 ? getResultsPaginator({ references: args['filteredItems'], type_name: args['type_name'] }) : ''}`
      $(`#${args['type_name']}_paginator_div`).html(paginator)
    }
    function browseFilterDisplayUpdate(ele){
      if(ele.checked){
        $('#browse_filter_display_div').append(`<div id="${ele.id}" class='inline_block padding_left_2px'>${ele.id.replace(new RegExp('_', 'g'), ' ')}</div`)
      } else {
        $('#browse_filter_display_div').find(`#${ele.id}`).remove()
      }
    }
    function buildAndAppendUrlFilters(args){
      let filter_url = '/library/'
      if ((!_.isEmpty(args['themes']) || !_.isEmpty(args['places']) || !_.isEmpty(args['languages']))){
        filter_url = '?' + _.concat(args['themes'], args['places'], args['languages']).map(filter => { return `filters[]=${filter}`}).join('&')
      }
      history.replaceState(null, null, filter_url)
    }

    $('#browse_filter_clear_all a').click(e => {
      e.preventDefault()
      _.forEach($('#browse_filter_dropdown_menu .check_box'), check_box => {
        check_box.checked = false
      })
      sortFlags['download'] = false
      updateFilteredItemClasses($(browse_grid).data('isotope').items)
      updatePaginationIndicators({ filteredItems: $(browse_grid).data('isotope').items, type_name: 'browse' })
      $('#browse_filter_display_div').empty()
      // history.replaceState(null, null, '/library/')
      // $('#browse_sort_radio_div input[data-filter=download]').trigger('click')
      return false
    })

    $('#application').on('change', '#search_filter_dropdown_menu input', e => {
      let filter_value = _.map($('#search_filter_dropdown_menu .check_box:checked'), input => { return $(input).val() }).join(', ')
      // [[],[],[]]
      // let filter_value = ''
      if(e.currentTarget.checked){
        $('#application #search_filter_display_div').append(`<div id="${e.currentTarget.id}" class='inline_block padding_left_2px'>${e.currentTarget.id.replace(new RegExp('_', 'g'), ' ')}</div`)
      } else {
        $('#application #search_filter_display_div').find(`#${e.currentTarget.id}`).remove()
      }
      let theme_values = _.map($('#application #search_filter_dropdown_menu #theme_checkboxes .check_box:checked'), input => { return _.trim($(input).val()).replace(new RegExp(' ', 'g'), '_') })
      let place_values = _.map($('#application #search_filter_dropdown_menu #place_checkboxes .check_box:checked'), input => { return _.trim($(input).val()).replace(new RegExp(' ', 'g'), '_') })
      let language_values = _.map($('#application #search_filter_dropdown_menu #language_checkboxes .check_box:checked'), input => { return _.trim($(input).val()).replace(new RegExp(' ', 'g'), '_') })
      let file_type_values = _.map($('#application #search_filter_dropdown_menu #file_type_checkboxes .check_box:checked'), input => { return _.trim($(input).val()).replace(new RegExp(' ', 'g'), '_') })
      filter_value = _.trim(theme_values.join('') + place_values.join('') + language_values.join(''))
      if (_.isEmpty(filter_value)) {
        $('#application #search_pagination_controls_wrapper').css('display', 'block')
        $(search_grid).isotope({ filter: `${ $('.library_search_pagination_indicators.active a').attr('id') === undefined ? '.pagination_search_content_item_1' : `.pagination_search_content_item_${$('.library_search_pagination_indicators.active a').attr('id')}` }` })
      } else {
        $('#application #search_pagination_controls_wrapper').css('display', 'none')
        $(search_grid).isotope({ filter: filter_value })
      }
      // searchfilterchange
    })
    $('#application').on('click', '#search_filter_clear_all a', e => {
      e.preventDefault()
      _.forEach($('#application #search_filter_dropdown_menu .check_box'), check_box => {
        check_box.checked = false
      })
      $('#application #search_pagination_controls_wrapper').css('display', 'block')
      // $('#application #search_sort_radio_div input[data-filter=relevance]').trigger('click')
      $(search_grid).isotope({ filter: '.pagination_search_content_item_1' })
      $('#application #search_filter_display_div').empty()
      return false
    })

    // check if filter is overflowed
    function isOverflowed(element){
      // element.clientHeight
      // only checking for vertical overflow
      return element.scrollHeight > 350;
    }

    $('#overflow_filter_arrows #filter_down_arrows').click(e => {
      $('#overflow_filter_arrows #filter_up_arrows').removeClass('display_none')
      $('#overflow_filter_arrows #filter_down_arrows').addClass('display_none')
      $('#browse_filter_dropdown_parent').css('maxHeight', 'none')
      $('#browse_filter_dropdown_parent').css('overflow', 'visible')
    })
    $('#overflow_filter_arrows #filter_up_arrows').click(e => {
      $('#overflow_filter_arrows #filter_down_arrows').removeClass('display_none')
      $('#overflow_filter_arrows #filter_up_arrows').addClass('display_none')
      $('#browse_filter_dropdown_parent').css('maxHeight', '350px')
      $('#browse_filter_dropdown_parent').css('overflow', 'hidden')
    })
  }
})
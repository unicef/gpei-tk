$(() => {
  function centerFooterDiv(){
    if ($('#sop_selection_page').css('visibility') === 'visible' && ($('#gpei_footer_logo_div').css('visibility') === 'visible')){
      let container = $('#sop_selection_page')
      let outerpos = container.position().top + container.outerHeight(true) - $('#nav_bar').outerHeight(true)
      let imgpos = $('#gpei_footer_logo_div').position().top + $('#gpei_footer_logo_div').outerHeight(true)
      let offset = outerpos - imgpos
      // $('#gpei_footer_logo_div').css({ top: offset-65 })
    }
    if ($('#gpei_footer_overview_logo_div').css('visibility') === 'visible'){
      let container = $('#sop_selection_page')
      let outerpos = container.position().top + container.outerHeight(true) - $('#nav_bar').outerHeight(true)
      let imgpos = $('#gpei_footer_overview_logo_div').position().top + $('#gpei_footer_overview_logo_div').outerHeight(true)
      let offset = outerpos - imgpos
      $('#gpei_footer_overview_logo_div').css({ top: offset + 15 })
    }
    if ($('#c4d_selection_page').css('visibility') === 'visible'){
      let container = $('#c4d_selection_page')
      let outerpos = container.position().top + container.outerHeight(true) - $('#nav_bar').outerHeight(true)
      let imgpos = $('#gpei_footer_logo_div').position().top + $('#gpei_footer_logo_div').outerHeight(true)
      let offset = outerpos - imgpos
      $('#gpei_footer_logo_div').css({ top: offset-15 })
    }
  }
  centerFooterDiv()
})
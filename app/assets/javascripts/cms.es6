$(() => {
  $('.ui.styled.accordion')
  .accordion({
    selector: {
      trigger: '.title'
    }
  })

  $('#CMS_modal')
    .modal({
      onHide: () => {
        $('#CMS_modal .content').empty()
        $('#CMS_modal .header').empty()
      }
    })
})
$(() => {
  $('.ui.styled.accordion')
  .accordion({
    selector: {
      trigger: '.title'
    }
  })

  $('.ui.modal')
    .modal({
      onHide: () => {
        $('.ui.modal .content').empty()
        $('.ui.modal .header').empty()
      }
    })
})

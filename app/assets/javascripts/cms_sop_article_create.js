$(() => {
  $('#CMS_create_sop_article_link').click(e => {
    e.preventDefault();
    let sop_categories, sop_times, offices
    $.ajax({
      method: 'GET',
      url: 'api/sop_categories/'
    }).done(response => {
      sop_categories = response.sop_categories
      $.ajax({
        method: 'GET',
        url: 'api/sop_times/'
      }).done(response => {
        sop_times = response.sop_times
        $.ajax({
          method: 'GET',
          url: 'api/offices/'
        }).done(response => {
          offices = response.offices
          $('#CMS_index_content').empty();
          let content = getEmptySopArticleForm(sop_times, sop_categories, offices);
          $('#CMS_index_content').append(content);
        })
      })
    })
  })

  $('#CMS_index_content').on('submit', '#CMS_sop_article_form', e => {
    $.ajax({
      method: 'POST',
      url: 'cms/sop_articles/' + "?&authenticity_token=" + escape($('meta[name=csrf-token]').attr('content')),
      data: $('#CMS_sop_article_form').serialize()
    }).done(response => {
      $('.ui.dimmer').dimmer('show')
      $('#CMS_sop_articles_link').trigger('click')
      _.delay(() => {
        $('.ui.dimmer').dimmer('hide')
      }, 3000, 'later');
    })
  })

  function getEmptySopArticleForm(sop_times, sop_categories, offices){
    return (`
      <form id="CMS_sop_article_form" class="ui form CMS_sop_article_form_div">
        <div class="field">
          <label>CMS Title</label>
          <input type="text" name="cms_title" placeholder="CMS Title" value="" required>
        </div>
        ${getSopTimeDropdown("Time", "sop_time_id", sop_times)}
        ${getSopCategoryDropdown("Category", "sop_category_id", sop_categories)}
        <div class="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="Title" value="" required>
        </div>
        <div class="field">
          <label>Responsible</label>
          <input type="text" name="responsible" value="" required>
        </div>
        ${getOfficesDropdown("Office", "responsibility_id", offices)}
        <div class="field">
          <label>Support</label>
          <input type="text" name="support" value="" required>
        </div>
        <div class="field">
          <label>Article</label>
          <textarea name="article"></textarea>
        </div>
        <div class="field">
          <label>Video URL</label>
          <input type="text" name="video_url" value="">
        </div>
        <div class="field">
          <label>Template Links</label>
          <input type="text" name="template_links" value="">
        </div>
        <div class="field">
          <label>Reference Links</label>
          <input type="text" name="reference_links" value="">
        </div>
        <button class="ui button" type="submit">Submit</button>
      </form>
    `)
  }

  function getSopTimeDropdown(label, option_name, sop_times){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="${option_name}" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Time Period</option>
          ${_.map(sop_times, time => { return `<option value="${time.id}">${time.period}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }

  function getSopCategoryDropdown(label, option_name, sop_categories){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="${option_name}" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Category</option>
          ${_.map(sop_categories, category => { return `<option value="${category.id}">${category.title}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }

  function getOfficesDropdown(label, option_name, offices){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="${option_name}" class="ui dropdown cms_dropdown_select" required>
          <option value="">Select Office</option>
          ${_.map(offices, office => { return `<option value="${office.id}">${office.title}</option>` }).join('\n')}
        </select>
      </div>
      `)
  }
})
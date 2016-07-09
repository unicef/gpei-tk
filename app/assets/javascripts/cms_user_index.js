  $(() => {
  $('.ui.modal').on('click', '#modal_error_message_close', e => {
    e.preventDefault()
    $(e.currentTarget).closest('.message').transition('fade')
  })

  $('#CMS_users_link').click(e => {
    e.preventDefault()

    $.ajax({
      method: 'GET',
      url: '/cms/users/'
    }).done(response => {
      $('#CMS_index_content').empty()
      let table = '<table id="CMS_users_table" class="ui celled table"></table>'
      $('#CMS_index_content').append(table)
      let header = '<thead><tr><th class="text-center"> First Name </th><th class="text-center"> Last Name </th><th class="text-center"> Email </th><th class="text-center"> Role </th><th class="text-center"></th></tr></thead>'
      $('#CMS_users_table').prepend(header)
      _ .forEach(response.users, user => {
        let row = '<tr id="' + user.id + '">' + '<td>' + user.first_name + '</td>' + '<td>' + user.last_name + '</td>' + '<td>' + user.email + '</td>' + '<td>' + response.roles[user.role_id - 1].title + '</td>' + '<td>' + getUserActionDropdown(user.id) + '</td>' + '</tr>'
        $('#CMS_users_table').append(row)
      })
      $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
          action: 'hide',
          transition: 'drop'
      })
    })
  })

  function getUserActionDropdown(id){
    return (
      '<div class="ui buttons"><div id="CMS_actions_dropdown" class="ui button">Actions</div><div class="ui floating dropdown icon button"><i class="dropdown icon"></i><div class="menu"><div id="' + id + '" class="item"><span id="CMS_user_assign_role">Assign Roles</span></div><div id="' + id + '" class="item"><span id="CMS_user_delete_user">Delete User</span></div></div></div>'
    )
  }

  $('#CMS_index_content').on('click', '#CMS_user_delete_user', e => {
    $.ajax({
      method: 'DELETE',
      url: '/cms/users/' + e.currentTarget.parentElement.id,
      data: $(e.currentTarget).find('.ui.form').serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      let element = _.filter($('#CMS_users_table tr'), tr => {
        if (tr.id === response.id) {
          return tr
        }
      })
      $(element).empty()
    })
  })

  $('#CMS_modal_content').on('submit', '#cms_user_create', e => {
    e.preventDefault()
    if (verifyPasswordsMatch()){
      $.ajax({
        method: 'POST',
        url: '/cms/users/',
        data: $('#CMS_modal_content #cms_user_create').serialize()
      }).done(response => {
        debugger
        $('.ui.modal').modal('toggle')
        let content = '<tr id="' + response.user.id + '">' + '<td>' + response.user.first_name + '</td>' + '<td>' + response.user.last_name + '</td>' + '<td>' + response.user.email + '</td>' + '<td>' + response.role.title + '</td>' + '<td>' + getUserActionDropdown(response.user.id) + '</td>' + '</tr>'
        $('#CMS_index_content #CMS_users_table').append(content)
        $('#CMS_index_content .ui.floating.dropdown.icon.button').dropdown({
            action: 'hide',
            transition: 'drop'
        })
      })
    } else {
      $('.ui.negative.message').toggle()
      if ($('#CMS_modal_content #wrong_password_notice').length > 0)
        $('#CMS_modal_content #wrong_password_notice').remove()
      $('.ui.negative.message').append(`<p id='wrong_password_notice'>Passwords must match</p>`)
    }
  })
  function verifyPasswordsMatch() {
    let verified = $('#CMS_modal_content #cms_user_create :password')[0].value === $('#CMS_modal_content #cms_user_create :password')[1].value
    return verified
  }

  $('#CMS_create_user_link').click(e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: '/api/roles/'
    }).done(response => {
      let roles = response.roles
      $.ajax({
        method: 'GET',
        url: '/api/responsible_offices/'
      }).done(response => {
        $('.ui.modal').modal('toggle')
        $('.ui.modal .header').append('Create User')
        let content = getUserFormEmptyForm(roles, response.responsible_offices)
        $('.ui.modal .content').append(content)
        $('.ui.radio.checkbox')
        .checkbox()
        $('.ui.negative.message').toggle()
      })
    })
  })

  $('#CMS_index_content').on('click', '#CMS_user_assign_role', e => {
    $('.ui.modal')
      .modal('toggle')
      // .modal('show')

    $('.ui.modal .header').append('Modify User Role')
    $.ajax({
      method: 'GET',
      url: '/api/roles/'
    }).done(response => {
      let element_id = '#CMS_index_content tr#' + e.currentTarget.parentElement.id + ' td'
      let user_element = $(element_id)
      let content = getUserForm(user_element, response.roles, e.currentTarget.parentElement.id)
      $('.ui.modal .content').append(content)
      $('.ui.radio.checkbox')
      .checkbox()
      $('#user_update_id_input').toggle()
    })
  })

  $('.ui.modal').on('submit', '#update_user_form',e => {
    e.preventDefault()
    debugger
    $.ajax({
      method: 'PATCH',
      url: '/cms/users/' + $('#user_update_id_input input').val(),
      data: $(e.currentTarget).serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    }).done(response => {
      $('.ui.modal').modal('hide')
      $('#CMS_users_table').find('#'+response.id).find('td')[$('#CMS_users_table').find('#'+response.id).find('td').length-2].innerHTML = response.role.title
    })
  })

  function getUserForm(user_element, roles, id) {
    return (
    `<form id="update_user_form" class="ui form">
        <div id="user_update_id_input" class="disabled field">
          <label>First Name</label>
          <input type="text" name="user[id]" value="${id}">
        </div>
        <div class="disabled field">
          <label>First Name</label>
          <input type="text" name="user[first_name]" placeholder="${user_element[0].innerHTML}" value="${user_element[0].innerHTML}">
        </div>
        <div class="disabled field">
          <label>Last Name</label>
          <input type="text" name="user[last_name]" placeholder="${user_element[1].innerHTML}" value="${user_element[1].innerHTML}">
        </div>
        <div class="disabled field">
          <label>Email</label>
          <input type="text" name="user[email]" placeholder="${user_element[2].innerHTML}" value="${user_element[2].innerHTML}">
        </div>
        ${getRolesRadioCheckBoxWithUserRole(roles, user_element[3].innerHTML)}
        <button class="ui button" type="submit">Submit</button>
      </form>
    `)
  }

  function getUserFormEmptyForm(roles, responsible_offices) {
    return (
      `<div class='row'>
      <form id="cms_user_create" class="ui form">
        <div id="user_create_form_first_column" class='col-md-4'>
          <div class="field">
            <label>First Name</label>
            <input type="text" name="user[first_name]" placeholder="John" class="input_fields" value="" required>
          </div>
          <div class="field">
            <label>Last Name</label>
            <input type="text" name="user[last_name]" placeholder="Smith" class="input_fields" value="" required>
          </div>
          ${getCountryDropdown()}
        </div>
        <div class='col-md-5'>
          ${getDropdown("Responsible", "responsible_office_id", responsible_offices)}
          <div class="field">
            <label>Organization</label>
            <input type="text" name="user[organization]" placeholder="UNICEF" class="input_fields" value="" required>
          </div>
          ${getRolesRadioCheckBoxWithUserRole(roles, '')}
        </div>
        <div class="col-md-3">
          <div class="field">
            <label>Email</label>
            <input type="email" name="user[email]" placeholder="john@example.com" class="input_fields" value="" required>
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="user[password]" placeholder="Password" class="input_fields" value="" required>
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="user[password]" placeholder="Password" class="input_fields" value="" required>
          </div>
          <button id="cms_user_create_submit_button" class="ui button" type="submit">Submit</button>
        </div>
      </form>
      </div>
      <div class='row'>
      <div class="ui negative message">
        <div class="header">
          <a id='modal_error_message_close' href=''><i class="fa fa-times" aria-hidden="true"></i></a>
        </div>
      </div>
      </div>`
    )
  }

  function getRolesRadioCheckBoxWithUserRole(roles, user_role) {
    return (
      `<div class="inline fields">
        <label for="role">Select user role:</label>
        ${_.map(roles, role => {
            let checked = ''
            if (user_role === role.title) {
              checked = 'checked="checked"' }
            return `<div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="user[role_id]" tabindex="0" class="hidden" ${checked} value="${role.id}">
                <label>${role.title}</label>
              </div>
            </div>`
          }).join('')}
      </div>`
    )
  }

  function getRolesRadioCheckBox(roles) {
    return (
      `<div class="inline fields">
        <label for="role">Select user role:</label>
        ${_.map(roles, role => {
            let checked = ''
            return `<div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="role_id" checked="${checked}" tabindex="0" class="hidden" value="${role.id}">
                <label>${role.title}</label>
              </div>
            </div>`
          }).join('')}
      </div>`
    )
  }
  function getCountryDropdown() {
    return (
      `<div class="field">
        <label>Country</label>
        <select name="user[country]" class="ui dropdown user_dropdowns" required>
          <option value="">Country</option>
          <option value="af">Afghanistan</option>
          <option value="ax">Aland Islands</option>
          <option value="al">Albania</option>
          <option value="dz">Algeria</option>
          <option value="as">American Samoa</option>
          <option value="ad">Andorra</option>
          <option value="ao">Angola</option>
          <option value="ai">Anguilla</option>
          <option value="ag">Antigua</option>
          <option value="ar">Argentina</option>
          <option value="am">Armenia</option>
          <option value="aw">Aruba</option>
          <option value="au">Australia</option>
          <option value="at">Austria</option>
          <option value="az">Azerbaijan</option>
          <option value="bs">Bahamas</option>
          <option value="bh">Bahrain</option>
          <option value="bd">Bangladesh</option>
          <option value="bb">Barbados</option>
          <option value="by">Belarus</option>
          <option value="be">Belgium</option>
          <option value="bz">Belize</option>
          <option value="bj">Benin</option>
          <option value="bm">Bermuda</option>
          <option value="bt">Bhutan</option>
          <option value="bo">Bolivia</option>
          <option value="ba">Bosnia</option>
          <option value="bw">Botswana</option>
          <option value="bv">Bouvet Island</option>
          <option value="br">Brazil</option>
          <option value="vg">British Virgin Islands</option>
          <option value="bn">Brunei</option>
          <option value="bg">Bulgaria</option>
          <option value="bf">Burkina Faso</option>
          <option value="ar">Burma</option>
          <option value="bi">Burundi</option>
          <option value="tc">Caicos Islands</option>
          <option value="kh">Cambodia</option>
          <option value="cm">Cameroon</option>
          <option value="ca">Canada</option>
          <option value="cv">Cape Verde</option>
          <option value="ky">Cayman Islands</option>
          <option value="cf">Central African Republic</option>
          <option value="td">Chad</option>
          <option value="cl">Chile</option>
          <option value="cn">China</option>
          <option value="cx">Christmas Island</option>
          <option value="cc">Cocos Islands</option>
          <option value="co">Colombia</option>
          <option value="km">Comoros</option>
          <option value="cg">Congo Brazzaville</option>
          <option value="cd">Congo</option>
          <option value="ck">Cook Islands</option>
          <option value="cr">Costa Rica</option>
          <option value="ci">Cote Divoire</option>
          <option value="hr">Croatia</option>
          <option value="cu">Cuba</option>
          <option value="cy">Cyprus</option>
          <option value="cz">Czech Republic</option>
          <option value="dk">Denmark</option>
          <option value="dj">Djibouti</option>
          <option value="dm">Dominica</option>
          <option value="do">Dominican Republic</option>
          <option value="ec">Ecuador</option>
          <option value="eg">Egypt</option>
          <option value="sv">El Salvador</option>
          <option value="gb">England</option>
          <option value="gq">Equatorial Guinea</option>
          <option value="er">Eritrea</option>
          <option value="ee">Estonia</option>
          <option value="et">Ethiopia</option>
          <option value="eu">European Union</option>
          <option value="fk">Falkland Islands</option>
          <option value="fo">Faroe Islands</option>
          <option value="fj">Fiji</option>
          <option value="fi">Finland</option>
          <option value="fr">France</option>
          <option value="gf">French Guiana</option>
          <option value="pf">French Polynesia</option>
          <option value="tf">French Territories</option>
          <option value="ga">Gabon</option>
          <option value="gm">Gambia</option>
          <option value="ge">Georgia</option>
          <option value="de">Germany</option>
          <option value="gh">Ghana</option>
          <option value="gi">Gibraltar</option>
          <option value="gr">Greece</option>
          <option value="gl">Greenland</option>
          <option value="gd">Grenada</option>
          <option value="gp">Guadeloupe</option>
          <option value="gu">Guam</option>
          <option value="gt">Guatemala</option>
          <option value="gw">Guinea-Bissau</option>
          <option value="gn">Guinea</option>
          <option value="gy">Guyana</option>
          <option value="ht">Haiti</option>
          <option value="hm">Heard Island</option>
          <option value="hn">Honduras</option>
          <option value="hk">Hong Kong</option>
          <option value="hu">Hungary</option>
          <option value="is">Iceland</option>
          <option value="in">India</option>
          <option value="io">Indian Ocean Territory</option>
          <option value="id">Indonesia</option>
          <option value="ir">Iran</option>
          <option value="iq">Iraq</option>
          <option value="ie">Ireland</option>
          <option value="il">Israel</option>
          <option value="it">Italy</option>
          <option value="jm">Jamaica</option>
          <option value="jp">Japan</option>
          <option value="jo">Jordan</option>
          <option value="kz">Kazakhstan</option>
          <option value="ke">Kenya</option>
          <option value="ki">Kiribati</option>
          <option value="kw">Kuwait</option>
          <option value="kg">Kyrgyzstan</option>
          <option value="la">Laos</option>
          <option value="lv">Latvia</option>
          <option value="lb">Lebanon</option>
          <option value="ls">Lesotho</option>
          <option value="lr">Liberia</option>
          <option value="ly">Libya</option>
          <option value="li">Liechtenstein</option>
          <option value="lt">Lithuania</option>
          <option value="lu">Luxembourg</option>
          <option value="mo">Macau</option>
          <option value="mk">Macedonia</option>
          <option value="mg">Madagascar</option>
          <option value="mw">Malawi</option>
          <option value="my">Malaysia</option>
          <option value="mv">Maldives</option>
          <option value="ml">Mali</option>
          <option value="mt">Malta</option>
          <option value="mh">Marshall Islands</option>
          <option value="mq">Martinique</option>
          <option value="mr">Mauritania</option>
          <option value="mu">Mauritius</option>
          <option value="yt">Mayotte</option>
          <option value="mx">Mexico</option>
          <option value="fm">Micronesia</option>
          <option value="md">Moldova</option>
          <option value="mc">Monaco</option>
          <option value="mn">Mongolia</option>
          <option value="me">Montenegro</option>
          <option value="ms">Montserrat</option>
          <option value="ma">Morocco</option>
          <option value="mz">Mozambique</option>
          <option value="na">Namibia</option>
          <option value="nr">Nauru</option>
          <option value="np">Nepal</option>
          <option value="an">Netherlands Antilles</option>
          <option value="nl">Netherlands</option>
          <option value="nc">New Caledonia</option>
          <option value="pg">New Guinea</option>
          <option value="nz">New Zealand</option>
          <option value="ni">Nicaragua</option>
          <option value="ne">Niger</option>
          <option value="ng">Nigeria</option>
          <option value="nu">Niue</option>
          <option value="nf">Norfolk Island</option>
          <option value="kp">North Korea</option>
          <option value="mp">Northern Mariana Islands</option>
          <option value="no">Norway</option>
          <option value="om">Oman</option>
          <option value="pk">Pakistan</option>
          <option value="pw">Palau</option>
          <option value="ps">Palestine</option>
          <option value="pa">Panama</option>
          <option value="py">Paraguay</option>
          <option value="pe">Peru</option>
          <option value="ph">Philippines</option>
          <option value="pn">Pitcairn Islands</option>
          <option value="pl">Poland</option>
          <option value="pt">Portugal</option>
          <option value="pr">Puerto Rico</option>
          <option value="qa">Qatar</option>
          <option value="re">Reunion</option>
          <option value="ro">Romania</option>
          <option value="ru">Russia</option>
          <option value="rw">Rwanda</option>
          <option value="sh">Saint Helena</option>
          <option value="kn">Saint Kitts and Nevis</option>
          <option value="lc">Saint Lucia</option>
          <option value="pm">Saint Pierre</option>
          <option value="vc">Saint Vincent</option>
          <option value="ws">Samoa</option>
          <option value="sm">San Marino</option>
          <option value="gs">Sandwich Islands</option>
          <option value="st">Sao Tome</option>
          <option value="sa">Saudi Arabia</option>
          <option value="sn">Senegal</option>
          <option value="cs">Serbia</option>
          <option value="rs">Serbia</option>
          <option value="sc">Seychelles</option>
          <option value="sl">Sierra Leone</option>
          <option value="sg">Singapore</option>
          <option value="sk">Slovakia</option>
          <option value="si">Slovenia</option>
          <option value="sb">Solomon Islands</option>
          <option value="so">Somalia</option>
          <option value="za">South Africa</option>
          <option value="kr">South Korea</option>
          <option value="es">Spain</option>
          <option value="lk">Sri Lanka</option>
          <option value="sd">Sudan</option>
          <option value="sr">Suriname</option>
          <option value="sj">Svalbard</option>
          <option value="sz">Swaziland</option>
          <option value="se">Sweden</option>
          <option value="ch">Switzerland</option>
          <option value="sy">Syria</option>
          <option value="tw">Taiwan</option>
          <option value="tj">Tajikistan</option>
          <option value="tz">Tanzania</option>
          <option value="th">Thailand</option>
          <option value="tl">Timorleste</option>
          <option value="tg">Togo</option>
          <option value="tk">Tokelau</option>
          <option value="to">Tonga</option>
          <option value="tt">Trinidad</option>
          <option value="tn">Tunisia</option>
          <option value="tr">Turkey</option>
          <option value="tm">Turkmenistan</option>
          <option value="tv">Tuvalu</option>
          <option value="ug">Uganda</option>
          <option value="ua">Ukraine</option>
          <option value="ae">United Arab Emirates</option>
          <option value="us">United States</option>
          <option value="uy">Uruguay</option>
          <option value="um">Us Minor Islands</option>
          <option value="vi">Us Virgin Islands</option>
          <option value="uz">Uzbekistan</option>
          <option value="vu">Vanuatu</option>
          <option value="va">Vatican City</option>
          <option value="ve">Venezuela</option>
          <option value="vn">Vietnam</option>
          <option value="wf">Wallis and Futuna</option>
          <option value="eh">Western Sahara</option>
          <option value="ye">Yemen</option>
          <option value="zm">Zambia</option>
          <option value="zw">Zimbabwe</option>
        </select>
      </div>`
    )
  }

  function getDropdown(label, option_name, objects, id){
    return (`
      <div class="field">
        <label>${label}</label>
        <select name="user[${option_name}]" class="ui dropdown user_dropdowns" required>
          <option value="">Select Office</option>
          ${_.map(objects, object => {
            selected = object.id === id ? 'selected' : ''
            return `<option ${selected} value="${object.id}">${object.title}</option>`
          }).join('\n')}
        </select>
      </div>
      `)
  }
})
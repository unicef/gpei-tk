$(() => {
  $('#user_account_modal')
    .modal({
        onHide: () => {
          $('#user_account_modal .content').empty()
          $('#user_account_modal .header').empty()
        }
      })
  $('#nav_user_sign_in').click(e => {
    e.preventDefault()
    $('#user_account_modal').modal('toggle')
    let form = signinForm()
    $('#user_account_header').append('Sign In')
    $('#user_account_content').append(form)
    return false
  })

  $('#forgot_pw_user_form_div').on('submit', 'form', e => {
    e.preventDefault()
    if ($('#new_password_input').val() !== $('#confirm_new_password_input').val()) {
      $('#forgot_pw_user_update').html("<i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> Passwords do not match")
    } else {
      $.ajax({
        method: 'POST',
        url: '/forgot_passwords/new/',
        data: $(e.currentTarget).serialize()
      }).done(response => {
        if (response.status === 200) {
          $('#forgot_pw_user_update').html("Password update successful! Please login.")
          setTimeout(function(){ window.location.href = "/" }, 3000);
        } else {
          $('#forgot_pw_user_update').html(`<i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> ${response.message}`)
        }
      })
      return false
    }
  })
  function signinForm(){
    return (`
      <form id="sign_in_form" class="ui form">
        <div class="col-md-6">
          <div class="field">
            <label>Email</label>
            <input type="email" name="user[email]" placeholder="name@example.com" class="input_fields" value="" required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="field">
            <label>Password</label>
            <input type="password" name="user[password]" placeholder="Password" class="input_fields" value="" required>
          </div>
        </div>
        <div class="col-md-12">
          <div class='col-md-2'>
          <button id="sign_in_submit_button" class="ui button" type="submit">Submit</button>
          </div>
          <div id='user_register_or_forgot_pwd_div' class='col-md-6'>
            <span id="register_user_text">Not a member? Register </span><a id="nav_user_register" href="">here</a>
            <br>
            <span id="forgot_pwd_span">Forgot <a id="forgot_password_link" href="">password?</a></span>
          </div>
        </div>
      </form>
    `)
  }
  $('#user_account_content').on('click', '#nav_user_register', e => {
    e.preventDefault()
    $.ajax({
      method: 'GET',
      url: '/users/new/'
    }).done(response => {
      $('#user_account_content').empty()
      $('#user_account_header').empty()
      $('#user_account_header').append('Create Account')
      let form = getUserCreationForm()
      $('#user_account_content').append(form)
      $('#user_account_modal .ui.negative.message').transition('fade')
      $('.ui.radio.checkbox').checkbox();
    })
    return false
  })
  $('#nav_user_sign_out').click(e => {
    e.preventDefault()
    $.ajax({
      method: 'DELETE',
      url: '/signout'
    }).done(response => {
    })
    return false
  })
  $('#user_account_content').on('submit', '#sign_in_form', e => {
    e.preventDefault()
    let data = $(e.currentTarget).serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    $.ajax({
      method: 'POST',
      url: '/signin/',
      data: data
    }).done(response => {
      if (response.status === 403){
        let message = `<div id='sign_in_error_message'>
                          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                          ${ response.error }
                        </div>`
        if ($('#sign_in_error_message').length > 0)
          $('#sign_in_error_message').remove()
        $('#user_account_content').append(message)
      }
    }).fail(response => {
    })
  })
  $('#user_account_content').on('submit', '#create_user_form', e => {
    e.preventDefault()
    let data = $(e.currentTarget).serialize() + "&authenticity_token=" + _.escape($('meta[name=csrf-token]').attr('content'))
    if (verifyPasswordsMatch()) {
      $.ajax({
        method: 'POST',
        url: '/users/',
        data: data
      }).done(response => {
        if (response.status === 403) {
          let error_div = `<div id="error_div">`
          _.forEach(response.errors, error_text => {
            error_div += `<span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${error_text}</span>`
          })
          error_div += `</div>`
          if ($('#error_div').length === 0) {
            $('#user_account_content').append(error_div)
          } else {
            $('#error_div').remove()
            $('#user_account_content').append(error_div)
          }
        }
      })
    } else {
      $('.ui.negative.message').transition('fade')
      if ($('#user_account_content #wrong_password_notice').length > 0)
        $('#user_account_content #wrong_password_notice').remove()
      $('.ui.negative.message').append(`<p id='wrong_password_notice'>Passwords must match</p>`)
    }
    return false
  })

  function verifyPasswordsMatch() {
    let passwords = $('#user_account_modal :password')
    let verified = passwords[0].value === passwords[1].value
    return verified
  }

  function getUserCreationForm(){
    return (
      `<div class='row'>
      <form id="create_user_form" class="ui form">
        <div id="user_create_form_first_column" class='col-md-4'>
          <div class="field">
            <label>First Name</label>
            <input type="text" name="user[first_name]" placeholder="John" class="input_fields" value="" required>
          </div>
          <div class="field">
            <label>Last Name</label>
            <input type="text" name="user[last_name]" placeholder="Smith" class="input_fields" value="" required>
          </div>
        </div>
        <div class='col-md-4'>
          <div class="field">
            <label>Organization</label>
            <input type="text" name="user[organization]" placeholder="UNICEF" class="input_fields" value="" required>
          </div>
          ${getCountryDropdown()}
          <div class="field">
            <label>Please click - <a class="tos_link_text" href='/terms_of_service/' target="_blank">Terms of Service</a></label>
            <label><input type=checkbox name="user[TOS_accepted]" value="true" required> I agree to these terms.</label>
          </div>
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
            <label>Re-enter password</label>
            <input type="password" name="user[password]" placeholder="Password" class="input_fields" value="" required>
          </div>
          <button class="ui button" type="submit">Submit</button>
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
            let selected = object.id === id ? 'selected' : ''
            return `<option ${selected} value="${object.id}">${object.title}</option>`
          }).join('\n')}
        </select>
      </div>
      `)
  }
  $('#user_account_modal').on('click', '#modal_error_message_close', e => {
    e.preventDefault()
    $(e.currentTarget).closest('.message').transition('fade')
  })
  $('#user_account_modal').on('click', '#forgot_password_link', e => {
    e.preventDefault()
    $('#user_account_modal .content').empty()
    $('#user_account_modal .header').empty()
    $('#user_account_header').append('Forgot Password')
    let form = geForgotPasswordForm()
    $('#user_account_content').append(form)
  })
  function geForgotPasswordForm(){
    return `<form id="forgot_pwd_form" class="ui form">
        <div class="col-md-6">
          <div class="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="name@example.com" class="input_fields" value="" required>
          </div>
        </div>
        <div class="col-md-12">
          <div class='col-md-2'>
            <button id="forgot_pwd_submit_button" class="ui button" type="submit">Submit</button>
          </div>
        </div>
      </form>
      <div id='reset_pwd_spinner'>
        <i class="fa fa-circle-o-notch fa-spin fa-4x"></i>
      </div>`
  }

  $('#user_account_content').on('submit', '#forgot_pwd_form', e => {
    e.preventDefault()
    $('#reset_pwd_spinner').css('visibility', 'visible')
    $('#forgot_pwd_form button').prop('disabled', true)
    let data = $(e.currentTarget).serialize()
    $.ajax({
      method: 'POST',
      url: '/forgot_passwords/',
      data: data
    }).done(response => {
      $('#reset_pwd_spinner').css('visibility', 'hidden')
      $('#forgot_pwd_form button').prop('disabled', false)
      if (response.status === 200) {
        $('#user_account_modal .content').empty()
        $('#user_account_modal .content').append(`<div class='col-md-6' style='padding-bottom:20px'>An email for password recovery has been sent to you. Please follow the instructions to reset your password.</div>`)
      } else {
        if (_.isEmpty($('#user_account_modal #reset_pwd_error_div').css('visibility'))) {
          $('#reset_pwd_submit_div').append(`<div id='reset_pwd_error_div'><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>Email not found.</div>`)
        }
      }
    })
  })
  if ($('#forgot_pwd_return').css('visibility') === 'visible') {
    $('#user_account_modal').modal('toggle')
    $('#user_account_modal .content').empty()
    $('#user_account_modal .header').empty()
    $('#user_account_header').append('Reset Password')
    let form = getResetPasswordForm()
    $('#user_account_content').append(form)
  }
  $('#user_account_content').on('submit', '#reset_pwd_form', e => {
    e.preventDefault()
    $('#reset_pwd_spinner').css('visibility', 'visible')
    $('#reset_pwd_form button').prop('disabled', true)
    if (verifyPasswordsMatch()){
      $.ajax({
      method: 'PUT',
      url: '/forgot_passwords/' + $('#forgot_pwd_return div').attr('id'),
      data: { password: $('#user_account_modal :password')[0].value, user_key: window.location.pathname.split('/')[2] }
      }).done(response => {
        if (response.status === 200) {
          if (!_.isUndefined(response.errors)) {
            $('#reset_pwd_spinner').css('visibility', 'hidden')
            $('#reset_pwd_form button').prop('disabled', false)
            if (_.isEmpty($('#user_account_modal #error_div'))){
              $('#user_account_modal #error_div').remove()
              let error_div = `<div id="error_div">`
              _.forEach(response.errors, error_text => {
                error_div += `<span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ${error_text}</span>`
              })
              error_div += `</div>`
              $('#user_account_content').append(error_div)
            }
          } else {
            $('#user_account_modal .content').empty()
            $('#user_account_modal .content').append(`<div id='reset_password_success_div' class='col-md-12'>Password changed successfully, please sign in to continue.</div>`)
            _.delay(() => {
              $('#user_account_modal').modal('hide')
              window.location.href = '/'
            }, 2000, 'later')

          }
        }
      })
    } else {
      if (_.isEmpty($('#user_account_modal #error_div').css('visibility'))) {
        $('#reset_pwd_submit_div').append(`<div id='reset_pwd_error_div'><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>Passwords must match</div>`)
      }
    }
  })

  function getResetPasswordForm(){
    return `<form id="reset_pwd_form" class="ui form">
        <div class="col-md-6">
          <div class="field">
            <label>Password:</label>
            <input type="password" name="user[password]" placeholder="Password" class="input_fields" value="" required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="field">
            <label>Re-enter password:</label>
            <input type="password" name="re_entered_password" placeholder="Re-enter password" class="input_fields" value="" required>
          </div>
        </div>
        <div id='reset_pwd_submit_div' class="col-md-12">
          <div class='col-md-2'>
            <button id="reset_pwd_submit_button" class="ui button" type="submit">Submit</button>
          </div>
        </div>
      </form>
      <div id='reset_pwd_spinner'>
        <i class="fa fa-circle-o-notch fa-spin fa-4x"></i>
      </div>`
  }
})

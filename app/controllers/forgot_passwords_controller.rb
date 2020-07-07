class ForgotPasswordsController < ApplicationController
  def new
    @forgot_pwd = ForgotPassword.find_by(user_key: params[:key])
    @found = !!@forgot_pwd
  end

  def create
    if request.xhr?
      @user = User.find_by(email: params[:email])
      render json: { status: 403, error: 'This email was not found.' } if @user.nil?
      all_active_forgot_pwds = ForgotPassword.where("user_id = ? AND expired = false", @user.id)
      all_active_forgot_pwds.each { |forgot_pwd| forgot_pwd.update(expired: true) }
      @forgot_pwd = ForgotPassword.new(user_id: @user.id)
      chars = (('a'..'z').to_a + ('0'..'9').to_a + ('A'..'Z').to_a)
      begin
        key = ''
        32.times { |idx| key += chars.sample }
        @forgot_pwd.user_key = key
      end until @forgot_pwd.valid?

      if @forgot_pwd.save
        email_body = "<body>
                                  <p>Please follow the link below to reset your password for poliok.it.</p>
                                  <p>Click <a href=\"https://poliok.it/forgot_passwords/#{@forgot_pwd.user_key}\" target=\"_blank\">here</a> to reset your password.</p>
                                  <p>If this email was sent in error or seems suspicious please contact us through the contact option at <a href=\"https://poliok.it\" target=\"_blank\">https://poliok.it</a> website.
                                  </p>
                                </body>"
        client = Aws::SES::Client.new(region:'us-east-1')
        client.send_email({
          destination: {
            to_addresses: [
              @user.email,
            ],
          },
          message: {
            body: {
              html: {
                charset: "UTF-8",
                data: email_body,
              },
            },
            subject: {
              charset: "UTF-8",
              data: "poliok.it password reset",
            },
          },
          source: "no-reply@poliok.it",
        })
      end
      render json: { status: 200, id: @user.id, message: 'A link has been sent to the email you have provided to reset your password.' }
    end
  end

  def update
    forgot_pwd = ForgotPassword.find_by(user_key: params[:key])
    user = nil
    user_msg = nil
    status = 500
    key = nil
    if forgot_pwd
      user = forgot_pwd.user
      key = forgot_pwd.user_key
      if !forgot_pwd.expired?
        if length_greater_than_eight(params[:password])
          user.password = params[:password]
          if user.save
            status = 200
            forgot_pwd.update(expired: true)
          else
            status = 422
            user_msg = build_error_msg(user.errors.messages)
          end
        end
      else
        status = 404
        user_msg =  "Forgot password link is already expired"
      end
    end
    render json: { status: status, message: user_msg, key: key}
  end
end

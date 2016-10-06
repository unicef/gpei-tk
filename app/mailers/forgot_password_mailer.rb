class ForgotPasswordMailer < ApplicationMailer
  def send_user_url(user, forgot_pwd)
    @user = user
    @forgot_pwd = forgot_pwd
    mail to: @user.email, subject: 'poliok.it password reset'
  end
end
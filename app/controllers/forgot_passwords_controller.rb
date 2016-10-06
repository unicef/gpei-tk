class ForgotPasswordsController < ApplicationController
  def new
    forgot_pwd = ForgotPassword.find_by(user_key: params[:key])
    if !forgot_pwd.expired?
      render 'home/index', :locals => { user_id: forgot_pwd.user_id, is_forgot_pwd: true }
    else
      render json: { status: 403, error: 'This email was not found.' }
    end
  end

  def create
    if request.xhr?
      @user = User.find_by(email: params[:email])
      binding.pry
      render json: { status: 403, error: 'This email was not found.' } if @user.nil?
      binding.pry
      all_active_forgot_pwds = ForgotPassword.where("user_id = ? AND expired = false", @user.id)
      all_active_forgot_pwds.each { |forgot_pwd| forgot_pwd.update(expired: true) }
      @forgot_pwd = ForgotPassword.new(user_id: @user.id)
      begin
        @forgot_pwd.user_key = SecureRandom.base64
      end until @forgot_pwd.valid?

      ForgotPasswordMailer.send_user_url(@user, @forgot_pwd).deliver_now if @forgot_pwd.save
      render json: { status: 200, id: @user.id, message: 'A link has been sent to the email you have provided to reset your password.' }
    end
  end

  def update
    forgot_pwd = ForgotPassword.find_by(user_key: params[:user_key])
    user = User.find_by(id: params[:id])
    if !forgot_pwd.expired?
      user.password = params[:password]
      if user.save
        forgot_pwd.update(expired: true)
        render 'home/index'
      else
        render json: { status: 403, message: 'something went wrong, please try again.'}
      end
    end
  end
end
class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params['user']['email'])
    if @user.authenticate(params['user']['password'])
      session[:uuid] = SecureRandom.base64
      session[:id] = @user.id
      current_time = Time.current
      session[:expires_at] = current_time + 6.hours
      session[:last_seen] = current_time
      render :js => "window.location = '/'"
    else
      render json: { status: 403, error: 'Please re-enter your email or password and try again.' }
    end
  end

  def destroy
    if session
      session.clear
      render :js => "window.location = '/'"
    end
  end
end
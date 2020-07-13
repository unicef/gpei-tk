class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params['user']['email'])
    status = 200
    message = "Successful login"
    if @user
      if @user.authenticate(params['user']['password'])
        session[:uuid] = SecureRandom.base64
        session[:id] = @user.id
        current_time = Time.current
        session[:expires_at] = current_time + 6.hours
        session[:last_seen] = current_time
        render :js => "window.location = '/'"
        return
      else
        status = 403
        message = "The email and password you entered don't match."
      end
    else
      status = 404
      message = "Email not found"
    end
    render json: { status: status, error: message }
  end

  def destroy
    if session
      session.clear
      render :js => "window.location = '/'"
    end
  end
end

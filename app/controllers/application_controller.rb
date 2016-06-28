class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by(id: 1)
    # @current_user ||= User.find_by(uid: session[:uid]) if session[:uid]
  end
end

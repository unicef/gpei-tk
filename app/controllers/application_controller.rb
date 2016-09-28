class ApplicationController < ActionController::Base
  # For APIs, you may want to use :null_session instead.
  helper_method :current_user
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by(id: session[:id]) if session[:uuid]
  end

  def params_id_is_integer?
    !!(params[:id] =~ /\A[-+]?[0-9]+\z/)
  end
end

class ApplicationController < ActionController::Base
  # For APIs, you may want to use :null_session instead.
  helper_method :current_user, :latest_notification, :length_greater_than_eight
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by(id: session[:id]) if session[:uuid]
  end

  def latest_notification
    @notification = Notification.all.where('created_at > ?', (Time.now - 15.days)).order(created_at: :desc).first
    if !@notification
      return false
    else
      @notification
    end
  end

  def params_id_is_integer?
    !!(params[:id] =~ /\A[-+]?[0-9]+\z/)
  end

  def user_is_admin_or_editor?
    unless (current_user.is_admin? || current_user.is_editor?)
      redirect_to '/'
    end
  end

  def build_error_msg(messages)
    error_text = []
    messages.each do |key, value|
      messages[key].each do |value|
        error_text << "#{key} #{value}"
      end
    end
    error_text
  end

  def length_greater_than_eight(password)
    password.length > 7
  end
end

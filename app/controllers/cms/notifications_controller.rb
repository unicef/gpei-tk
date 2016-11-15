class Cms::NotificationsController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    notifications = Notification.all
    render json: { status: 200, notifications: notifications }
  end

  def create
    notification = Notification.new(safe_params_notifications)
    if notification.save
      render json: { status: 200 }
    end
  end

  private

  def safe_params_notifications
    params.require(:notification).permit(:content)
  end
end
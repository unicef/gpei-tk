class CmsController < ApplicationController
  def index
    redirect_to root_url unless current_user && (current_user.is_admin? || current_user.is_editor?)
  end
end
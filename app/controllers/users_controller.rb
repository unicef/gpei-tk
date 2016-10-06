class UsersController < ApplicationController
  def new
    if request.xhr?
      render json: { status: 'success' }
    end
  end

  def create
    @user = User.new(safe_user_params)
    @user.role = Role.find_by(title: 'Member')
    if @user.save
      SopChecklist.create(user_id: @user.id)
      C4dToolkit.create(user_id: @user.id)
      session[:uuid] = SecureRandom.base64
      session[:id] = @user.id
      current_time = Time.current
      session[:expires_at] = current_time + 6.hours
      session[:last_seen] = current_time
      render :js => "window.location = '/'"
    else
      render json: { status: 403, errors: @user.errors.messages }
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  private

  def safe_user_params
    params.require(:user).permit(:first_name, :last_name, :country, :organization, :email, :password, :TOS_accepted)
  end
end
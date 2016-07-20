class Cms::UsersController < ApplicationController
  def index
    if current_user.is_admin?
      if request.xhr?
        users_hash = getAllowedUsers
        roles = Role.all
        render json: { users_hash: users_hash, roles: roles, status: 200 }
      end
    end
  end

  def update
    if current_user.is_admin?
      if request.xhr?
        user = User.find_by(id: params['id'])
        if user.update(safe_update_params)
          render json: { status: 200, role: user.role, id: params['id'] }
        end
      end
    end
  end

  def create
    if current_user.is_admin?
      if request.xhr?
        @user = User.new(safe_create_params)
        if @user.save
          SopChecklist.create(user_id: @user.id)
          C4dToolkit.create(user_id: @user.id)
          user = { id: @user.id, first_name: @user.first_name, last_name: @user.last_name, email: @user.email }
          render json: { status: 200, user: user, role: @user.role }
        end
      end
    end
  end

  def destroy
    if current_user.is_admin?
      if request.xhr?
        user = User.find_by(id: params[:id])
        user.is_deleted = true
        if user.save
          render json: { status: 200, id: params[:id] }
        end
      end
    end
  end

  private

  def getAllowedUsers
    columns = User.attribute_names - ['password_digest']
    root = Role.find_by(title: 'root')
    users = User.all.select(columns).where.not('role_id = ? OR is_deleted = ?', root.id, true)
    users_hash = {}
    User.all.each { |user| users_hash[user.id] = user }
  end

  def safe_create_params
    params.require(:user).permit(:first_name, :last_name, :password, :country, :responsible_office_id, :organization, :email, :role_id)
  end

  def safe_update_params
    params.require(:user).permit(:first_name, :last_name, :email, :role_id)
  end
end
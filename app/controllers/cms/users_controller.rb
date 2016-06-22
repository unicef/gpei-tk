class Cms::UsersController < ApplicationController
  def index
    if request.xhr?
      columns = User.attribute_names - ['password_digest']
      users = User.all.select(columns)
      roles = Role.all
      render json: { users: users, roles: roles, status: 'success' }
    end
  end

  def update
    if request.xhr?
      # if user is a privledged user
      if User.find(params[:id]).update(safe_update_params)
        user = User.find(params[:id])
        role = User.find(params[:id]).role
        render json: { status: 'success', role: role, id: user.id }
      end
    end
  end

  def create
    if request.xhr?
      user = User.new(safe_create_params)
      user.password = 'temporary'
      if user.save
        role = User.find(user.id).role
        user = { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email }
        render json: { status: 'success', user: user, role: role }
      end
    end
  end

  def safe_create_params
    params.permit(:first_name, :last_name, :email, :role_id)
  end

  def safe_update_params
    params.permit(:first_name, :last_name, :email, :role_id)
  end
end
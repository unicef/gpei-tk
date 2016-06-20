class Cms::UsersController < ApplicationController
  def index
    if request.xhr?
      columns = User.attribute_names - ['password_digest']
      users = User.all.select(columns)
      roles = Role.all
      render json: { users: users, roles: roles, status: 'success' }
    end
  end
end
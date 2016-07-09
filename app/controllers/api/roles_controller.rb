class Api::RolesController < ApplicationController
  def index
    roles = Role.where.not(title: 'root')
    render json: { roles: roles, status: 200 }
  end
end
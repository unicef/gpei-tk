class RolesController < ApplicationController
  def index
    if request.xhr?
      roles = Role.all.where("title != ?", 'root')
      render json: { status: "success", roles: roles }
    end
  end
end
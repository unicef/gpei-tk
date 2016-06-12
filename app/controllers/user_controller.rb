class UserController < ApplicationController
  def show
    @user = User.all.first
  end
end
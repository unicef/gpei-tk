class HomeController < ApplicationController
  def index
    @nav_bar_offset = 'col-md-offset-7'
  end

  def navigation
    @nav_bar_offset = 'col-md-offset-7'
  end
end
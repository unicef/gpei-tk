class HomeController < ApplicationController
  def index
    @display = 'none'
    @nav_bar_offset = 'col-md-offset-7'
  end

  def navigation
    @display = 'block'
    @nav_bar_offset = 'col-md-offset-7'
  end
end
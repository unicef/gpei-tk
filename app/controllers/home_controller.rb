class HomeController < ApplicationController
  def index
    @display = 'none'
    @nav_bar_offset = 'col-md-offset-7'
  end

  def navigation
    redirect_to '/' #remove when SOP returns to the fold.
    @display = 'block'
    @nav_bar_offset = 'col-md-offset-7'
  end
end
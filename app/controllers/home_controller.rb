class HomeController < ApplicationController
  def index
    @display = 'none'
    # @nav_bar_offset = 'col-md-offset-7'
    @is_c4d = true
    @user = current_user
    @nav_bar_offset = 'col-md-offset-1'
    # @loadC4DArticle = true unless params[:id].nil?
    @is_c4d_nav = true
    # @c4d_category = C4dCategory.find_by(title:'Understand')
    @landing = true
    @c4d_categories = C4dCategory.all
  end

  def navigation
    redirect_to '/' #remove when SOP returns to the fold.
    @display = 'block'
    @nav_bar_offset = 'col-md-offset-7'
  end
end

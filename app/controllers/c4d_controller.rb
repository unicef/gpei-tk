class C4dController < ApplicationController
  # def index
  #   @user = current_user
  #   @c4d_categories = C4dCategory.all
  #   @img_name = 'C4D'
  # end

  def index
    @nav_bar_offset = 'col-md-offset-7'
    @user = current_user
    @c4d_categories = C4dCategory.all
    @c4d_subcateogires = C4dSubcategory.all
    @c4d_articles = C4dArticle.where(published: true).order(order_id: :asc)
    @img_name = 'C4D'
  end
end

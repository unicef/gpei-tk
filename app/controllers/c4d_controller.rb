class C4dController < ApplicationController
  # def index
  #   @user = current_user
  #   @c4d_categories = C4dCategory.all
  #   @img_name = 'C4D'
  # end

  def index
    @is_c4d = true
    @nav_bar_offset = 'col-md-offset-1'
    @user = current_user
    @c4d_categories = C4dCategory.all
    @c4d_subcateogires = C4dSubcategory.all
    @c4d_articles = C4dArticle.where(published: true).order(order_id: :asc)
  end
end

class C4dArticlesController < ApplicationController
  def index
    redirect_to c4d_selection_path
  end

  def show
    @user = current_user
    @img_name = 'C4D'
    if params['id'].nil?
      @c4d_article = C4dArticle.where(title: params['title']).first
    else
      @c4d_article = C4dArticle.where(id: params['id']).first
    end
    @c4d_categories = C4dCategory.all
    @c4d_related_topics = C4dArticle.where("c4d_subcategory_id = ? AND id != ?", @c4d_article.c4d_subcategory_id, @c4d_article.id)
  end
end
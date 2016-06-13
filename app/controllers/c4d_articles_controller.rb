class C4dArticlesController < ApplicationController
  def index
    redirect_to c4d_selection_path
  end

  def show
    @user = User.all.first
    @img_name = 'C4D'
    if params['id'].nil?
      @c4d_article = C4dArticle.where(title: params['title']).first
    else
      @c4d_article = C4dArticle.where(id: params['id']).first
    end
    if !C4dArticle.last.nil?
      @c4d_article_last_index = C4dArticle.last.id
    else
      @c4d_article_last_index = 0
    end
    @c4d_related_topics = C4dArticle.where(c4d_category: @c4d_article.c4d_category, c4d_subcategory: @c4d_article.c4d_subcategory)
  end
end
class C4dArticlesController < ApplicationController
  def index
    redirect_to c4d_selection_path
  end

  def show
    @user = User.all.first
    @img_name = 'C4D'
    @c4d_article = C4dArticle.where(title: params['title'])
    @c4d_article_last_index = C4dArticle.last.id
  end
end
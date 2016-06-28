class C4dToolkitController < ApplicationController
  def create
    if request.xhr?
      user = User.all.first
      article = C4dArticle.find_by(id: params['id'])
      if user.c4d_toolkit.c4d_articles.find_by(id: article.id).nil?
        user.c4d_toolkit.c4d_articles << article
        render json: { status: "success", id: article.id, title: article.title }
      else
        render json: { status: "fail" }
      end
    end
  end

  def destroy
    if request.xhr?
      user = User.all.first
      article = user.c4d_toolkit.c4d_articles.find_by(id: params['id'])
      if article
        C4dToolkitC4dArticle.where(c4d_article_id: article.id, c4d_toolkit_id: user.c4d_toolkit.id).first.destroy
        render json: { status: "success", id: params['id'] }
      else
        render json: { status: "fail" }
      end
    end
  end
end
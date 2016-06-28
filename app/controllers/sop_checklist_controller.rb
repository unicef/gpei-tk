class SopChecklistController < ApplicationController
  def create
    if request.xhr?
      user = User.all.first
      article = SopArticle.find_by(id: params['id'])
      if user.sop_checklist.sop_articles.find_by(title: article.title).nil?
        user.sop_checklist.sop_articles << article
        render json: { status: "success", id: article.id, article_title: article.title }
      else
        render json: { status: "fail" }
      end
    end
  end

  def destroy
    if request.xhr?
      user = User.all.first
      article = user.sop_checklist.sop_articles.find_by(id: params['id'])
      if article
        SopChecklistSopArticle.where(sop_article_id: article.id, sop_checklist_id: user.sop_checklist.id).first.destroy
        render json: { status: "success", id: article.id, article_title: article.title }
      else
        render json: { status: "fail" }
      end
    end
  end
end
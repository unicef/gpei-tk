class SopChecklistController < ApplicationController
  def create
    if request.xhr?
      user = User.all.first
      article = SopArticle.where(title: params['title']).first
      if user.sop_checklist.sop_articles.where(title: params['title']).empty?
        user.sop_checklist.sop_articles << article
        render json: { status: "success" }
      else
        render json: { status: "fail" }
      end
    end
  end

  def destroy
    if request.xhr?
      user = User.all.first
      article = user.sop_checklist.sop_articles.where(title: params['title']).first
      if article
        SopChecklistSopArticle.where(sop_article_id: article.id, sop_checklist_id: user.sop_checklist.id).first.destroy
        render json: { status: "success" }
      else
        render json: { status: "fail" }
      end
    end
  end
end
class SopChecklistController < ApplicationController
  def update
    if request.xhr?
      user = User.all.first
      article = SopArticle.where(title: params['title']).first
      if (user.sop_checklist.sop_articles.where(title: params['title']))
        SopchecklistSoparticle.first_or_create(sop_article_id: article.id, sop_checklist_id: user.sop_checklist.id)
      else
        join_table_article = SopchecklistSoparticle.where(title: article.title, sop_checklist_id: user.sop_checklist.id).first
        SopchecklistSoparticle.destroy(join_table_article.id)
      end
      @user = user
      @sop_times = SopTime.all
      @sop_categories = SopCategory.all
      @offices = Office.all
      @sop_articles = SopArticle.all
      render 'sop/index', layout: false
    end
  end
end
class SopArticlesController < ApplicationController
  def index
    redirect_to sop_path
  end

  def show
    if request.xhr?
      if params['id'].nil?
        sop_article = SopArticle.where(title: params['title']).first
      else
        sop_article = SopArticle.where(id: params['id']).first
      end
      sop_categories = SopCategory.all
      sop_related_topics = SopArticle.where("sop_category_id = ? AND id != ?", sop_article.sop_category_id, sop_article.id)
      checklist_articles = current_user.sop_checklist.sop_articles if current_user
      sop_times = SopTime.all
      reference_links = sop_article.reference_links
      render json: { status: 200,
                     article: sop_article,
                     sop_categories: sop_categories,
                     sop_times: sop_times,
                     sop_related_topics: sop_related_topics,
                     current_user: current_user,
                     checklist_articles: checklist_articles,
                     reference_links: reference_links }
    else
      @nav_bar_offset = 'col-md-offset-7'
      @user = current_user
      @img_name = 'SOP'
      if params['id'].nil?
        @sop_article = SopArticle.find_by(title: params['title'])
      else
        @sop_article = SopArticle.find_by(id: params['id'])
      end
      last_article = SopArticle.order(:id).last
      if !last_article.nil?
        @sop_article_last_index = last_article.id
      else
        @sop_article_last_index = 0
      end
      @sop_related_topics = SopArticle.where("sop_category_id = ? AND id != ?", @sop_article.sop_category_id, @sop_article.id)
    end
  end
end
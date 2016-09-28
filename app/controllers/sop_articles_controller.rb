class SopArticlesController < ApplicationController
  def index
    redirect_to sop_path
  end

  def show
    if request.xhr?
      if params[:id] && !params_id_is_integer?
        sop_article = SopArticle.find_by(title: params[:id].gsub('_', ' '))
      elsif params[:id]
        sop_article = SopArticle.find_by(id: params['id'])
      end
      sop_categories = SopCategory.all.order(:id)
      checklist_articles = current_user.sop_checklist.sop_articles if current_user
      sop_times = SopTime.all.order(:id)
      reference_links = sop_article.reference_links
      render json: { status: 200,
                     article: sop_article,
                     sop_categories: sop_categories,
                     sop_times: sop_times,
                     current_user: current_user,
                     checklist_articles: checklist_articles,
                     reference_links: reference_links }
    else
      @nav_bar_offset = 'col-md-offset-7'
      @user = current_user
      @img_name = 'SOP'
      if params[:id] && !params_id_is_integer?
        @sop_article = SopArticle.find_by(title: params[:id].gsub('-', ' '))
      elsif params[:id]
        @sop_article = SopArticle.find_by(id: params['id'])
      end
      last_article = SopArticle.order(:id).last
      if !last_article.nil?
        @sop_article_last_index = last_article.id
      else
        @sop_article_last_index = 0
      end
    end
  end
end
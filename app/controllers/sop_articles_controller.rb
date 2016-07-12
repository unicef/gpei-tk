class SopArticlesController < ApplicationController
  def index
    redirect_to sop_path
  end

  def show
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
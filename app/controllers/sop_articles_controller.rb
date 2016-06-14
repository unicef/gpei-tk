class SopArticlesController < ApplicationController
  def index
    redirect_to sop_path
  end

  def show
    @user = User.all.first
    @img_name = 'SOP'
    if params['id'].nil?
      @sop_article = SopArticle.where(title: params['title']).first
    else
      @sop_article = SopArticle.where(id: params['id']).first
    end
    if !SopArticle.last.nil?
      @sop_article_last_index = SopArticle.last.id
    else
      @sop_article_last_index = 0
    end
    @sop_related_topics = SopArticle.where("sop_category_id = ? AND id != ?", @sop_article.sop_category_id, @sop_article.id)
  end
end
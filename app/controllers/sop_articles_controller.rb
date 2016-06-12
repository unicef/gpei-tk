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
  end
end
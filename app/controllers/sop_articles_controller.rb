class SopArticlesController < ApplicationController
  def index
    redirect_to sop_path
  end

  def show
    @user = User.all.first
    @img_name = 'SOP'
    @sop_article = SopArticle.where(title: params['title'])
  end
end
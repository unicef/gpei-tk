class SopArticlesController < ApplicationController
  def index
    redirect_to sop_path
  end

  def show
    @img_name = 'SOP'
    @sop_article = SopArticle.where(title: params['title'])
  end
end
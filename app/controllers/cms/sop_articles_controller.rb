class Cms::SopArticlesController < ApplicationController
  def index
    if request.xhr?
      sop_articles = SopArticle.all
      users = {}
      User.all.each do |user|
        users[user.id] = user
      end
      sop_articles.each do |article|
        article.owner_id = User.all.first.id
      end
      render json: { sop_articles: sop_articles, users: users, status: 'success' }
    end
  end

  def create
    if request.xhr?
      binding.pry
      sop_article = SopArticle.new(safe_article_params)
      sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
      if sop_article.save
        render json: { sop_article: sop_article, status: 'success' }
      end
    end
  end

  def show
    if request.xhr?
      sop_article = SopArticle.find(params[:id])
      sop_times = SopTime.all
      sop_categories = SopCategory.all
      offices = Office.all
      render json: { sop_article: sop_article, sop_times: sop_times, sop_categories: sop_categories, offices: offices, status: 'success' }
    end
  end

  def update
    if request.xhr?
      article = SopArticle.find(params[:id])
      article.update(safe_article_params)
      render json: { status: 'success' }
    end
  end

  def safe_article_params
    params.permit(:cms_title, :title, :responsibility_id, :responsible, :support, :article, :video_url, :sop_time_id, :sop_category_id)
  end
end
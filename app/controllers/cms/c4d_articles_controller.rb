class Cms::C4dArticlesController < ApplicationController
  def index
    if request.xhr?
      c4d_articles = C4dArticle.all
      users = {}
      User.all.each do |user|
        users[user.id] = user
      end
      c4d_articles.each do |article|
        article.owner_id = User.all.first.id
      end
      render json: { c4d_articles: c4d_articles, users: users, status: 'success' }
    end
  end

  def create
    if request.xhr?
      c4d_article = C4dArticle.new(safe_article_params)
      if c4d_article.save
        render json: { c4d_article: c4d_article, status: 'success' }
      end
    end
  end

  def show
    if request.xhr?
      c4d_article = C4dArticle.find(params[:id])
      c4d_subcategories = C4dSubcategory.all
      c4d_categories = C4dCategory.all
      offices = Office.all
      render json: { c4d_article: c4d_article, c4d_subcategories: c4d_subcategories, c4d_categories: c4d_categories, offices: offices, status: 'success' }
    end
  end

  def update
    if request.xhr?
      article = C4dArticle.find(params[:id])
      article.update(safe_article_params)
      render json: { status: 'success' }
    end
  end

  def safe_article_params
    params.permit(:cms_title, :title, :responsibility_id, :responsible, :support, :article, :video_url, :c4d_subcategory_id, :c4d_category_id)
  end
end
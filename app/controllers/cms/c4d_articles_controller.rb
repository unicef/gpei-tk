class Cms::C4dArticlesController < ApplicationController
  def index
    if request.xhr?
      c4d_articles = C4dArticle.all
      users = {}
      User.all.each { |user| users[user.id] = user }
      c4d_articles.each { |article| article.author_id = User.all.first.id }
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
      responsible_offices = ResponsibleOffice.all
      render json: { c4d_article: c4d_article, c4d_subcategories: c4d_subcategories, c4d_categories: c4d_categories, responsible_offices: responsible_offices, status: 'success' }
    end
  end

  def update
    if request.xhr?
      params.delete('reference_links')
      params.delete('template_links')
      article = C4dArticle.find(params[:id])
      article.update(safe_article_params)
      render json: { status: 'success' }
    end
  end

  def safe_article_params
    exclusion_keys = ['authenticity_token', 'format', 'reference_links', 'template_links']
    params.select { |key, value| !exclusion_keys.include?(key) }.permit(:cms_title, :title, :description, :c4d_subcategory_id, :c4d_category_id)
  end
end
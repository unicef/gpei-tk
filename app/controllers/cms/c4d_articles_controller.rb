class Cms::C4dArticlesController < ApplicationController
  def index
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        c4d_articles = C4dArticle.all.order(:order_id)
        users = {}
        User.all.each { |user| users[user.id] = user }
        render json: { c4d_articles: c4d_articles, users: users, status: 200 }
      end
    end
  end

  def create
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        c4d_article = C4dArticle.new(safe_article_params)
        c4d_article.order_id = C4dArticle.maximum(:order_id) + 1
        c4d_article.author = current_user
        if c4d_article.save
          render json: { c4d_article: c4d_article, status: 200 }
        end
      end
    end
  end

  def show
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        c4d_article = C4dArticle.find_by(id: params[:id])
        c4d_subcategories = C4dSubcategory.all
        c4d_categories = C4dCategory.all
        render json: { c4d_article: c4d_article, c4d_subcategories: c4d_subcategories, c4d_categories: c4d_categories, status: 200 }
      end
    end
  end

  def update
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        article = C4dArticle.find_by(id: params[:id])
        article.update(safe_article_params)
        render json: { status: 200 }
      end
    end
  end

  def publish
    if current_user.is_admin? || current_user.is_editor?
      c4d_article = C4dArticle.find_by(id: params['id'])
      c4d_article.update(published: !c4d_article.published)
    end
  end

  def safe_article_params
    params.require(:article).permit(:cms_title, :title, :content, :c4d_subcategory_id, :c4d_category_id)
  end
end
class C4dArticlesController < ApplicationController
  def index
    redirect_to c4d_selection_path
  end

  def show
    if request.xhr?
      if params['id'].nil?
        c4d_article = C4dArticle.where(title: params['title']).first
      else
        c4d_article = C4dArticle.where(id: params['id']).first
      end
      c4d_categories = C4dCategory.all
      c4d_related_topics = C4dArticle.where("c4d_subcategory_id = ? AND id != ?", c4d_article.c4d_subcategory_id, c4d_article.id)
      toolkit_articles = current_user.c4d_toolkit.c4d_articles if current_user
      c4d_subcategories = C4dSubcategory.all
      reference_links = c4d_article.reference_links
      render json: { status: 200,
                     article: c4d_article,
                     c4d_categories: c4d_categories,
                     c4d_subcategories: c4d_subcategories,
                     c4d_related_topics: c4d_related_topics,
                     current_user: current_user,
                     toolkit_articles: toolkit_articles,
                     reference_links: reference_links }
    else
      @user = current_user
      @img_name = 'C4D'
      if params['id'].nil?
        @c4d_article = C4dArticle.where(title: params['title']).first
      else
        @c4d_article = C4dArticle.where(id: params['id']).first
      end
      @c4d_categories = C4dCategory.all
      @c4d_related_topics = C4dArticle.where("c4d_subcategory_id = ? AND id != ?", @c4d_article.c4d_subcategory_id, @c4d_article.id)
    end
  end
end
class C4dArticlesController < ApplicationController
  def index
    redirect_to c4d_selection_path
  end

  def show
    if request.xhr?
      if params[:id] && !params_id_is_integer?
        c4d_article = C4dArticle.find_by(title: params[:id].gsub('_', ' '))
      elsif params[:id]
        c4d_article = C4dArticle.find_by(id: params['id'])
      end
      c4d_categories = C4dCategory.all.order(:id)
      c4d_related_topics = C4dArticle.where("published = true AND c4d_subcategory_id = ?", c4d_article.c4d_subcategory_id).order(:order_id)
      toolkit_articles = current_user.c4d_toolkit.c4d_articles if current_user
      c4d_subcategories = C4dSubcategory.all.order(:id)
      reference_links = c4d_article.reference_links.order(:document_file_name)
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
      if params[:id] && !params_id_is_integer?
        @c4d_article = C4dArticle.find_by(title: params[:id].gsub('-', ' '))
      elsif params[:id]
        @c4d_article = C4dArticle.find_by(id: params['id'])
      end
      @c4d_related_topics = C4dArticle.where("published = true AND c4d_subcategory_id = ? AND id != ?", @c4d_article.c4d_subcategory_id, @c4d_article.id).order(order_id: :asc)
    end
  end
end
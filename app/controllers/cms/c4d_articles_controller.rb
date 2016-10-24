class Cms::C4dArticlesController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    if request.xhr?
      c4d_articles = C4dArticle.all.order(:order_id)
      c4d_subcategories = C4dSubcategory.all.order(:id)
      render json: { c4d_articles: c4d_articles, c4d_subcategories: c4d_subcategories, status: 200 }
    end
  end

  def create
    if request.xhr?
      c4d_article = C4dArticle.new(safe_article_params)
      c4d_article.order_id = C4dArticle.maximum(:order_id) + 1
      c4d_article.author = current_user
      if c4d_article.save
        if !params[:article][:reference_links].nil?
          params[:article][:reference_links].each do |reference_id|
            ReferenceLinkArticle.create(reference_link_id: reference_id, reference_linkable: c4d_article)
          end
        end
        render json: { c4d_article: c4d_article, status: 200 }
      end
    end
  end

  def show
    if request.xhr?
      c4d_article = C4dArticle.find_by(id: params[:id])
      c4d_subcategories = C4dSubcategory.all
      c4d_categories = C4dCategory.all
      embedded_images = c4d_article.embedded_images
      selected_reference_links = c4d_article.reference_links
      render json: { c4d_article: c4d_article,
                     c4d_subcategories: c4d_subcategories,
                     c4d_categories: c4d_categories,
                     embedded_images: embedded_images,
                     selected_reference_links: selected_reference_links,
                     status: 200 }
    end
  end

  def update
    if request.xhr?
      c4d_article = C4dArticle.find_by(id: params[:id])
      if c4d_article
        ReferenceLinkArticle.where(reference_linkable: c4d_article).destroy_all
        if !params[:article][:reference_links].nil?
          c4d_article.reference_link_order = params[:reference_link_order].join(' ')
          params[:article][:reference_links].each do |reference_id|
            reference = ReferenceLink.find_by(id: reference_id)
            ReferenceLinkArticle.create(reference_link: reference, reference_linkable: c4d_article)
          end
        end
        c4d_article.update(safe_article_params)
        # if c4d_article.update(safe_article_params)
        #   c4d_article.update(published: false)
        # end
        render json: { status: 200 }
      end
    end
  end

  def publish
    c4d_article = C4dArticle.find_by(id: params['id'])
    if c4d_article.update(published: !c4d_article.published)
      render json: { status: 200 }
    end
  end

  def orderUp
    if request.xhr? && current_user.is_admin?
      c4d_article = C4dArticle.find_by(id: params[:id])
      current_order_id = c4d_article.order_id
      c4d_article_prev = C4dArticle.find_by(order_id: current_order_id - 1)
      if c4d_article.update(order_id: current_order_id - 1) && c4d_article_prev.update(order_id: current_order_id)
        render json: { status: 200, order_id: c4d_article.order_id }
      else
        render json: { status: 403 }
      end
    end
  end

  def orderDown
    if request.xhr? && current_user.is_admin?
      c4d_article = C4dArticle.find_by(id: params[:id])
      current_order_id = c4d_article.order_id
      c4d_article_next = C4dArticle.find_by(order_id: current_order_id + 1)
      if c4d_article.update(order_id: current_order_id + 1) && c4d_article_next.update(order_id: current_order_id)
        render json: { status: 200, order_id: c4d_article.order_id }
      else
        render json: { status: 403 }
      end
    end
  end

  private

  def safe_article_params
    params.require(:article).permit(:cms_title, :title, :content, :c4d_subcategory_id, :c4d_category_id)
  end
end
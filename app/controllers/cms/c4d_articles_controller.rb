class Cms::C4dArticlesController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    if request.xhr?
      c4d_articles = C4dArticle.all.order(:order_id)
      c4d_subcategories = C4dSubcategory.all.order(:id)
      c4d_categories = C4dCategory.all.order(:id)
      render json: { c4d_articles: c4d_articles, c4d_subcategories: c4d_subcategories, c4d_categories: c4d_categories, status: 200 }
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
      c4d_subcategories = C4dSubcategory.all.order(:id)
      c4d_categories = C4dCategory.all.order(:id)
      embedded_images = c4d_article.embedded_images
      selected_reference_links = c4d_article.reference_links
      selected_reference_mp3s = c4d_article.reference_mp3s
      selected_reference_pptxes = c4d_article.reference_pptxes
      render json: { c4d_article: c4d_article,
                     c4d_subcategories: c4d_subcategories,
                     c4d_categories: c4d_categories,
                     embedded_images: embedded_images,
                     selected_reference_links: selected_reference_links,
                     selected_reference_mp3s: selected_reference_mp3s,
                     selected_reference_pptxes: selected_reference_pptxes,
                     status: 200 }
    end
  end

  def update
    if request.xhr?
      c4d_article = C4dArticle.find_by(id: params[:id])
      if c4d_article
        attach_reference_links_to_c4d_article(c4d_article)
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

  def order_up
    if request.xhr? && current_user.is_admin?
      c4d_article = C4dArticle.find_by(id: params[:id])
      prev_c4d_article = C4dArticle.find_by(id: params[:prev_id])
      prev_c4d_article_order_id = prev_c4d_article.order_id
      prev_c4d_article.update(order_id: c4d_article.order_id)
      if c4d_article.update(order_id: prev_c4d_article_order_id)
        render json: { status: 200, current_c4d_article_order_id: c4d_article.order_id, prev_c4d_article_order_id: prev_c4d_article.order_id }
      else
        prev_c4d_article.update(order_id: prev_c4d_article_order_id)
        render json: { status: 403, error: 'something went wrong' }
      end
    end
  end

  def order_down
    if request.xhr? && current_user.is_admin?
      c4d_article = C4dArticle.find_by(id: params[:id])
      next_c4d_article = C4dArticle.find_by(id: params[:next_id])
      next_c4d_article_order_id = next_c4d_article.order_id
      next_c4d_article.update(order_id: c4d_article.order_id)
      if c4d_article.update(order_id: next_c4d_article_order_id)
        render json: { status: 200, current_c4d_article_order_id: c4d_article.order_id, next_c4d_article_order_id: next_c4d_article.order_id }
      else
        next_c4d_article.update(order_id: next_c4d_article_order_id)
        render json: { status: 403, error: 'something went wrong' }
      end
    end
  end

  private

  def attach_reference_links_to_c4d_article(c4d_article)
    ReferenceLinkArticle.where(reference_linkable: c4d_article).destroy_all
    if !params[:article][:reference_links].nil?
      params[:article][:reference_links].each do |reference_id|
        reference = ReferenceLink.find_by(id: reference_id)
        ReferenceLinkArticle.create(reference_link: reference, reference_linkable: c4d_article)
      end
      if !params[:reference_link_order].nil? && params[:reference_link_order][0] != ''
        c4d_article.reference_link_order = params[:reference_link_order].join(' ')
        ref_links = params[:article][:reference_links] - c4d_article.reference_link_order.split(' ')
        ref_links.each { |id| c4d_article.reference_link_order += " #{id}" } unless ref_links.empty?
      elsif !c4d_article.reference_links.empty?
        c4d_article.reference_link_order = c4d_article.reference_links.pluck(:id).join(' ')
      end
    end
  end

  def safe_article_params
    params.require(:article).permit(:title, :content, :c4d_subcategory_id, :c4d_category_id)
  end
end
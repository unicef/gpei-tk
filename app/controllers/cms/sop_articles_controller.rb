class Cms::SopArticlesController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    if request.xhr?
      sop_articles = SopArticle.all.order(:order_id)
      render json: { sop_articles: sop_articles, status: 200 }
    end
  end

  def create
    if request.xhr?
      sop_article = SopArticle.new(safe_article_params)
      sop_article.sop_icon = SopIcon.find_by(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id)
      sop_article.order_id = SopArticle.maximum(:order_id) + 1
      sop_article.author = current_user
      if sop_article.save
        if !params[:article][:reference_links].nil?
          params[:article][:reference_links].each do |reference_id|
            ReferenceLinkArticle.create(reference_link_id: reference_id, reference_linkable: sop_article)
          end
        end
        render json: { sop_article: sop_article, status: 200 }
      end
    end
  end

  def show
    if request.xhr?
      sop_article = SopArticle.find(params[:id])
      sop_times = SopTime.all
      sop_categories = SopCategory.all
      responsible_offices = ResponsibleOffice.all
      support_affiliations = SupportAffiliation.all
      selected_reference_links = sop_article.reference_links
      render json: { sop_article: sop_article,
                     sop_times: sop_times,
                     sop_categories: sop_categories,
                     responsible_offices: responsible_offices,
                     support_affiliations: support_affiliations,
                     selected_reference_links: selected_reference_links,
                     status: 200 }
    end
  end

  def update
    if request.xhr?
      sop_article = SopArticle.find_by(id: params[:id])
      ReferenceLinkArticle.where(reference_linkable: sop_article).destroy_all
      if !params[:article][:reference_links].nil?
        params[:article][:reference_links].each do |reference_id|
          reference = ReferenceLink.find_by(id: reference_id)
          ReferenceLinkArticle.create(reference_link: reference, reference_linkable: sop_article)
        end
      end
      sop_article.update(safe_article_params)
      # if sop_article.update(safe_article_params)
      #   sop_article.update(published: false)
      # end
      render json: { status: 200 }
    end
  end

  def publish
    sop_article = SopArticle.find_by(id: params['id'])
    if sop_article.update(published: !sop_article.published)
      render json: { status: 200 }
    end
  end

  def orderUp
    sop_article = SopArticle.find_by(id: params[:id])
    current_order_id = sop_article.order_id
    sop_article_prev = SopArticle.find_by(order_id: current_order_id - 1)
    if sop_article.update(order_id: current_order_id - 1) && sop_article_prev.update(order_id: current_order_id)
      render json: { status: 200, order_id: sop_article.order_id }
    else
      render json: { status: 403 }
    end
  end

  def orderDown
    sop_article = SopArticle.find_by(id: params[:id])
    current_order_id = sop_article.order_id
    sop_article_next = SopArticle.find_by(order_id: current_order_id + 1)
    if sop_article.update(order_id: current_order_id + 1) && sop_article_next.update(order_id: current_order_id)
      render json: { status: 200, order_id: sop_article.order_id }
    else
      render json: { status: 403 }
    end
  end

  private

  def safe_article_params
    params.require(:article).permit(:cms_title, :title, :responsible, :support, :responsible_office_id, :support_affiliation_id, :content, :video_url, :sop_time_id, :sop_category_id)
  end
end
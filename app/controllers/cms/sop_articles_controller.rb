class Cms::SopArticlesController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    if request.xhr?
      sop_articles = SopArticle.all.order(:order_id)
      sop_time_periods = SopTime.all.order(:id)
      sop_categories = SopCategory.all.order(:id)
      render json: { sop_articles: sop_articles, sop_time_periods: sop_time_periods, sop_categories: sop_categories, status: 200 }
    end
  end

  def create
    if request.xhr?
      sop_article = SopArticle.new(safe_article_params)
      sop_article.order_id = SopArticle.maximum(:order_id) + 1
      sop_article.author = current_user
      if sop_article.save
        icon_title = SopIcon.find_by(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id).title
        SopIcon.where(sop_article_id: sop_article.id).destroy_all
        SopIcon.create(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id, sop_article_id: sop_article.id, title: icon_title)
        attachReferenceLinksToSopArticle(sop_article) unless params[:article][:reference_links].nil?
        attachReferenceMp3sToSopArticle(sop_article) unless params[:article][:reference_mp3s].nil?
        attachReferencePptxesToSopArticle(sop_article) unless params[:article][:reference_pptxes].nil?
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
      selected_reference_mp3s = sop_article.reference_mp3s
      selected_reference_pptxes = sop_article.reference_pptxes
      reference_mp3s = ReferenceMp3.all
      reference_pptxes = ReferencePptx.all
      render json: { sop_article: sop_article,
                     sop_times: sop_times,
                     sop_categories: sop_categories,
                     responsible_offices: responsible_offices,
                     support_affiliations: support_affiliations,
                     selected_reference_links: selected_reference_links,
                     selected_reference_mp3s: selected_reference_mp3s,
                     selected_reference_pptxes: selected_reference_pptxes,
                     reference_pptxes: reference_pptxes,
                     reference_mp3s: reference_mp3s,
                     status: 200 }
    end
  end

  def update
    if request.xhr?
      sop_article = SopArticle.find_by(id: params[:id])
      attachReferenceLinksToSopArticle(sop_article)
      attachReferenceMp3sToSopArticle(sop_article)
      attachReferencePptxesToSopArticle(sop_article)
      sop_article.update(safe_article_params)
      icon_title = SopIcon.find_by(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id).title
      SopIcon.where(sop_article_id: sop_article.id).destroy_all
      SopIcon.create(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id, sop_article_id: sop_article.id, title: icon_title)
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
    if request.xhr? && current_user.is_admin?
      sop_article = SopArticle.find_by(id: params[:id])
      current_order_id = sop_article.order_id
      sop_article_prev = SopArticle.find_by(order_id: current_order_id - 1)
      if sop_article.update(order_id: current_order_id - 1) && sop_article_prev.update(order_id: current_order_id)
        render json: { status: 200, order_id: sop_article.order_id }
      else
        render json: { status: 403 }
      end
    end
  end

  def orderDown
    if request.xhr? && current_user.is_admin?
      sop_article = SopArticle.find_by(id: params[:id])
      current_order_id = sop_article.order_id
      sop_article_next = SopArticle.find_by(order_id: current_order_id + 1)
      if sop_article.update(order_id: current_order_id + 1) && sop_article_next.update(order_id: current_order_id)
        render json: { status: 200, order_id: sop_article.order_id }
      else
        render json: { status: 403 }
      end
    end
  end

  private

  def attachReferenceLinksToSopArticle(sop_article)
    ReferenceLinkArticle.where(reference_linkable: sop_article).destroy_all
    if !params[:article][:reference_links].nil?
      params[:article][:reference_links].each do |reference_id|
        reference = ReferenceLink.find_by(id: reference_id)
        ReferenceLinkArticle.create(reference_link: reference, reference_linkable: sop_article)
      end
      if !(!params[:reference_link_order].nil? && params[:reference_link_order][0] == '')
        sop_article.reference_link_order = params[:reference_link_order].join(' ')
      elsif !sop_article.reference_links.empty?
        sop_article.reference_link_order = sop_article.reference_links.pluck(:id).join(' ')
      end
    end
  end

  def attachReferenceMp3sToSopArticle(sop_article)
    ReferenceMp3Article.where(reference_mp3able: sop_article).destroy_all
    if !params[:article][:reference_mp3s].nil?
      params[:article][:reference_mp3s].each do |reference_id|
        reference = ReferenceMp3.find_by(id: reference_id)
        ReferenceMp3Article.create(reference_mp3: reference, reference_mp3able: sop_article)
      end
      if !(!params[:reference_mp3_order].nil? && params[:reference_mp3_order][0] == '')
        sop_article.reference_mp3_order = params[:reference_mp3_order].join(' ')
      elsif !sop_article.reference_mp3s.empty?
        sop_article.reference_mp3_order = sop_article.reference_mp3s.pluck(:id).join(' ')
      end
    end
  end

  def attachReferencePptxesToSopArticle(sop_article)
    ReferencePptxArticle.where(reference_pptxable: sop_article).destroy_all
    if !params[:article][:reference_pptxes].nil?
      params[:article][:reference_pptxes].each do |reference_id|
        reference = ReferencePptx.find_by(id: reference_id)
        ReferencePptxArticle.create(reference_pptx: reference, reference_pptxable: sop_article)
      end
      if !(!params[:reference_pptx_order].nil? && params[:reference_pptx_order][0] == '')
        sop_article.reference_pptx_order = params[:reference_pptx_order].join(' ')
      elsif !sop_article.reference_pptxes.empty?
        sop_article.reference_pptx_order = sop_article.reference_pptxes.pluck(:id).join(' ')
      end
    end
  end

  def safe_article_params
    params.require(:article).permit(:title, :responsible, :support, :responsible_office_id, :support_affiliation_id, :content, :video_url, :sop_time_id, :sop_category_id)
  end
end
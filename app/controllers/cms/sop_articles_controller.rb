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
        attach_reference_links_to_sop_article(sop_article) unless params[:article][:reference_links].nil?
        attach_reference_mp3s_to_sop_article(sop_article) unless params[:article][:reference_mp3s].nil?
        attach_reference_pptxes_to_sop_article(sop_article) unless params[:article][:reference_pptxes].nil?
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
      attach_reference_links_to_sop_article(sop_article)
      attach_reference_mp3s_to_sop_article(sop_article)
      attach_reference_pptxes_to_sop_article(sop_article)
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

  def order_up
    if request.xhr? && current_user.is_admin?
      sop_article = SopArticle.find_by(id: params[:id])
      prev_sop_article = SopArticle.find_by(id: params[:prev_id])
      prev_sop_article_order_id = prev_sop_article.order_id
      prev_sop_article.update(order_id: sop_article.order_id)
      if sop_article.update(order_id: prev_sop_article_order_id)
        render json: { status: 200, current_sop_article_order_id: sop_article.order_id, prev_sop_article_order_id: prev_sop_article.order_id }
      else
        prev_sop_article.update(order_id: prev_sop_article_order_id)
        render json: { status: 403, error: 'something went wrong' }
      end
    end
  end

  def order_down
    if request.xhr? && current_user.is_admin?
      sop_article = SopArticle.find_by(id: params[:id])
      next_sop_article = SopArticle.find_by(id: params[:next_id])
      next_sop_article_order_id = next_sop_article.order_id
      next_sop_article.update(order_id: sop_article.order_id)
      if sop_article.update(order_id: next_sop_article_order_id)
        render json: { status: 200, current_sop_article_order_id: sop_article.order_id, next_sop_article_order_id: next_sop_article.order_id }
      else
        next_sop_article.update(order_id: next_sop_article_order_id)
        render json: { status: 403, error: 'something went wrong' }
      end
    end
  end

  private

  def attach_reference_links_to_sop_article(sop_article)
    ReferenceLinkArticle.where(reference_linkable: sop_article).destroy_all
    if !params[:article][:reference_links].nil?
      params[:article][:reference_links].each do |reference_id|
        reference = ReferenceLink.find_by(id: reference_id)
        ReferenceLinkArticle.create(reference_link: reference, reference_linkable: sop_article)
      end
      if !params[:reference_link_order].nil? && params[:reference_link_order][0] != ''
        sop_article.reference_link_order = params[:reference_link_order].join(' ')
        ref_links = params[:article][:reference_links] - sop_article.reference_link_order.split(' ')
        ref_links.each { |id| sop_article.reference_link_order += " #{id}" } unless ref_links.empty?
      elsif !sop_article.reference_links.empty?
        sop_article.reference_link_order = sop_article.reference_links.pluck(:id).join(' ')
      end
    end
  end

  def attach_reference_mp3s_to_sop_article(sop_article)
    ReferenceMp3Article.where(reference_mp3able: sop_article).destroy_all
    if !params[:article][:reference_mp3s].nil?
      params[:article][:reference_mp3s].each do |reference_id|
        reference = ReferenceMp3.find_by(id: reference_id)
        ReferenceMp3Article.create(reference_mp3: reference, reference_mp3able: sop_article)
      end
      if !params[:reference_mp3_order].nil? && params[:reference_mp3_order][0] != ''
        sop_article.reference_mp3_order = params[:reference_mp3_order].join(' ')
        ref_mp3s = params[:article][:reference_mp3s] - sop_article.reference_mp3_order.split(' ')
        ref_mp3s.each { |id| sop_article.reference_mp3_order += " #{id}" } unless ref_mp3s.empty?
      elsif !sop_article.reference_mp3s.empty?
        sop_article.reference_mp3_order = sop_article.reference_mp3s.pluck(:id).join(' ')
      end
    end
  end

  def attach_reference_pptxes_to_sop_article(sop_article)
    ReferencePptxArticle.where(reference_pptxable: sop_article).destroy_all
    if !params[:article][:reference_pptxes].nil?
      params[:article][:reference_pptxes].each do |reference_id|
        reference = ReferencePptx.find_by(id: reference_id)
        ReferencePptxArticle.create(reference_pptx: reference, reference_pptxable: sop_article)
      end
      if !params[:reference_pptx_order].nil? && params[:reference_pptx_order][0] != ''
        sop_article.reference_pptx_order = params[:reference_pptx_order].join(' ')
        ref_pptxes = params[:article][:reference_pptxes] - sop_article.reference_pptx_order.split(' ')
        ref_pptxes.each { |id| sop_article.reference_pptx_order += " #{id}" } unless ref_pptxes.empty?
      elsif !sop_article.reference_pptxes.empty?
        sop_article.reference_pptx_order = sop_article.reference_pptxes.pluck(:id).join(' ')
      end
    end
  end

  def safe_article_params
    params.require(:article).permit(:title, :responsible, :support, :responsible_office_id, :support_affiliation_id, :content, :video_url, :sop_time_id, :sop_category_id)
  end
end
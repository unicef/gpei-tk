class Cms::FeaturedReferencesController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    if request.xhr?
      reference_links = ReferenceLink.joins(:featured_references).all.order(:document_file_name)
      reference_link_categories = getReferenceLinkCategories(reference_links)
      categories = { sop_categories: SopCategory.all, c4d_categories: C4dCategory.all }
      render json: { reference_links: reference_links,
                     reference_link_categories: reference_link_categories,
                     categories: categories,
                     status: 200 }
    end
  end

  def create
    if request.xhr?
      FeaturedReference.destroy_all
      params[:reference_link][:featured_links].each do |id|
        FeaturedReference.create(reference_link_id: id)
      end
      render json: { status: 200 }
    end
  end

  def destroy
    if request.xhr? && current_user.is_admin?
      featured_reference_link = FeaturedReference.find_by(reference_link_id: params[:id])
      if !featured_reference_link.nil?
        featured_reference_link.destroy
        render json: { status: 200 }
      end
    end
  end

  private

  def getReferenceLinkCategories(reference_links)
    reference_link_categories = {}
    reference_links.each do |reference_link|
      links = ReferenceLinkArticle.where(reference_link_id: reference_link.id)
      if !links.empty?
        reference_link_categories[reference_link.id] = []
        links.each do |link|
          if link.reference_linkable.has_attribute?(:sop_category_id)
            reference_link_categories[reference_link.id] << { details: link.reference_linkable.sop_time.period + ' > ' + link.reference_linkable.sop_category.title + ' > ' + link.reference_linkable.order_id.to_s, category: link.reference_linkable.sop_category.title }
          else
            reference_link_categories[reference_link.id] << { details: link.reference_linkable.c4d_category.title + ' > '+ link.reference_linkable.c4d_subcategory.title + ' > ' + link.reference_linkable.order_id.to_s, category: link.reference_linkable.c4d_category.title }
          end
        end
      end
    end
    reference_link_categories
  end

end
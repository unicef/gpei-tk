class Cms::ReferenceLinksController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    reference_links = ReferenceLink.all.order(:document_file_name)
    reference_link_categories = getReferenceLinkCategories(reference_links)
    categories = { sop_categories: SopCategory.all, c4d_categories: C4dCategory.all }
    render json: { reference_links: reference_links, reference_link_categories: reference_link_categories, categories: categories, status: 200 }
  end

  def create
    if request.xhr?
      errors = []
      params[:reference_link].each do |document|
        if ReferenceLink.find_by(document_file_name: document[1].original_filename).nil?
          reference_link = ReferenceLink.new(author_id: current_user.id,
                                            document: document[1],
                                            language: params[:language])
          reference_link.absolute_url = reference_link.document.url
          if !reference_link.save
            errors << reference_link.errors
          end
        else
          errors << "reference link already exists"
        end
      end
      if errors.empty?
        render json: { status: 200 }
      else
        render json: { status: 403, error: 'duplicate files not allowed' }
      end
    end
  end

  def update
    if request.xhr?
      reference_link = ReferenceLink.find_by(id: params[:id])
      if reference_link.update(safe_reference_link_params)
        render json: { status: 200,
                       id: reference_link.id,
                       description: reference_link.description,
                       title: reference_link.title,
                       common_languages: reference_link.common_languages,
                       places: reference_link.places }
      else
        render json: { status: 403 }
      end
    end
  end

  def destroy
    if request.xhr? && current_user.is_admin?
      reference_link = ReferenceLink.find_by(id: params[:id])
      if !reference_link.nil?
        reference_link.destroy
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

  def safe_reference_link_params
    params.require(:reference_link).permit(:description, :title, :common_languages, :places)
  end
end
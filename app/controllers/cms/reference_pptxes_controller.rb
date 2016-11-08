class Cms::ReferencePptxesController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    reference_pptxes = ReferencePptx.all.order(:document_file_name)
    reference_pptx_categories = getReferencePptxCategories(reference_pptxes)
    categories = { sop_categories: SopCategory.all, c4d_categories: C4dCategory.all }
    render json: { reference_pptxes: reference_pptxes, reference_pptx_categories: reference_pptx_categories, categories: categories, status: 200 }
  end

  def create
    if request.xhr?
      errors = []
      params[:reference_pptx].each do |document|
        if ReferencePptx.find_by(document_file_name: document[1].original_filename).nil?
          reference_pptx = ReferencePptx.new(author_id: current_user.id,
                                            document: document[1],
                                            language: params[:language])
          reference_pptx.absolute_url = reference_pptx.document.url
          if !reference_pptx.save
            errors << reference_pptx.errors
          end
        else
          errors << "reference pptx already exists"
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
      reference_pptx = ReferencePptx.find_by(id: params[:id])
      if reference_pptx.update(safe_reference_pptx_params)
        render json: { status: 200, id: reference_pptx.id, description: reference_pptx.description, title: reference_pptx.title }
      else
        render json: { status: 403 }
      end
    end
  end

  def destroy
    if request.xhr? && current_user.is_admin?
      reference_pptx = ReferencePptx.find_by(id: params[:id])
      if !reference_pptx.nil?
        reference_pptx.destroy
        render json: { status: 200 }
      end
    end
  end

  private

  def getReferencePptxCategories(reference_pptxes)
    reference_pptx_categories = {}
    reference_pptxes.each do |reference_pptx|
      links = ReferencePptxArticle.where(reference_pptx_id: reference_pptx.id)
      if !links.empty?
        reference_pptx_categories[reference_pptx.id] = []
        links.each do |link|
          if link.reference_pptxable.has_attribute?(:sop_category_id)
            reference_pptx_categories[reference_pptx.id] << { details: link.reference_pptxable.sop_time.period + ' > ' + link.reference_pptxable.sop_category.title + ' > ' + link.reference_pptxable.order_id.to_s, category: link.reference_pptxable.sop_category.title }
          else
            reference_pptx_categories[reference_pptx.id] << { details: link.reference_pptxable.c4d_category.title + ' > '+ link.reference_pptxable.c4d_subcategory.title + ' > ' + link.reference_pptxable.order_id.to_s, category: link.reference_pptxable.c4d_category.title }
          end
        end
      end
    end
    reference_pptx_categories
  end

  def safe_reference_pptx_params
    params.require(:reference_pptx).permit(:description, :title)
  end
end
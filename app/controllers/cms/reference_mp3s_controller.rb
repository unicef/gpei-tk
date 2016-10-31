class Cms::ReferenceMp3sController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    reference_mp3s = ReferenceMp3.all.order(:clip_file_name)
    reference_mp3_categories = getReferenceMp3Categories(reference_mp3s)
    render json: { reference_mp3s: reference_mp3s, reference_mp3_categories: reference_mp3_categories, status: 200 }
  end

  def create
    if request.xhr?
      errors = []
      params[:reference_mp3].each do |clip|
        if ReferenceMp3.find_by(clip_file_name: clip[1].original_filename).nil?
          reference_mp3 = ReferenceMp3.new(author_id: current_user.id,
                                            clip: clip[1],
                                            language: params[:language])
          reference_mp3.absolute_url = reference_mp3.clip.url
          if !reference_mp3.save
            errors << clip.errors
          end
        else
          errors << "reference mp3 already exists"
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
      reference_mp3 = ReferenceMp3.find_by(id: params[:id])
      if reference_mp3.update(safe_reference_mp3_params)
        render json: { status: 200, id: reference_mp3.id, description: reference_mp3.description, title: reference_mp3.title }
      else
        render json: { status: 403 }
      end
    end
  end

  def destroy
    if request.xhr? && current_user.is_admin?
      reference_mp3 = ReferenceMp3.find_by(id: params[:id])
      if !reference_mp3.nil?
        reference_mp3.destroy
        render json: { status: 200 }
      end
    end
  end

  private

  def getReferenceMp3Categories(reference_mp3s)
    reference_mp3_categories = {}
    reference_mp3s.each do |reference_mp3|
      links = ReferenceMp3Article.where(reference_mp3_id: reference_mp3.id)
      if !links.empty?
        reference_mp3_categories[reference_mp3.id] = []
        links.each do |link|
          if link.reference_mp3able.has_attribute?(:sop_category_id)
            reference_mp3_categories[reference_mp3.id] << { details: link.reference_mp3able.sop_time.period + ' > ' + link.reference_mp3able.sop_category.title + ' > ' + link.reference_mp3able.order_id.to_s, category: link.reference_mp3able.sop_category.title }
          else
            reference_mp3_categories[reference_mp3.id] << { details: link.reference_mp3able.c4d_category.title + ' > '+ link.reference_mp3able.c4d_subcategory.title + ' > ' + link.reference_mp3able.order_id.to_s, category: link.reference_mp3able.c4d_category.title }
          end
        end
      end
    end
    reference_mp3_categories
  end

  def safe_reference_mp3_params
    params.require(:reference_mp3).permit(:description, :title)
  end
end
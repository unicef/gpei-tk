class Cms::ReferenceLinksController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    reference_links = ReferenceLink.all.order(:document_file_name)
    render json: { reference_links: reference_links, status: 200 }
  end

  def create
    if request.xhr?
      if ReferenceLink.find_by(document_file_name: params[:reference_link][:document].original_filename).nil?
        reference_link = ReferenceLink.new(author_id: current_user.id,
                                          document: params[:reference_link][:document],
                                          language: params[:reference_link][:language])
        reference_link.absolute_url = reference_link.document.url
        if reference_link.save
          render json: { status: 200 }
        end
      else
        render json: { status: 403, error: 'duplicate files not allowed' }
      end
    end
  end

  def update
    if request.xhr?
      reference_link = ReferenceLink.find_by(id: params[:id])
      if reference_link.update(description: params[:reference_link][:description])
        render json: { status: 200 }
      else
        render json: { status: 403 }
      end
    end
  end

  def safe_reference_link_params
    params.require(:reference_link).permit(:description)
  end
end
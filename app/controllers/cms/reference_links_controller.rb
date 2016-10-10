class Cms::ReferenceLinksController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    reference_links = ReferenceLink.all.order(:document_file_name)
    render json: { reference_links: reference_links, status: 200 }
  end

  def create
    if request.xhr?
      reference_link = ReferenceLink.new(author_id: current_user.id,
                                        document: params[:reference_link][:document],
                                        language: params[:reference_link][:language])
      reference_link.absolute_url = reference_link.document.url
      if reference_link.save
        render json: { status: 200 }
      else
        render json: { status: 403 }
      end
    end
  end

  def update
    if request.xhr?
      reference_link = ReferenceLink.find_by(params[:reference_link][:id])
      reference_link.description.update_attribute(description: params[:reference_link][:description])
      if reference_link.save
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
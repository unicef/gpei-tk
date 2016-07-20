class Cms::ReferenceLinksController < ApplicationController
  def index
    reference_links = ReferenceLink.all
    render json: { reference_links: reference_links, status: 200 }
  end

  def create
    reference_link = ReferenceLink.new(author_id: current_user.id,
                      document: params[:reference_link][:document],
                      language: params[:reference_link][:language])
    reference_link.url = reference_link.document.url
    if reference_link.save
      render json: { status: 200 }
    else
      render json: { status: 403 }
    end
  end
end
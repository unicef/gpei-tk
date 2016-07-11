class Cms::ReferenceLinksController < ApplicationController
  def index
    reference_links = ReferenceLink.all
    render json: { reference_links: reference_links, status: 200 }
  end

  def show
  end
end
class Cms::TemplateLinksController < ApplicationController
  def index
    template_links = TemplateLink.all
    render json: { template_links: template_links, status: 200 }
  end

  def show
  end
end
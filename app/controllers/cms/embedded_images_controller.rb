class Cms::EmbeddedImagesController < ApplicationController
  before_action :user_is_admin_or_editor?

  def create
    embedded_image = EmbeddedImage.new(
                      image: params[:embedded_image][:image],
                      c4d_article_id: params[:embedded_image][:article_id])
    embedded_image.absolute_url = embedded_image.image.url
    if embedded_image.save
      render json: { status: 200 }
    else
      render json: { status: 403 }
    end
  end
end
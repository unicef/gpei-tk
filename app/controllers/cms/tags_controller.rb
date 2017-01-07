class Cms::TagsController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    tags = Tag.all
    render json: { tags: tags, status: 200 }
  end

  def create
    tag = Tag.where(title: params[:tag][:title]).first_or_create
    render json: { tag: tag, status: 200 }
  end

  def destroy
    tag = Tag.find_by(id: params[:id])
    if tag
      TagReference.where(tag_id: tag.id).destroy_all
      tag.destroy
      render json: { status: 200 }
    end
  end
end
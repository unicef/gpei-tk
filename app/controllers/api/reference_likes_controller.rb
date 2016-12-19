class Api::ReferenceLikesController < ApplicationController
  def create
    user = current_user
    if user
      like_ids = Like.where(author_id: current_user).pluck(:id)
      reference = ReferenceLink.find_by(id: params[:id])
      if like_ids.empty?
        like = Like.create(author: current_user)
        reference_like = ReferenceLike.create(like_id: like.id,
                                              reference_likeable_id: reference.id,
                                              reference_likeable_type: reference.class.model_name.name)
      else
        reference_likes = ReferenceLike.where(like_id: like_ids,
                                              reference_likeable_id: reference.id,
                                              reference_likeable_type: reference.class.model_name.name)
        if reference_likes.empty?
          like = Like.create(author: current_user)
          reference_like = ReferenceLike.create(like_id: like.id,
                                                reference_likeable_id: reference.id,
                                                reference_likeable_type: reference.class.model_name.name)
         end
      end
      render json: { status: 200 }
    else
      render json: { status: 403 }
    end
  end
end
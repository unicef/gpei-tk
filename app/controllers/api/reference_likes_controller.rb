class Api::ReferenceLikesController < ApplicationController
  def create
    user = current_user
    reference = ReferenceLink.find_by(id: params[:id])
    if reference
      if user
        like_ids = Like.where(author_id: user).pluck(:id)
        if like_ids.empty?
          like = Like.create(author: user)
          reference_like = ReferenceLike.create(like_id: like.id,
                                                reference_likeable_id: reference.id,
                                                reference_likeable_type: reference.class.model_name.name)
        else
          reference_likes = ReferenceLike.where(like_id: like_ids,
                                                reference_likeable_id: reference.id,
                                                reference_likeable_type: reference.class.model_name.name)
          if reference_likes.empty?
            like = Like.create(author: user)
            reference_like = ReferenceLike.create(like_id: like.id,
                                                  reference_likeable_id: reference.id,
                                                  reference_likeable_type: reference.class.model_name.name)
           end
        end
      else
        user = User.find_by(email: 'guest_not_signed_in@unicef.org')
        like = Like.create(author: user)
        reference_like = ReferenceLike.create(like_id: like.id,
                                              reference_likeable_id: reference.id,
                                              reference_likeable_type: reference.class.model_name.name)
      end
      reference_like_count = ReferenceLike.where(reference_likeable_id: reference.id,
                                                 reference_likeable_type: reference.class.model_name.name).count
      render json: { status: 200, like_count: reference_like_count }
    else
      render json: { status: 403 }
    end
  end
end
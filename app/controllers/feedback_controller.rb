class FeedbackController < ApplicationController
  def create
    if request.xhr?
      if current_user
        Feedback.create(author: current_user, content: params[:feedback][:content].strip)
        render json: { status: 200 }
      else
        render json: { status: 403, error: 'You must be logged in to submit feedback' }
      end
    end
  end
end

class Cms::FeedbacksController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    #yes there is no plural for feedback.
    feedbacks = Feedback.all
    render json: { status: 200, feedbacks: feedbacks }
  end
end
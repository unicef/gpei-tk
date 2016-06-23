class Api::SopTimesController < ApplicationController
  def index
    if request.xhr?
      sop_times = SopTime.all
      render json: { sop_times: sop_times, status: 'success' }
    end
  end
end
class Api::OfficesController < ApplicationController
  def index
    if request.xhr?
      offices = Office.all
      render json: { offices: offices, status: 'success' }
    end
  end
end
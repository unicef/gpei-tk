class Api::ResponsibleOfficesController < ApplicationController
  def index
    responsible_offices = ResponsibleOffice.all
    render json: { responsible_offices: responsible_offices, status: 'success' }
  end
end
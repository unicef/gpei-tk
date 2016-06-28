class Api::SopCategoriesController < ApplicationController
  def index
    sop_categories = SopCategory.all
    render json: { sop_categories: sop_categories, status: 'success' }
  end
end
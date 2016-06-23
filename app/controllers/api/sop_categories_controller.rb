class Api::SopCategoriesController < ApplicationController
  def index
    if request.xhr?
      sop_categories = SopCategory.all
      render json: { sop_categories: sop_categories, status: 'success' }
    end
  end
end
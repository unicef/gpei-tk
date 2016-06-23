class Api::C4dCategoriesController < ApplicationController
  def index
    if request.xhr?
      c4d_categories = C4dCategory.all
      render json: { c4d_categories: c4d_categories, status: 'success' }
    end
  end
end
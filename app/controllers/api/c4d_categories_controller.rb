class Api::C4dCategoriesController < ApplicationController
  def index
    c4d_categories = C4dCategory.all
    render json: { c4d_categories: c4d_categories, status: 200 }
  end
end
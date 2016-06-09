class C4dController < ApplicationController
  def index
    @c4d_categories = C4dCategory.all
    @img_name = 'C4D'
  end
end
class SopController < ApplicationController
  def index
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @offices = Office.all
    @sop_articles = SopArticle.all
    @user = User.all.first
  end
end
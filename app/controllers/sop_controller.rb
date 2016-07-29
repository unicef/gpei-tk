class SopController < ApplicationController
  def index
    @img_name = 'SOP'
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @responsible_offices = ResponsibleOffice.all
    @sop_articles = SopArticle.where(published: true).order(sop_time_id: :asc, sop_category_id: :asc)
    @user = current_user
  end
end
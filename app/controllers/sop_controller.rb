class SopController < ApplicationController
  before_action do |controller|
    @is_sop = true
    @nav_bar_offset = 'col-md-offset-2'
    @user = current_user
  end

  def index
    @backgrounds = { index: '#904941', wtdw: nil, overview: nil, borders: 'sop_active_borders' }
  end

  def whatToDoWhen
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @responsible_offices = ResponsibleOffice.all
    @sop_articles = SopArticle.where(published: true).order(order_id: :asc)
    @backgrounds = { index: nil, wtdw: '#8D3733', overview: nil, borders: 'sop_active_borders' }
  end

  def overview
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @backgrounds = { index: nil, wtdw: nil, overview: '#B74D43', borders: 'sop_active_borders' }
  end
end
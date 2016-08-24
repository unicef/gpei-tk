class SopController < ApplicationController
  def index
    @is_sop = true
    @nav_bar_offset = 'col-md-offset-2'
    @user = current_user
    @backgrounds = { index: '#B12924', wtdw: nil, overview: nil, borders: 'sop_active_borders' }
  end

  def whatToDoWhen
    @is_sop = true
    @nav_bar_offset = 'col-md-offset-2'
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @responsible_offices = ResponsibleOffice.all
    @sop_articles = SopArticle.where(published: true).order(order_id: :asc)
    @user = current_user
    @backgrounds = { index: nil, wtdw: '#B12924', overview: nil, borders: 'sop_active_borders' }
  end

  def overview
    @is_sop = true
    @nav_bar_offset = 'col-md-offset-2'
    @user = current_user
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @backgrounds = { index: nil, wtdw: nil, overview: '#B12924', borders: 'sop_active_borders' }
  end
end
class SopController < ApplicationController
  before_action do |controller|
    @is_sop = true
    @nav_bar_offset = 'col-md-offset-1'
    @user = current_user
  end

  def index
    @backgrounds = { index: '#904941', wtdw: nil, overview: nil, borders: 'active' }
  end

  def whatToDoWhen
    @loadSopArticle = true unless params[:id].nil?
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @responsible_offices = ResponsibleOffice.all
    @sop_articles = SopArticle.where(published: true).order(order_id: :asc)
    @backgrounds = { index: nil, wtdw: '#8D3733', overview: nil, borders: 'active' }
    request.env['PATH_INFO'] = '/sop/what_do_when/'
  end

  def overview
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @backgrounds = { index: nil, wtdw: nil, overview: '#B74D43', borders: 'active' }
  end
end
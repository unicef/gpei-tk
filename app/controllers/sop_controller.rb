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
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @responsible_offices = ResponsibleOffice.all
    @sop_articles = SopArticle.where(published: true).order(order_id: :asc)
    @backgrounds = { index: nil, wtdw: '#8D3733', overview: nil, borders: 'active' }
  end

  def overview
    @sop_times = SopTime.all
    @sop_categories = SopCategory.all
    @reference_part_one = ReferenceLink.where(document_file_name: 'Responding_to_a_poliovirus_event_and_outbreak_SOPs_part_1-April_2016.pdf')
    @reference_part_two = ReferenceLink.find_by(document_file_name: 'Responding_to_a_poliovirus_event_and_outbreak_SOPs_part_2-April_2016.pdf')
    @backgrounds = { index: nil, wtdw: nil, overview: '#B74D43', borders: 'active' }
  end
end
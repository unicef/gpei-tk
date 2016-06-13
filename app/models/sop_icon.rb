class SopIcon < ActiveRecord::Base
  belongs_to :sop_time
  belongs_to :sop_category
  belongs_to :sop_article
end
class SopCategory < ActiveRecord::Base
  has_one :sop_icon
  validates_uniqueness_of :title
end
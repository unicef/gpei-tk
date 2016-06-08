class SopTime < ActiveRecord::Base
  validates_uniqueness_of :period
end
class SopTime < ApplicationRecord
  validates_uniqueness_of :period
end
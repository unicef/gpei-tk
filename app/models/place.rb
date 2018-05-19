class Place < ApplicationRecord
  belongs_to :place_reference
  validates_uniqueness_of :title
end
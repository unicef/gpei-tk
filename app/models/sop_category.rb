class SopCategory < ApplicationRecord
  validates_uniqueness_of :title
end
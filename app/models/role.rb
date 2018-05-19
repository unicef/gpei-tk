class Role < ApplicationRecord
  validates_uniqueness_of :title
end
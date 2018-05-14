class Tag < ApplicationRecord
  belongs_to :tag_reference
  validates_uniqueness_of :title
end
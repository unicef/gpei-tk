class Type < ApplicationRecord
  belongs_to :reference_link
  validates_uniqueness_of :title
end
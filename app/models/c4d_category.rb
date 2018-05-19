class C4dCategory < ApplicationRecord
  has_many :c4d_subcategories
  validates_uniqueness_of :title
end
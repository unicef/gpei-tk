class C4dSubcategory < ApplicationRecord
  belongs_to :c4d_category
  validates_uniqueness_of :title
end
class C4dSubcategory < ActiveRecord::Base
  belongs_to :c4d_category
  has_one :c4d_icon
  validates_uniqueness_of :title
end
class C4dSubcategory < ActiveRecord::Base
  belongs_to :c4d_category
  validates_uniqueness_of :title
end
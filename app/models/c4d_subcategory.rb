class C4dSubcategory < ActiveRecord::Base
  validates_uniqueness_of :title
end
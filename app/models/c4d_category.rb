class C4dCategory < ActiveRecord::Base
  has_many :c4d_subcategories
  validates_uniqueness_of :title
end
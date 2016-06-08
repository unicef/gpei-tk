class C4dCategory < ActiveRecord::Base
  validates_uniqueness_of :title
end
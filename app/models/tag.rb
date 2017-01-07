class Tag < ActiveRecord::Base
  belongs_to :tag_references
  validates_uniqueness_of :title
end
class Place < ActiveRecord::Base
  belongs_to :place_references
  validates_uniqueness_of :title
  validates_presence_of :title
end
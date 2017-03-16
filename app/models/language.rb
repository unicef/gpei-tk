class Language < ActiveRecord::Base
  belongs_to :language_references
  validates_uniqueness_of :title
end
class Language < ApplicationRecord
  belongs_to :language_reference
  validates_uniqueness_of :title
end
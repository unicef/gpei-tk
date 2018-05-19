class SupportAffiliation < ApplicationRecord
  validates_uniqueness_of :title
end
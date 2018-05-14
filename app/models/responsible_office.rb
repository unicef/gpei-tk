class ResponsibleOffice < ApplicationRecord
  validates_uniqueness_of :title
end
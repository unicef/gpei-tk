class ResponsibleOffice < ActiveRecord::Base
  validates_uniqueness_of :title
end
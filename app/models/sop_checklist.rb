class SopChecklist < ActiveRecord::Base
  has_one :user
  has_many :sop_articles, :through => :sopchecklist_soparticles
  has_many :sopchecklist_soparticles
end
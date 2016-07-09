class SopChecklist < ActiveRecord::Base
  belongs_to :user
  has_many :sop_checklist_sop_articles
  has_many :sop_articles
  has_many :sop_articles, :through => :sop_checklist_sop_articles
end
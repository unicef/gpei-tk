class SopChecklistSopArticle < ActiveRecord::Base
  belongs_to :sop_checklist
  belongs_to :sop_article
end
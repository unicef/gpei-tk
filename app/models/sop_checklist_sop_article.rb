class SopChecklistSopArticle < ApplicationRecord
  belongs_to :sop_checklist
  belongs_to :sop_article
end
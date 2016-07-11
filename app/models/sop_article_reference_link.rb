class SopArticleSopReferenceLink < ActiveRecord::Base
  belongs_to :sop_article
  belongs_to :sop_reference_link
end
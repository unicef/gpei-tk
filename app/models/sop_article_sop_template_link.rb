class SopArticleSopTemplateLink < ActiveRecord::Base
  belongs_to :sop_article
  belongs_to :sop_template_link
end
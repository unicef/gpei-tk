class SopTemplateLink < ActiveRecord::Base
  has_many :sop_articles
  has_many :sop_articles, :through =>:sop_article_sop_template_links
end
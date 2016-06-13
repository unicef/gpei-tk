class SopReferenceLink < ActiveRecord::Base
  has_many :sop_articles
  has_many :sop_article_sop_reference_links
  has_many :sop_articles, :through => :sop_article_sop_reference_links
end
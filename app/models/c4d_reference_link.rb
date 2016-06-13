class C4dReferenceLink < ActiveRecord::Base
  has_many :c4d_articles
  has_many :c4d_article_c4d_reference_links
  has_many :c4d_articles, :through => :c4d_article_c4d_reference_links
end
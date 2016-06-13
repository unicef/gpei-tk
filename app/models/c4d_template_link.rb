class C4dTemplateLink < ActiveRecord::Base
  has_many :c4d_articles
  has_many :c4d_articles, :through =>:c4d_article_c4d_template_links
end
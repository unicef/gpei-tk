class C4dArticle < ActiveRecord::Base
  belongs_to :c4d_category
  belongs_to :c4d_subcategory
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_many :c4d_toolkits
  has_many :c4d_toolkit_c4d_articles
  has_many :c4d_toolkits, :through => :c4d_toolkit_c4d_articles

  has_many :c4d_template_links
  has_many :c4d_reference_links
  has_many :c4d_article_c4d_reference_links
  has_many :c4d_article_c4d_template_links
  has_many :reference_links, as: :reference_linkable
  has_many :template_links, as: :template_linkable

  def to_param
    [id, title.parameterize].join("-")
  end
end
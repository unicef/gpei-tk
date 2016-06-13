class SopArticle < ActiveRecord::Base
  belongs_to :sop_time
  belongs_to :sop_category
  belongs_to :responsibility, class_name: 'Office', foreign_key: 'responsibility_id'
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'

  has_many :sop_checklists
  has_many :sop_checklist_sop_articles
  has_many :sop_checklists, :through => :sop_checklist_sop_articles

  has_one :sop_icon

  has_many :sop_reference_links
  has_many :sop_template_links
  has_many :sop_article_sop_reference_links
  has_many :sop_article_sop_template_links
  has_many :sop_reference_links, :through => :sop_article_sop_reference_links
  has_many :sop_template_links, :through => :sop_article_sop_template_links
  validates_uniqueness_of :title, :CMS_title

  def to_param
    [id, title.parameterize].join("-")
  end
end
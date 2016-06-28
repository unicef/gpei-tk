class SopArticle < ActiveRecord::Base
  belongs_to :sop_time
  belongs_to :sop_category

  belongs_to :support_affiliation, class_name: 'SupportAffiliation', foreign_key: 'support_affiliation_id'
  belongs_to :responsible_office, class_name: 'ResponsibleOffice', foreign_key: 'responsible_office_id'
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

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

  def to_param
    [id, title.parameterize].join("-")
  end
end
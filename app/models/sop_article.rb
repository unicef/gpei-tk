class SopArticle < ApplicationRecord
  include PgSearch

  multisearchable :against => [:title, :content, :support, :responsible],
                  :if => :published?

  belongs_to :sop_time
  belongs_to :sop_category

  belongs_to :support_affiliation, class_name: 'SupportAffiliation', foreign_key: 'support_affiliation_id'
  belongs_to :responsible_office, class_name: 'ResponsibleOffice', foreign_key: 'responsible_office_id'
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_many :sop_checklists
  has_many :sop_checklist_sop_articles
  has_many :sop_checklists, :through => :sop_checklist_sop_articles

  has_attached_file :reference_link
  has_many :reference_link_articles, as: :reference_linkable
  has_many :reference_links, through: :reference_link_articles

  has_attached_file :reference_mp3
  has_many :reference_mp3_articles, as: :reference_mp3able
  has_many :reference_mp3s, through: :reference_mp3_articles

  has_attached_file :reference_pptx
  has_many :reference_pptx_articles, as: :reference_pptxable
  has_many :reference_pptxes, through: :reference_pptx_articles

  has_many :article_likes, as: :article_likeable
  alias_attribute :likes, :article_likes

  def sop_icon
    SopIcon.find_by('sop_category_id = ? AND sop_time_id = ?', self.sop_category_id, self.sop_time_id)
  end

  def next
    self.class.where('order_id > ?', order_id).order(:order_id).first
  end

  def previous
    self.class.where('order_id < ?', order_id).order(:order_id).last
  end

  def published?
    self.published
  end

  def to_param
    [id, title.parameterize].join("-")
  end
end
class ReferenceLink < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_refs, :against => [:title, :description, :document_file_name],
                  :using => { tsearch: { prefix: true } }

  has_many :reference_link_articles

  has_many :related_references, class_name: "RelatedReference",
                             foreign_key: "reference_link_id"

  belongs_to :related_referenceable, :polymorphic => true

  belongs_to :reference_linkable, :polymorphic => true

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_many :reference_downloads, as: :reference_downloadable
  alias_attribute :downloads, :reference_downloads

  has_attached_file :document,
                    :path => 'reference_links/:language/:filename',
                    :styles => { thumb: ["200x200#", :png] }

  validates_attachment :document, content_type: { content_type: 'application/pdf' }
  validates_uniqueness_of :document_file_name

  Paperclip.interpolates :language do |attachment, style|
    attachment.instance.language
  end

  def related_topics
    ReferenceLink.where(id: self.related_references.pluck(:related_referenceable_id))
  end

  def utilized?
    !ReferenceLinkArticle.where(reference_link_id: self.id).empty?
  end
end
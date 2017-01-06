class ReferenceLink < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_refs, :against => { :title => 'A', :description => 'B', :document_file_name => 'C' },
                  :using => { tsearch: { prefix: true } }

  has_many :reference_link_articles

  has_many :related_references, class_name: "RelatedReference",
                             foreign_key: "reference_link_id"

  belongs_to :related_referenceable, :polymorphic => true

  belongs_to :reference_linkable, :polymorphic => true

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  # has_many :tags

  has_many :reference_downloads, as: :reference_downloadable
  alias_attribute :downloads, :reference_downloads

  has_many :reference_likes, as: :reference_likeable
  alias_attribute :likes, :reference_likes

  has_attached_file :document,
                    :path => 'reference_links/:language/:filename',
                    :styles => { thumb: ["200x200#", :png] }

  has_many :featured_references

  validates_attachment :document, content_type: { content_type: 'application/pdf' }
  validates_uniqueness_of :document_file_name

  Paperclip.interpolates :language do |attachment, style|
    attachment.instance.language
  end

  def related_topics
    ReferenceLink.where(id: self.related_references.pluck(:related_referenceable_id))
  end

  def featured_references
    ReferenceLink.joins(:featured_references).all
  end

  def utilized?
    !ReferenceLinkArticle.where(reference_link_id: self.id).empty?
  end
end
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


  has_many :reference_downloads, as: :reference_downloadable
  alias_attribute :downloads, :reference_downloads

  has_many :reference_likes, as: :reference_likeable
  alias_attribute :likes, :reference_likes

  has_many :tags, through: :tag_references
  has_many :tag_references, as: :reference_tagable

  has_many :places, through: :place_references
  has_many :place_references, as: :reference_placeable

  has_many :languages, through: :language_references
  has_many :language_references, as: :reference_languageable

  has_attached_file :document,
                    :path => 'reference_links/:language/:filename',
                    :styles => { thumb: ["200x200#", :png] }, unless: :is_video?

  has_many :featured_references

  validates_attachment :document, content_type: { content_type: 'application/pdf' }, unless: :is_video?
  validates_uniqueness_of :document_file_name, unless: :is_video?
  validates_presence_of :absolute_url, unless: :is_video?
  validates_presence_of :video_url, if: :is_video?

  Paperclip.interpolates :language do |attachment, style|
    attachment.instance.language
  end

  def is_video?
    self.is_video
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
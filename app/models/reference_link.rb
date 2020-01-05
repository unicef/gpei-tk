class ReferenceLink < ApplicationRecord
  include PgSearch

  before_validation :update_is_video

  # pg_search_scope :search_refs, :against => { :title => 'A', :description => 'B', :document_file_name => 'C' },
  pg_search_scope :search_refs, :against => [ :title, :description, :document_file_name ],
                  :using => { dmetaphone: { any_word: true } }

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

  belongs_to :file_type

  has_many :tag_references, as: :reference_tagable
  has_many :tags, through: :tag_references

  has_many :place_references, as: :reference_placeable
  has_many :places, through: :place_references

  has_many :language_references, as: :reference_languageable
  has_many :languages, through: :language_references

  has_attached_file :document,
                    :path => 'reference_links/:language/:filename',
                    :styles => { thumb: ["200x200#", :png] }, unless: :is_video?

  has_many :featured_references

  validates_attachment :document, content_type: { content_type: 'application/pdf' }, unless: :is_video?
  validates_uniqueness_of :document_file_name, unless: :is_video?
  validates_presence_of :absolute_url, unless: :is_video?

  validates_presence_of :video_url, if: :is_video?
  validates_presence_of :is_video, if: :video_url_exists?

  Paperclip.interpolates :language do |attachment, style|
    attachment.instance.language
  end

  def video_url_exists?
    !!self.video_url
  end

  def is_video?
    !!self.is_video
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

  def update_is_video
    if self.is_url?
      self.is_video = true
    else
      self.is_video = false
    end
    true
  end

  def is_url?
    return false if !self.video_url
    uri = URI.parse(self.video_url)
    %w( http https ).include?(uri.scheme)
  end

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |result|
        csv << result.attributes.values_at(*column_names)
      end
    end
  end
end
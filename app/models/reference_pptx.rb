class ReferencePptx < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_refs, :against => { :title => 'A', :description => 'B', :document_file_name => 'C' }

  belongs_to :reference_pptxable, :polymorphic => true
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_many :reference_pptx_articles

  # has_many :tags

  has_many :reference_downloads, as: :reference_downloadable
  alias_attribute :downloads, :reference_downloads

  has_attached_file :document,
                    :path => 'reference_pptxes/:language/:filename'

  validates_attachment :document, content_type: { content_type: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' }
  validates_uniqueness_of :document_file_name

  Paperclip.interpolates :language do |attachment, style|
    attachment.instance.language
  end

  def utilized?
    !ReferencePptxArticle.where(reference_pptx_id: self.id).empty?
  end
end
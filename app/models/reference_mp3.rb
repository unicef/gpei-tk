class ReferenceMp3 < ActiveRecord::Base
  include PgSearch

  multisearchable :against => [:title, :description, :clip_file_name]

  # pg_search_scope :search_refs, :against => { :title => 'A', :description => 'B', :clip_file_name => 'C' }

  belongs_to :reference_mp3able, :polymorphic => true
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_many :reference_downloads, as: :reference_downloadable
  alias_attribute :downloads, :reference_downloads

  has_attached_file :clip,
                    :path => 'reference_mp3s/:language/:filename'

  validates_attachment :clip, content_type: { content_type: 'audio/mp3' }
  validates_uniqueness_of :clip_file_name

  Paperclip.interpolates :language do |attachment, style|
    attachment.instance.language
  end


  def utilized?
    !ReferenceMp3Article.where(reference_mp3_id: self.id).empty?
  end

end
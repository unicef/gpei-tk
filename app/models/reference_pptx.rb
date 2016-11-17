class ReferencePptx < ActiveRecord::Base
  include PgSearch

  belongs_to :reference_pptxable, :polymorphic => true
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_attached_file :document,
                    :path => 'reference_pptxes/:language/:filename'

  validates_attachment :document, content_type: { content_type: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' }
  validates_uniqueness_of :document_file_name

  Paperclip.interpolates :language do |attachment, style|
    attachment.instance.language
  end
end
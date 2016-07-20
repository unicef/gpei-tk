class EmbeddedImage < ActiveRecord::Base
  belongs_to :c4d_article
  has_attached_file :image,
                    :path => 'embedded_images/c4d_articles/:article_id/:filename'
  validates_attachment :image, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }

  Paperclip.interpolates :article_id do |attachment, style|
    attachment.instance.c4d_article_id
  end
end
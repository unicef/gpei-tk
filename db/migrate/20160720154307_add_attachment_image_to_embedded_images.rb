class AddAttachmentImageToEmbeddedImages < ActiveRecord::Migration
  def self.up
    change_table :embedded_images do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :embedded_images, :image
  end
end

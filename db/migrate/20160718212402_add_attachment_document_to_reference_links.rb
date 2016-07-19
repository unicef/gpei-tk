class AddAttachmentDocumentToReferenceLinks < ActiveRecord::Migration
  def self.up
    change_table :reference_links do |t|
      t.attachment :document
    end
  end

  def self.down
    remove_attachment :reference_links, :document
  end
end

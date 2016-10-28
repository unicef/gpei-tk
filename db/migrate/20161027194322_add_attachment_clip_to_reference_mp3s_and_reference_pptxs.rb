class AddAttachmentClipToReferenceMp3sAndReferencePptxs < ActiveRecord::Migration
  def self.up
    change_table :reference_mp3s do |t|
      t.attachment :clip
    end

    change_table :reference_pptxes do |t|
      t.attachment :document
    end
  end

  def self.down
    remove_attachment :reference_mp3s, :clip
    remove_attachment :reference_pptxes, :document
  end

end

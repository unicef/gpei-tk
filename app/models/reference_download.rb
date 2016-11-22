class ReferenceDownload < ActiveRecord::Base
  belongs_to :reference_downloadable, :polymorphic => true
  belongs_to :reference_link
  belongs_to :reference_mp3
  belongs_to :reference_pptx

  def category
    if self.reference_downloadable.has_attribute?(:sop_category_id)
      self.reference_downloadable.sop_category.title
    elsif self.reference_downloadable.has_attribute?(:c4d_category_id)
      self.reference_downloadable.c4d_category.title
    else
      nil
    end
  end
end
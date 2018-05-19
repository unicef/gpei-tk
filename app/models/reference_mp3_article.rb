class ReferenceMp3Article < ApplicationRecord
  belongs_to :reference_mp3able, :polymorphic => true
  belongs_to :reference_mp3

  def category
    if self.reference_mp3able.has_attribute?(:sop_category_id)
      self.reference_mp3able.sop_category.title
    elsif self.reference_mp3able.has_attribute?(:c4d_category_id)
      self.reference_mp3able.c4d_category.title
    else
      nil
    end
  end
end
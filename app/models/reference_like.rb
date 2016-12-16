class ReferenceLike < ActiveRecord::Base
  belongs_to :reference_likeable, :polymorphic => true

  belongs_to :reference_link
  belongs_to :reference_mp3
  belongs_to :reference_pptx

  def category
    if self.article_likeable.has_attribute?(:sop_category_id)
      self.article_likeable.sop_category.title
    elsif self.article_likeable.has_attribute?(:c4d_category_id)
      self.article_likeable.c4d_category.title
    else
      nil
    end
  end


end
class ReferencePptxArticle < ActiveRecord::Base
  belongs_to :reference_pptxable, :polymorphic => true
  belongs_to :reference_pptx

  def category
    if self.reference_pptxable.has_attribute?(:sop_category_id)
      self.reference_pptxable.sop_category.title
    elsif self.reference_pptxable.has_attribute?(:c4d_category_id)
      self.reference_pptxable.c4d_category.title
    else
      nil
    end
  end
end
class ReferenceLinkArticle < ApplicationRecord
  belongs_to :reference_linkable, :polymorphic => true
  belongs_to :reference_link

  def category
    if self.reference_linkable.has_attribute?(:sop_category_id)
      self.reference_linkable.sop_category.title
    elsif self.reference_linkable.has_attribute?(:c4d_category_id)
      self.reference_linkable.c4d_category.title
    else
      nil
    end
  end
end
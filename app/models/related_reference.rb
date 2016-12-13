class RelatedReference < ActiveRecord::Base
  belongs_to :reference_links

  def category
    if self.relatable_reference.has_attribute?(:sop_category_id)
      self.relatable_reference.sop_category.title
    elsif self.relatable_reference.has_attribute?(:c4d_category_id)
      self.relatable_reference.c4d_category.title
    else
      nil
    end
  end
end
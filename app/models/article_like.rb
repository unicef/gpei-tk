class ArticleLike < ActiveRecord::Base
  belongs_to :article_likeable, :polymorphic => true

  belongs_to :sop_article
  belongs_to :c4d_article

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
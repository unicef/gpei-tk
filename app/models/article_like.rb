class ArticleLike < ActiveRecord::Base
  belongs_to :article_likeable, :polymorphic => true

  belongs_to :sop_article
  belongs_to :c4d_article
end
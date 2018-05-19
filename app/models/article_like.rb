class ArticleLike < ApplicationRecord
  belongs_to :article_likeable, :polymorphic => true

  belongs_to :sop_article
  belongs_to :c4d_article
end
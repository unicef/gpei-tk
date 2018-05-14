class Like < ApplicationRecord
  belongs_to :article_likeable, :polymorphic => true
  has_many :reference_likes
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
end
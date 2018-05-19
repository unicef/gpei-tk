class Download < ApplicationRecord
  belongs_to :reference_downloadable, :polymorphic => true
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
end
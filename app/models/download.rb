class Download < ActiveRecord::Base
  belongs_to :downloadable, :polymorphic => true
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
end
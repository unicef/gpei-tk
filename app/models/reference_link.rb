class ReferenceLink < ActiveRecord::Base
  belongs_to :reference_linkable, :polymorphic => true
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
end
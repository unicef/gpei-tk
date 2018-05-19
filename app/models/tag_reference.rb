class TagReference < ApplicationRecord
  belongs_to :reference_tagable, :polymorphic => true
  belongs_to :tag
end
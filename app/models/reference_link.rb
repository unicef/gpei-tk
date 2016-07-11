class ReferenceLink < ActiveRecord::Base
  belongs_to :reference_linkable, :polymorphic => true
end
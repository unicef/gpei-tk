class ReferenceLinkArticle < ActiveRecord::Base
  belongs_to :reference_linkable, :polymorphic => true
  belongs_to :reference_link
end
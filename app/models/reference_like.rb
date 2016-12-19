class ReferenceLike < ActiveRecord::Base
  belongs_to :reference_likeable, :polymorphic => true

  has_many :likes

  belongs_to :reference_link
  belongs_to :reference_mp3
  belongs_to :reference_pptx
end
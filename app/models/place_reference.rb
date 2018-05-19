class PlaceReference < ApplicationRecord
  belongs_to :reference_placeable, :polymorphic => true
  belongs_to :place
end
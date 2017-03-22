class PlaceReference < ActiveRecord::Base
  belongs_to :reference_placeable, :polymorphic => true
  belongs_to :place
end
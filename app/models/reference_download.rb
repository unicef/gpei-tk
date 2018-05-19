class ReferenceDownload < ApplicationRecord
  belongs_to :reference_downloadable, :polymorphic => true
  belongs_to :reference_link
  belongs_to :reference_mp3
  belongs_to :reference_pptx
end
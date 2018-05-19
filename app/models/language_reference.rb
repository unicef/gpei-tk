class LanguageReference < ApplicationRecord
  belongs_to :reference_languageable, :polymorphic => true
  belongs_to :language
end
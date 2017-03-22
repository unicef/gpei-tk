class LanguageReference < ActiveRecord::Base
  belongs_to :reference_languageable, :polymorphic => true
  belongs_to :language
end
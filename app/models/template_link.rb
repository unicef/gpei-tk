class TemplateLink < ApplicationRecord
  belongs_to :template_linkable, :polymorphic => true
end
class TemplateLink < ActiveRecord::Base
  belongs_to :template_linkable, :polymorphic => true
end
class Cms::HowToInstructionsController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    cms_instructions = HowToInstruction.first
    render json: { status: 200, cms_instructions: cms_instructions }
  end

  def create
    cms_instructions = HowToInstruction.first
    if cms_instructions
      cms_instructions.update(content: params[:how_to_instructions][:content])
      render json: { status: 200 }
    else
      HowToInstruction.create(content: params[:how_to_instructions][:content])
      render json: { status: 200 }
    end
  end
end
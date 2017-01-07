class Cms::HowToInstructionsController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    instruction = HowToInstruction.all
    render json: { status: 200, instruction: instruction }
  end

  def create
    instruction = HowToInstruction.new(content: params[:content])
    if instruction.save
      render json: { status: 200 }
    else
      render json: { status: 403 }
    end
  end
end
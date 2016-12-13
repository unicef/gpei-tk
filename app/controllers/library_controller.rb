class LibraryController < ApplicationController
  def index
    @is_library = true
  end

  def referenceSearch
    reference_links = ReferenceLink.search_refs(params[:search][:query])
    reference_links.collect! do |record|
      binding.pry
      if record.utilized?
        { type: record.class.model_name.human, reference: record, isSop: record.isSOP?, isC4D: record.isC4D? }
      end
    end
    reference_mp3s = ReferenceMp3.search_refs(params[:search][:query])
    reference_mp3s.collect! do |record|
      if record.utilized?
        { type: record.class.model_name.human, reference: record, isSop: record.isSOP?, isC4D: record.isC4D? }
      end
    end
    reference_pptxes = ReferencePptx.search_refs(params[:search][:query])
    reference_pptxes.collect! do |record|
      if record.utilized?
        { type: record.class.model_name.human, reference: record, isSop: record.isSOP?, isC4D: record.isC4D? }
      end
    end
    render json: { status: 200, references: (reference_links + reference_mp3s + reference_pptxes).compact }
  end
end
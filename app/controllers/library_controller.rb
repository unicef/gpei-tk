class LibraryController < ApplicationController
  def index
    @is_library = true
    @featured_references = ReferenceLink.joins(:featured_references).all.order(document_file_name: :asc)
  end

  def referenceSearch
    reference_links = ReferenceLink.joins(:reference_link_articles).search_refs(params[:search][:query]).map do |ref|
      isSOP = true if ReferenceLinkArticle.where(reference_link_id: ref.id, reference_linkable_type: 'SopArticle').empty?
      isC4D = true if ReferenceLinkArticle.where(reference_link_id: ref.id, reference_linkable_type: 'C4dArticle').empty?
      { type: ref.class.model_name.human, reference: ref, isSOP: isSOP , isC4D: isC4D }
    end
    reference_mp3s = ReferenceMp3.joins(:reference_mp3_articles).search_refs(params[:search][:query]).map do |ref|
      isSOP = true if ReferenceMp3Article.where(reference_mp3_id: ref.id, reference_mp3able_type: 'SopArticle').empty?
      isC4D = true if ReferenceMp3Article.where(reference_mp3_id: ref.id, reference_mp3able_type: 'C4dArticle').empty?
      { type: ref.class.model_name.human, reference: ref, isSOP: isSOP , isC4D: isC4D }
    end
    reference_pptxes = ReferencePptx.joins(:reference_pptx_articles).search_refs(params[:search][:query]).map do |ref|
      isSOP = true if ReferencePptxArticle.where(reference_pptx_id: ref.id, reference_pptxable_type: 'SopArticle').empty?
      isC4D = true if ReferencePptxArticle.where(reference_pptx_id: ref.id, reference_pptxable_type: 'C4dArticle').empty?
      { type: ref.class.model_name.human, reference: ref, isSOP: isSOP , isC4D: isC4D }
    end
    render json: { status: 200, references: (reference_links + reference_mp3s + reference_pptxes).compact }
  end
end
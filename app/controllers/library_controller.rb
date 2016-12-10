class LibraryController < ApplicationController
  def index
    @is_library = true
  end

  def referenceSearch
    references = PgSearch.multisearch(safe_search_params[:query])
    references.to_a.map! do |obj|
      if obj.searchable_type == 'ReferenceLink'
        if !ReferenceLinkArticle.where(reference_link_id: obj.searchable.id).empty?
          return obj.searchable_type, obj.searchable
        end
      elsif obj.searchable_type == 'ReferenceMp3'
        if !ReferenceMp3Article.where(reference_mp3_id: obj.searchable.id).empty?
          return [obj.searchable_type, obj.searchable]
        end
      elsif obj.searchable_type == 'ReferencePptx'
        if !ReferencePptxArticle.where(reference_pptx_id: obj.searchable.id).empty?
          return [obj.searchable_type, obj.searchable]
        end
      end
      return nil
    end

    render json: { status: 200, references: references }
  end

  private

  def safe_search_params
    params.require(:search).permit(:query)
  end
end
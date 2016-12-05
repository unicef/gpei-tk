class LibraryController < ApplicationController
  def index
    @is_library = true
  end

  def search
    articles = PgSearch.multisearch(safe_search_params).collect{ |obj| [obj.searchable_type, obj.searchable] }
    links = ReferenceLink.search_refs(safe_search_params).collect{ |obj| obj.searchable }
    mp3s = ReferenceMp3.search_refs(safe_search_params).collect{ |obj| obj.searchable }
    pptxes = ReferencePptx.search_refs(safe_search_params).collect{ |obj| obj.searchable }
    render json: { status: 200, articles: articles, links: links, mp3s: mp3s, pptxes: pptxes }
  end

  private

  def safe_search_params
    params.require(:search).permit(:text)
  end
end
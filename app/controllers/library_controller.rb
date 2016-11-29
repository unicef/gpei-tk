class LibraryController < ApplicationController
  def index
    @is_library = true
  end

  def search
    found_search_results = PgSearch.multisearch(safe_search_params).collect{ |obj| [obj.searchable_type, obj.searchable] }
    render json: { status: 200, found_search_results: found_search_results }
  end

  private

  def safe_search_params
    params.require(:search).permit(:text)
  end
end
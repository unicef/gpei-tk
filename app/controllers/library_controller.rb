class LibraryController < ApplicationController
  def index
    @is_library = true
  end

  def search
    ReferenceLink.search(safe_search_params)
    SopArticle.search(safe_search_params)
    C4dArticle.search(safe_search_params)
    render json: { status: 200 }
  end

  private

  def safe_search_params
    params.require(:search).permit(:text)
  end
end
class LibraryController < ApplicationController
  def index
    @is_library = true
    @reference_links = ReferenceLink.joins(:reference_link_articles).order(id: :asc).all
    @reference_link_info = getReferenceLinkInfo(@reference_links)
    @featured_references = ReferenceLink.joins(:featured_references).all.order(document_file_name: :asc)
    @popular_downloads = ReferenceDownload.group(:reference_downloadable_id).order('count_id desc').count('id')
  end

  def referenceSearch
    reference_links = ReferenceLink.joins(:reference_link_articles).search_refs(params[:search][:query])
    reference_mp3s = ReferenceMp3.joins(:reference_mp3_articles).search_refs(params[:search][:query])
    reference_pptxes = ReferencePptx.joins(:reference_pptx_articles).search_refs(params[:search][:query])

    references = (reference_links + reference_mp3s + reference_pptxes).compact
    reference_link_info = getReferenceLinkInfo(references)
    render json: { status: 200, references: references, reference_link_info: reference_link_info }
  end

  private

  def getReferenceLinkInfo(reference_links)
    reference_link_info = {}
    reference_links.each do |reference_link|
      ref_join = ReferenceLinkArticle.where(reference_link_id: reference_link.id)
      ref_join.each do |join|
        reference_link_info[reference_link.id] = { isSOP: join.reference_linkable.has_attribute?(:sop_category_id), isC4D: join.reference_linkable.has_attribute?(:c4d_category_id) }
      end
      reference_link_info[reference_link.id].merge!({ related_topics: reference_link.related_topics,
                                                      download_count: ReferenceDownload.where(reference_downloadable_id: reference_link.id).count,
                                                      like_count: ReferenceLike.where(reference_likeable_id: reference_link.id).count })
    end
    reference_link_info
  end
end
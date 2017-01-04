class LibraryController < ApplicationController
  def index
    initializeVars
  end

  def referenceSearch
    reference_links = ReferenceLink.joins(:reference_link_articles).search_refs(params[:search][:query])
    reference_mp3s = ReferenceMp3.joins(:reference_mp3_articles).search_refs(params[:search][:query])
    reference_pptxes = ReferencePptx.joins(:reference_pptx_articles).search_refs(params[:search][:query])

    references = (reference_links + reference_mp3s + reference_pptxes).compact
    reference_link_info = getReferenceLinkInfo(references)
    render json: { status: 200, references: references, reference_link_info: reference_link_info }
  end

  def referenceShow
    @reference_link = ReferenceLink.find_by('title LIKE ? OR document_file_name LIKE ?',  "%#{params[:title].gsub('_', ' ')}%", "%#{params[:title]}%")
    initializeVars
    render 'library/index'
  end

  private

  def initializeVars
    @is_library = true
    @reference_links = ReferenceLink.joins(:reference_link_articles).order(id: :asc).all
    @reference_link_info = getReferenceLinkInfo(@reference_links)
    @featured_references = ReferenceLink.joins(:featured_references).all.order(document_file_name: :asc)
    @popular_downloads = ReferenceDownload.group(:reference_downloadable_id).order('count_id desc').count('id')
  end

  def getReferenceLinkInfo(reference_links)
    reference_link_info = {}
    reference_links.each do |reference_link|
      ref_join = ReferenceLinkArticle.where(reference_link_id: reference_link.id)
      ref_join.each do |join|
        reference_link_info[reference_link.id] = { isSOP: join.reference_linkable.has_attribute?(:sop_category_id), isC4D: join.reference_linkable.has_attribute?(:c4d_category_id) }
      end
      liked_by_user = false
      if current_user
        liked_by_user = !Like.joins(:reference_likes).where('likes.author_id = ? AND reference_likes.reference_likeable_id = ?', current_user.id, reference_link.id).empty?
      end
      reference_link_info[reference_link.id].merge!({ related_topics: reference_link.related_topics,
                                                      download_count: roundStatsToView(ReferenceDownload.where(reference_downloadable_id: reference_link.id).count),
                                                      like_count: roundStatsToView(ReferenceLike.where(reference_likeable_id: reference_link.id).count),
                                                      liked_by_user: liked_by_user })
    end
    reference_link_info
  end

  def roundStatsToView(count)
    rounded = count
    if count > 999
      rounded = (count / 1000).to_s + '.' + ((count%1000)/100).to_s + 'k'
    end
    rounded
  end
end
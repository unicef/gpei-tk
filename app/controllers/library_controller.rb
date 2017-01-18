class LibraryController < ApplicationController
  def index
    initializeVars
  end

  def referenceSearch
    reference_links = ReferenceLink.joins(:reference_link_articles).search_refs(params[:search][:query])
    reference_mp3s = ReferenceMp3.joins(:reference_mp3_articles).search_refs(params[:search][:query])
    reference_pptxes = ReferencePptx.joins(:reference_pptx_articles).search_refs(params[:search][:query])
    references = (reference_links + reference_mp3s + reference_pptxes).compact
    reference_link_info, places, languages, tags = getReferenceLinkInfo(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    render json: { status: 200, references: references, reference_link_info: reference_link_info, users: users, places: places, languages: languages }
  end

  def referenceShow
    @reference_link = ReferenceLink.find_by('document_file_name LIKE ? OR title LIKE ?',  "%#{params[:title]}%", "%#{params[:title].gsub('_', ' ')}%")
    initializeVars
    render 'library/index'
  end

  private

  def initializeVars
    @is_library = true
    @reference_links = ReferenceLink.joins(:reference_link_articles).order(download_count: :desc, like_count: :desc, created_at: :desc).includes(:author).all.uniq
    @reference_link_info, @places, @languages, @tags = getReferenceLinkInfo(@reference_links)
    @featured_references = ReferenceLink.joins(:featured_references).all.uniq
  end

  def getReferenceLinkInfo(reference_links)
    reference_link_info = {}
    places = []
    languages = []
    tags = []
    reference_links.each do |reference_link|
      if reference_link_info[reference_link.id].nil?
        reference_link_info[reference_link.id] = { places: [], languages: [], isSOP: false, isC4D: false, tags: [] }
      else
        reference_link_info[reference_link.id][:places].nil? ? reference_link_info[reference_link.id][:places] = [] : nil
        reference_link_info[reference_link.id][:languages].nil? ? reference_link_info[reference_link.id][:languages] = [] : nil
        reference_link_info[reference_link.id][:tags].nil? ? reference_link_info[reference_link.id][:tags] = [] : nil
      end
      ref_join = ReferenceLinkArticle.where(reference_link_id: reference_link.id)
      sopCount = 0
      c4dCount = 0
      ref_join.each do |join|
        isSOP = join.reference_linkable.has_attribute?(:sop_category_id)
        sopCount += 1 if isSOP
        isC4D = join.reference_linkable.has_attribute?(:c4d_category_id)
        c4dCount += 1 if isC4D

        reference_link_info[reference_link.id][:places] << reference_link.places if reference_link.places
        reference_link_info[reference_link.id][:languages] << (reference_link.language.to_s + ' ' + reference_link.document_language.to_s).upcase.strip
        (reference_link_info[reference_link.id][:tags] << reference_link.tags).flatten! if reference_link.tags
        places << reference_link_info[reference_link.id][:places].map{ |place| place.strip }
        languages << reference_link_info[reference_link.id][:languages]
        tags << reference_link_info[reference_link.id][:tags]
        if !reference_link_info[reference_link.id][:isSOP] && isSOP
          reference_link_info[reference_link.id][:isSOP] = isSOP
        end
        if !reference_link_info[reference_link.id][:isC4D] && isC4D
          reference_link_info[reference_link.id][:isC4D] = isC4D
        end
       reference_link_info[reference_link.id][:sopCount] ? reference_link_info[reference_link.id][:sopCount] += sopCount : reference_link_info[reference_link.id][:sopCount] = sopCount
       reference_link_info[reference_link.id][:c4dCount] ? reference_link_info[reference_link.id][:c4dCount] += c4dCount : reference_link_info[reference_link.id][:c4dCount] = c4dCount
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
    [reference_link_info, places.flatten.uniq.reject { |place| place.empty? }, languages.join(' ').split(' ').uniq.reject { |language| language.empty? }, tags.flatten.uniq]
  end

  def roundStatsToView(count)
    rounded = count
    if count > 999
      rounded = (count / 1000).to_s + '.' + ((count%1000)/100).to_s + 'k'
    end
    rounded
  end
end
class LibraryController < ApplicationController
  def index
    initializeVars
  end

  def referenceSearch
    reference_links = ReferenceLink.joins(:reference_link_articles).search_refs(params[:search][:query]).as_json.uniq
    reference_mp3s = ReferenceMp3.joins(:reference_mp3_articles).search_refs(params[:search][:query]).as_json.uniq
    reference_pptxes = ReferencePptx.joins(:reference_pptx_articles).search_refs(params[:search][:query]).as_json.uniq
    references = (reference_links + reference_mp3s + reference_pptxes).compact
    reference_links_data, sopCount, c4dCount, sopCount, c4dCount, places, languages, tags = getReferenceLinkInfo(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    render json: { status: 200, references: references, reference_links_data: reference_links_data, users: users, places: places, languages: languages, tags: tags }
  end

  def referenceShow
    @reference_link = ReferenceLink.find_by('title LIKE ?', "%#{params[:title]}%")
    @reference_link ||= ReferenceLink.find_by('document_file_name LIKE ?', "#{params[:title].gsub('_', ' ')}%")
    initializeVars
    render 'library/index'
  end

  private

  def initializeVars
    @is_library = true
    @reference_links = ReferenceLink.all.order('download_count DESC NULLS LAST, like_count DESC NULLS LAST, created_at DESC').as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    @reference_links_data, @sopCount, @c4dCount, @places, @languages, @tags = getReferenceLinkInfo(@reference_links)
    @featured_references = ReferenceLink.joins(:featured_references).all.uniq
  end

  def getReferenceLinkInfo(reference_links)
    reference_links_data = {}
    sopCount = 0
    c4dCount = 0
    places = []
    languages = []
    tags = []
    reference_links.each do |reference_link|
      places << reference_link['places']
      languages << reference_link['languages']
      tags << reference_link['tags']
      ref_join = ReferenceLinkArticle.where(reference_link_id: reference_link['id'])
      reference_links_data[reference_link['id']] = { reference_link: reference_link,
                                                     isSOP: false,
                                                     isC4D: false }
      ref_join.each do |join|
        if join.reference_linkable.has_attribute?(:sop_category_id)
          reference_links_data[reference_link['id']][:isSOP] = true
          sopCount += 1
        elsif join.reference_linkable.has_attribute?(:c4d_category_id)
          reference_links_data[reference_link['id']][:isC4D] = true
          c4dCount += 1
        end
      end
      liked_by_user = false
      if current_user
        liked_by_user = !Like.joins(:reference_likes).where('likes.author_id = ? AND reference_likes.reference_likeable_id = ?', current_user.id, reference_link['id']).empty?
      end
      reference_links_data[reference_link['id']].merge!({ download_count: roundStatsToView(ReferenceDownload.where(reference_downloadable_id: reference_link['id']).count),
                                                         like_count: roundStatsToView(ReferenceLike.where(reference_likeable_id: reference_link['id']).count),
                                                         liked_by_user: liked_by_user })
    end
    return reference_links_data, sopCount, c4dCount, places.flatten.uniq, languages.flatten.uniq, tags.flatten.uniq
  end

  def roundStatsToView(count)
    rounded = count
    if count > 999
      rounded = (count / 1000).to_s + '.' + ((count%1000)/100).to_s + 'k'
    end
    rounded
  end
end
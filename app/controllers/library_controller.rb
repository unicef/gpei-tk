class LibraryController < ApplicationController
  def index
    initializeVars
  end

  def referenceSearch
    reference_links = ReferenceLink.all.order('download_count DESC NULLS LAST, like_count DESC NULLS LAST, created_at DESC')
                      .search_refs(params[:search][:query])
                      .as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    references = reference_links
    reference_links_data, sopCount, c4dCount, places, languages, tags = getReferenceLinkData(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    render json: { status: 200,
                   references: references,
                   reference_links_data: reference_links_data,
                   users: users,
                   places: places,
                   languages: languages,
                   sopCount: sopCount,
                   c4dCount: c4dCount,
                   tags: tags }
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
    @reference_links_data, @sopCount, @c4dCount, @places, @languages, @tags = getReferenceLinkData(@reference_links)
    @filters = params[:filters] if params[:filters]
    @featured_references = ReferenceLink.joins(:featured_references).all.uniq
  end

  def getReferenceLinkData(reference_links)
    reference_links_data, places, languages, tags = {}, {}, {}, {}
    sopCount, c4dCount = 0, 0
    reference_links.each do |reference_link|
      places.merge!(mapFilters(reference_link['places'], places))
      languages.merge!(mapFilters(reference_link['languages'], languages))
      tags.merge!(mapFilters(reference_link['tags'], tags))
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
    return reference_links_data, sopCount, c4dCount, places.sort_by{|k, v| v[:count] * -1 }, languages.sort_by{|k, v| v[:count] * -1 }, tags.sort_by{|k, v| v[:count] * -1 }
  end

  def mapFilters(filters, existing_filters)
    filters.each do |filter|
      existing_filters[filter['title']] ? existing_filters[filter['title']][:count] += 1 : existing_filters[filter['title']] = { count: 1 }
    end
    existing_filters
  end

  def roundStatsToView(count)
    rounded = count
    if count > 999
      rounded = (count / 1000).to_s + '.' + ((count%1000)/100).to_s + 'k'
    end
    rounded
  end
end
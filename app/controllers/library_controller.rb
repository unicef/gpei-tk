class LibraryController < ApplicationController
  def index
    initialize_vars
  end

  def reference_links
    params['subcategory_title'].gsub!('.', '')
    if params['category'] == 'c4d'
      reference_links = ReferenceLink.where(id: C4dArticle.where('published = true AND c4d_subcategory_id = ?', C4dSubcategory.where(title: params['subcategory_title']).first.id).map{|article| article.reference_links.pluck(:id).flatten}.flatten.uniq)
    elsif params['category'] == 'sop'
      reference_links = ReferenceLink.where(id: SopArticle.where('published = true AND sop_category_id = ?', SopCategory.where(title: params['subcategory_title']).first.id).map{|article| article.reference_links.pluck(:id).flatten}.flatten.uniq)
    elsif params['category'] == 'tags'
      reference_links = ReferenceLink.where(id: TagReference.where(tag_id: Tag.where(title: params['subcategory_title']).first.id).pluck(:reference_tagable_id).flatten.uniq)
    end

    references = reference_links
    reference_links_data, sopCount, c4dCount, places, languages, tags = get_reference_link_data(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    category = params['subcategory_title']
    render json: { status: 200,
                   references: references,
                   reference_links_data: reference_links_data,
                   users: users,
                   category: category,
                   places: places,
                   languages: languages,
                   sopCount: sopCount,
                   c4dCount: c4dCount,
                   tags: tags }
  end

  def reference_search
    reference_links = ReferenceLink.all.order('download_count DESC NULLS LAST, like_count DESC NULLS LAST, created_at DESC')
                      .search_refs(params[:search][:query])
                      .as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    references = reference_links
    reference_links_data, sopCount, c4dCount, places, languages, tags = get_reference_link_data(references)
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

  def reference_show
    @reference_link = ReferenceLink.find_by('title LIKE ?', "%#{params[:title]}%")
    @reference_link ||= ReferenceLink.find_by('document_file_name LIKE ?', "#{params[:title].gsub('_', ' ')}%")
    initialize_vars
    render 'library/index'
  end

  private

  def initialize_vars
    @is_library = true
    @c4d_categories = C4dCategory.all
    @sop_categories = SopCategory.all
    @tags_all = Tag.all
    @reference_links = ReferenceLink.all.order('download_count DESC NULLS LAST, like_count DESC NULLS LAST, created_at DESC').as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    @reference_links_data, @sopCount, @c4dCount, @places, @languages, @tags = get_reference_link_data(@reference_links)
    @filters = params[:filters] if params[:filters]
    @featured_references = ReferenceLink.joins(:featured_references).all.order(created_at: :desc).uniq
  end

  def get_reference_link_data(reference_links)
    reference_links_data, places, languages, tags = {}, {}, {}, {}
    sopCount, c4dCount = 0, 0
    reference_links.each do |reference_link|
      places.merge!(map_filters(reference_link['places'], places))
      languages.merge!(map_filters(reference_link['languages'], languages))
      tags.merge!(map_filters(reference_link['tags'], tags))
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
      reference_links_data[reference_link['id']].merge!({ download_count: round_stats_to_view(ReferenceDownload.where(reference_downloadable_id: reference_link['id']).count),
                                                         like_count: round_stats_to_view(ReferenceLike.where(reference_likeable_id: reference_link['id']).count),
                                                         liked_by_user: liked_by_user })
    end
    return reference_links_data, sopCount, c4dCount, places.sort_by{|k, v| v[:count] * -1 }, languages.sort_by{|k, v| v[:count] * -1 }, tags.sort_by{|k, v| v[:count] * -1 }
  end

  def map_filters(filters, existing_filters)
    unless filters.nil?
      filters.each do |filter|
        existing_filters[filter['title']] ? existing_filters[filter['title']][:count] += 1 : existing_filters[filter['title']] = { count: 1 }
      end
    end
    existing_filters
  end

  def round_stats_to_view(count)
    rounded = count
    if count > 999
      rounded = (count / 1000).to_s + '.' + ((count%1000)/100).to_s + 'k'
    end
    rounded
  end
end
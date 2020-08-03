class LibraryController < ApplicationController
  def index
    initialize_vars
  end

  def reference_links
    params['search'] = params['tag'] unless params['tag'].nil?
    params['search'].gsub!(".","")
    c4dCount = ReferenceLink.where(id: ReferenceLinkArticle.where(reference_linkable_type: 'C4dArticle').pluck(:reference_link_id).uniq, is_archived: false).count
    sopCount = ReferenceLink.where(id: ReferenceLinkArticle.where(reference_linkable_type: 'SopArticle').pluck(:reference_link_id).uniq, is_archived: false).count
    covid19Count = TagReference.where(tag_id: Tag.where(title:'COVID-19').first.id).uniq(&:reference_tagable_id).count
    if params['category'] == 'c4d'
      reference_links = ReferenceLink.where(id: ReferenceLinkArticle.where(reference_linkable_type: 'C4dArticle').pluck(:reference_link_id).uniq, is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq.sort_by {|obj| obj['is_featured'] ? 0 : 1 }
    elsif params['category'] == 'sop'
      category = ''
      if params['tag'] == 'SOP'
        category = SopCategory.all.pluck(:id)
      else
        title = params['tag'] != "" ? params['tag'] : params['subcategory']
        category = SopCategory.where(title: title)
      end
      reference_links = ReferenceLink.where(id: SopArticle.joins(:reference_links).where(sop_category_id: category).map { |art| art.reference_links.map {|ref| ref.id } }.flatten.uniq, is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq.sort_by {|obj| obj['is_featured'] ? 0 : 1 }
    elsif params['category'] == 'covid19'
      reference_links = ReferenceLink.where(id: TagReference.where(tag_id: Tag.where(title: 'COVID-19').first.id).pluck(:reference_tagable_id).flatten.uniq, is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq.sort_by {|obj| obj['is_featured'] ? 0 : 1 }
    elsif params['category'] == 'tags'
      reference_links = ReferenceLink.where(id: TagReference.where(tag_id: Tag.where(title: params['tag']).first.id).pluck(:reference_tagable_id).flatten.uniq, is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq.sort_by {|obj| obj['is_featured'] ? 0 : 1 }
    elsif params['category'] == 'all'
      reference_links = ReferenceLink.where(is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq.sort_by {|obj| obj['is_featured'] ? 0 : 1 }
    elsif params['search'] != ""
      reference_links = ReferenceLink.where(is_archived: false)
                        .search_refs(params['search'])
                        .as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq.sort_by {|obj| obj['is_featured'] ? 0 : 1 }
    elsif params['search'] == ""
      reference_links = ReferenceLink.where(is_archived: false).order('title ASC NULLS LAST')
                        .as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq.sort_by {|obj| obj['is_featured'] ? 0 : 1 }
    end
    query = params['category'] == 'c4d' || params['category'] == 'sop' ? params['category'].upcase : params['search']
    references = reference_links
    reference_links_data, places, languages, tags, file_types = get_reference_link_data(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    category = params['search']
    render json: { status: 200,
                   references: references,
                   reference_links_data: reference_links_data,
                   users: users,
                   parent_category: params['category'],
                   category: category,
                   file_types: file_types,
                   query: query,
                   places: places,
                   languages: languages,
                   covid19Count: covid19Count,
                   sopCount: sopCount,
                   c4dCount: c4dCount,
                   tags: tags }
  end

  def reference_search
    reference_links = ReferenceLink.where(is_archived: false)
                      .search_refs(params['search'])
                      .order('title ASC NULLS LAST')
                      .as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq
    references = reference_links
    reference_links_data, sopCount, c4dCount, places, languages, tags, file_types = get_reference_link_data(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    render json: { status: 200,
                   references: references,
                   reference_links_data: reference_links_data,
                   users: users,
                   places: places,
                   file_types: file_types,
                   query: params['search'],
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
    @c4d_categories = C4dCategory.all.order(:title)
    @sop_categories = SopCategory.all.order(:title)
    @c4d_count = ReferenceLink.where(id: ReferenceLinkArticle.where(reference_linkable_type: 'C4dArticle').pluck(:reference_link_id), is_archived: false).uniq.count
    @sop_count = ReferenceLink.where(id: ReferenceLinkArticle.where(reference_linkable_type: 'SopArticle').pluck(:reference_link_id), is_archived: false).uniq.count
    @tags_all = Tag.all.order(:title)
    @sop_category_counts = get_sop_category_counts
    # @featured_references = ReferenceLink.joins(:featured_references).merge(FeaturedReference.order(id: :asc)).all.order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    # @reference_links_data, @sopCount, @c4dCount, @places, @languages, @tags = get_reference_link_data(@featured_references)
    @total_reference_count = ReferenceLink.where(is_archived: false).count
    @param_exists = false
    if params['category'] != nil || params['search'] != nil || params['filters'] != nil
      @param_exists = true
    end
    @covid19_count = ReferenceLink.where(id: TagReference.where(tag_id: Tag.where(title:'COVID-19').first.id).pluck(:reference_tagable_id).uniq, is_archived: false).count
    @tag_counts = {}
    Tag.all.each do |tag|
      @tag_counts[tag.id] = ReferenceLink.where(id: TagReference.where(tag_id: tag.id).uniq(&:reference_tagable_id).pluck(:reference_tagable_id).uniq, is_archived: false).count
    end
  end

  def get_sop_category_counts()
    count_hash = {}
    SopCategory.all.each do |category|
      count_hash[category.title] = SopArticle.joins(:reference_links).where(sop_category_id: category.id).map { |art| art.reference_links.map {|ref| ref.id } }.flatten.uniq.count
    end
    count_hash
  end

  def get_reference_link_data(reference_links)
    reference_links_data, places, languages, tags, file_types = {}, {}, {}, {}, {}, {}
    reference_links.each do |reference_link|
      places.merge!(map_filters(reference_link['places'], places))
      languages.merge!(map_filters(reference_link['languages'], languages))
      tags.merge!(map_filters(reference_link['tags'], tags))
      if reference_link['file_type_id'] != nil
        file_types[reference_link['file_type_id']] = FileType.find(reference_link['file_type_id'])
      end
      ref_join = ReferenceLinkArticle.where(reference_link_id: reference_link['id'])
      reference_links_data[reference_link['id']] = { reference_link: reference_link,
                                                     isSOP: false,
                                                     isC4D: false }
      ref_join.each do |join|
        if join.reference_linkable.has_attribute?(:sop_category_id)
          reference_links_data[reference_link['id']][:isSOP] = true
        elsif join.reference_linkable.has_attribute?(:c4d_category_id)
          reference_links_data[reference_link['id']][:isC4D] = true
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
    return reference_links_data, places.sort_by{|k, v| v[:count] * -1 }.sort!, languages.sort_by{|k, v| v[:count] * -1 }.sort!, tags.sort_by{|k, v| v[:count] * -1 }.sort!, file_types
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

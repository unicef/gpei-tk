class LibraryController < ApplicationController
  def index
    initialize_vars
  end

  def reference_links
    params['search'] = params['tag'] unless params['tag'].nil?
    params['search'].gsub!(".","")
    if params['category'] == 'c4d'
      reference_links = ReferenceLink.where(id: C4dArticle.where(published: true).map{|article| article.reference_links.pluck(:id).flatten}.flatten.uniq, is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    elsif params['category'] == 'sop'
      reference_links = ReferenceLink.where(id: SopArticle.where(published: true).map{|article| article.reference_links.pluck(:id).flatten}.flatten.uniq, is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    elsif params['category'] == 'tags'
      reference_links = ReferenceLink.where(id: TagReference.where(tag_id: Tag.where(title: params['search']).first.id).pluck(:reference_tagable_id).flatten.uniq, is_archived: false).order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    elsif params['search'] != nil
      reference_links = ReferenceLink.where(is_archived: false).order('title ASC NULLS LAST')
                        .search_refs(params['search'])
                        .as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    end
    query = params['category'] == 'c4d' || params['category'] == 'sop' ? params['category'].upcase : params['search']
    references = reference_links
    reference_links_data, sopCount, c4dCount, places, languages, tags = get_reference_link_data(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    category = params['search']
    render json: { status: 200,
                   file_types: [],
                   references: references,
                   reference_links_data: reference_links_data,
                   users: users,
                   parent_category: params['category'],
                   category: category,
                   query: query,
                   places: places,
                   languages: languages,
                   sopCount: sopCount,
                   c4dCount: c4dCount,
                   tags: tags }
  end

  def reference_search
    reference_links = ReferenceLink.where(is_archived: false).order('title ASC NULLS LAST')
                      .search_refs(params['search'])
                      .as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    references = reference_links
    reference_links_data, sopCount, c4dCount, places, languages, tags = get_reference_link_data(references)
    users = Hash[User.all.pluck(:id, :first_name)]
    render json: { status: 200,
                   references: references,
                   reference_links_data: reference_links_data,
                   users: users,
                   places: places,
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
    @tags_all = Tag.all.order(:title)
    @featured_references = ReferenceLink.joins(:featured_references).merge(FeaturedReference.order(id: :asc)).all.order('title ASC NULLS LAST').as_json(:include => [:author, :tags, :places, :languages, :related_topics]).uniq
    @reference_links_data, @sopCount, @c4dCount, @places, @languages, @tags = get_reference_link_data(@featured_references)
    @param_exists = nil
    @param_exists = true if params['category'] != nil || params['search'] != nil
    if params['tag'] != nil
      params['search'] = params['tag']
    end
    @tag_counts = TagReference.group(:tag_id).count
    @filters = params[:filters] if params[:filters]
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
    return reference_links_data, sopCount, c4dCount, places.sort_by{|k, v| v[:count] * -1 }.sort!, languages.sort_by{|k, v| v[:count] * -1 }.sort!, tags.sort_by{|k, v| v[:count] * -1 }.sort!
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
class Cms::ReferenceLinksController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    reference_links = ReferenceLink.all.order(:document_file_name).as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type]).uniq
    reference_link_categories = get_reference_link_categories(reference_links)
    categories = { sop_categories: SopCategory.all, c4d_categories: C4dCategory.all }
    render json: { reference_links: reference_links,
                   reference_link_categories: reference_link_categories,
                   categories: categories,
                   status: 200 }
  end

  def show
    if request.xhr?
      reference_link = ReferenceLink.find_by(id: params[:id]).as_json(:include => [:author, :tags, :places, :languages, :related_topics, :file_type])
      reference_links = ReferenceLink.where('id <> ?', reference_link['id']).order(:document_file_name)
      selected_tags = reference_link['tags'].sort_by { |ref| ref['title'] }
      file_types = FileType.all.order(:title)
      tags = Tag.all.order(:title)
      places = Place.all.order(:title).sort_by { |place| place.title == 'Global' ? 0 : 1 }
      languages = Language.all.sort_by { |language| language.title == 'English' || language.title == 'French' || language.title == 'Urdu' || language.title == 'Pashto' || language.title == 'Global' ? 0 : 1 }
      render json: { status: 200,
                     file_types: file_types,
                     places: places,
                     languages: languages,
                     reference_links: reference_links,
                     reference_link: reference_link,
                     tags: tags,
                     selected_tags: selected_tags }
    end
  end

  def create
    if request.xhr?
      errors = []
      if params['reference_link']['is_video'] == true.to_s
        reference_link = ReferenceLink.create(video_url: params['reference_link']['video_url'],
                                              language: params['reference_link']['language'],
                                              title: params['reference_link']['title'],
                                              description: params['reference_link']['description'],
                                              author_id: current_user.id)
        if !reference_link.save
          errors << reference_link.errors
        end
      else
        params[:reference_link].each do |document|
          if ReferenceLink.find_by(document_file_name: document[1].original_filename).nil?
            reference_link = ReferenceLink.new(author_id: current_user.id,
                                              document: document[1],
                                              language: params[:language],
                                              document_language: params[:document_language])
            reference_link.absolute_url = normalize_uri(reference_link.document.url)
            if !reference_link.save
              errors << reference_link.errors
            end
          else
            errors << "duplicate files not allowed"
          end
        end
      end
      if errors.empty?
        render json: { status: 200 }
      else
        render json: { status: 403, error: errors.join('\n') }
      end
    end
  end

  def update
    if request.xhr?
      reference_link = ReferenceLink.find_by(id: params[:id])
      params[:reference_link][:video_url] = nil if params[:reference_link][:video_url] == ''
      params[:reference_link][:document_language].strip!
      if reference_link.update(safe_reference_link_params)
        TagReference.where(reference_tagable: reference_link).destroy_all
        if params[:reference_link][:tags]
          params[:reference_link][:tags].each do |tag_id|
            TagReference.create(tag_id: tag_id, reference_tagable: reference_link)
          end
        end
        PlaceReference.where(reference_placeable: reference_link).destroy_all
        if params[:reference_link][:places]
          params[:reference_link][:places].each do |place_id|
            PlaceReference.create(place_id: place_id, reference_placeable: reference_link)
          end
        end
        LanguageReference.where(reference_languageable: reference_link).destroy_all
        if params[:reference_link][:languages]
          params[:reference_link][:languages].each do |language_id|
            LanguageReference.create(language_id: language_id, reference_languageable: reference_link)
          end
        end
        RelatedReference.where(reference_link_id: reference_link.id).destroy_all
        if params[:reference_link][:related_topics]
          params[:reference_link][:related_topics].each do |id|
            RelatedReference.create(reference_link_id: reference_link.id, related_referenceable_id: id, related_referenceable_type: 'ReferenceLink')
          end
        end
        file_type = reference_link.file_type.nil? ? nil : reference_link.file_type.title
        render json: { status: 200,
                       id: reference_link.id,
                       description: reference_link.description,
                       publication_year: reference_link.publication_year,
                       is_archived: reference_link.is_archived,
                       is_featured: reference_link.is_featured,
                       file_type_title: file_type,
                       title: reference_link.title,
                       document_language: reference_link.document_language,
                       places: reference_link.places,
                       tags: reference_link.tags,
                       languages: reference_link.languages,
                       video_url: reference_link.video_url }
      else
        render json: { status: 403 }
      end
    end
  end

  def destroy
    if request.xhr? && current_user.is_admin?
      reference_link = ReferenceLink.find_by(id: params[:id])
      if !reference_link.nil?
        ReferenceLinkArticle.where(reference_link_id: reference_link.id).destroy_all
        reference_link.destroy
        render json: { status: 200 }
      end
    end
  end

  def utilized
    reference_links = ReferenceLink.all.order(:document_file_name).uniq
    reference_link_categories = get_reference_link_categories(reference_links)
    categories = { sop_categories: SopCategory.all, c4d_categories: C4dCategory.all }
    render json: { reference_links: reference_links,
                   reference_link_categories: reference_link_categories,
                   categories: categories,
                   status: 200 }
  end

  private

  def get_reference_link_categories(reference_links)
    reference_link_categories = {}
    reference_links.each do |reference_link|
      links = ReferenceLinkArticle.where(reference_link_id: reference_link['id'])
      reference_link_categories[reference_link['id']] = []
      if !links.empty?
        links.each do |link|
          if link.reference_linkable.has_attribute?(:sop_category_id)
            reference_link_categories[reference_link['id']] << { details: link.reference_linkable.sop_time.period + ' > ' + link.reference_linkable.sop_category.title + ' > ' + link.reference_linkable.order_id.to_s, category: link.reference_linkable.sop_category.title, tags: reference_link['tags'], places: reference_link['places'], languages: reference_link['languages'] }
          else
            reference_link_categories[reference_link['id']] << { details: link.reference_linkable.c4d_category.title + ' > '+ link.reference_linkable.c4d_subcategory.title + ' > ' + link.reference_linkable.order_id.to_s, category: link.reference_linkable.c4d_category.title, tags: reference_link['tags'], places: reference_link['places'], languages: reference_link['languages'] }
          end
        end
      else
        reference_link_categories[reference_link['id']] << { details: '', category: '', tags: reference_link['tags'], places: reference_link['places'], languages: reference_link['languages'] }
      end
    end
    reference_link_categories
  end

  def normalize_uri(url)
    uri = URI.parse(url)
    if uri.kind_of?(URI::HTTPS)
      return url
    elsif uri.kind_of?(URI::HTTP)
      return url.gsub('http', 'https')
    else
      return "https:#{url}"
    end
  end

  def safe_reference_link_params
    params.require(:reference_link).permit(:description, :is_featured, :is_archived, :publication_year, :title, :document_language, :video_url, :file_type_id)
  end
end
class Cms::ReferenceLinksController < ApplicationController
  before_action :user_is_admin_or_editor?

  def index
    reference_links = ReferenceLink.all.order(:document_file_name)
    reference_link_categories = getReferenceLinkCategories(reference_links)
    categories = { sop_categories: SopCategory.all, c4d_categories: C4dCategory.all }
    render json: { reference_links: reference_links,
                   reference_link_categories: reference_link_categories,
                   categories: categories,
                   status: 200 }
  end

  def show
    if request.xhr?
      reference_link = ReferenceLink.find_by(id: params[:id])
      reference_links = ReferenceLink.where('id <> ?', reference_link.id).order(:document_file_name)
      related_reference_links = reference_link.related_topics
      selected_tags = reference_link.tags
      tags = Tag.all
      render json: { status: 200,
                     related_reference_links: related_reference_links,
                     reference_links: reference_links,
                     reference_link: reference_link,
                     tags: tags,
                     selected_tags: selected_tags }
    end
  end

  def create
    if request.xhr?
      errors = []
      params[:reference_link].each do |document|
        if ReferenceLink.find_by(document_file_name: document[1].original_filename).nil?
          reference_link = ReferenceLink.new(author_id: current_user.id,
                                            document: document[1],
                                            language: params[:language],
                                            document_language: params[:document_language],
                                            places: params[:places])
          reference_link.absolute_url = reference_link.document.url
          reference_link.absolute_url.gsub!('http', 'https')
          if !reference_link.save
            errors << reference_link.errors
          end
        else
          errors << "duplicate files not allowed"
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
      params[:reference_link][:places].strip!
      params[:reference_link][:document_language].strip!
      if reference_link.update(safe_reference_link_params)
        TagReference.where(reference_tagable: reference_link).destroy_all
        if params[:tags]
          params[:tags].each do |tag_id|
            TagReference.create(tag_id: tag_id, reference_tagable: reference_link)
          end
        end
        PlaceReference.where(reference_placeable: reference_link).destroy_all
        if params[:places]
          params[:places].each do |place_id|
            PlaceReference.create(place_id: place_id, reference_placeable: reference_link)
          end
        end
        LanguageReference.where(reference_languageable: reference_link).destroy_all
        if params[:languages]
          params[:languages].each do |language_id|
            LanguageReference.create(language_id: language_id, reference_languageable: reference_link)
          end
        end
        RelatedReference.where(reference_link_id: reference_link.id).destroy_all
        if params[:reference_link][:related_topics]
          params[:reference_link][:related_topics].each do |id|
            RelatedReference.create(reference_link_id: reference_link.id, related_referenceable_id: id, related_referenceable_type: 'ReferenceLink')
          end
        end
        render json: { status: 200,
                       id: reference_link.id,
                       description: reference_link.description,
                       title: reference_link.title,
                       document_language: reference_link.document_language,
                       places: reference_link.places,
                       tags: reference_link.tags }
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
    reference_links = ReferenceLink.joins(:reference_link_articles).all.order(:document_file_name).uniq
    reference_link_categories = getReferenceLinkCategories(reference_links)
    categories = { sop_categories: SopCategory.all, c4d_categories: C4dCategory.all }
    render json: { reference_links: reference_links,
                   reference_link_categories: reference_link_categories,
                   categories: categories,
                   status: 200 }
  end

  private

  def getReferenceLinkCategories(reference_links)
    reference_link_categories = {}
    reference_links.each do |reference_link|
      links = ReferenceLinkArticle.where(reference_link_id: reference_link.id)
      if !links.empty?
        reference_link_categories[reference_link.id] = []
        links.each do |link|
          if link.reference_linkable.has_attribute?(:sop_category_id)
            reference_link_categories[reference_link.id] << { details: link.reference_linkable.sop_time.period + ' > ' + link.reference_linkable.sop_category.title + ' > ' + link.reference_linkable.order_id.to_s, category: link.reference_linkable.sop_category.title, tags: reference_link.tags }
          else
            reference_link_categories[reference_link.id] << { details: link.reference_linkable.c4d_category.title + ' > '+ link.reference_linkable.c4d_subcategory.title + ' > ' + link.reference_linkable.order_id.to_s, category: link.reference_linkable.c4d_category.title, tags: reference_link.tags }
          end
        end
      else
        reference_link_categories[reference_link.id] = []
        reference_link_categories[reference_link.id] << { details: '', category: '', tags: reference_link.tags }
      end
    end
    reference_link_categories
  end

  def safe_reference_link_params
    params.require(:reference_link).permit(:description, :title, :document_language, :places)
  end
end
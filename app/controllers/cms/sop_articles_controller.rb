class Cms::SopArticlesController < ApplicationController
  def index
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        sop_articles = SopArticle.all.order(:order_id)
        render json: { sop_articles: sop_articles, status: 200 }
      end
    end
  end

  def create
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        sop_article = SopArticle.new(safe_article_params)
        sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
        sop_article.order_id = SopArticle.maximum(:order_id) + 1
        sop_article.author = current_user
        if sop_article.save
          render json: { sop_article: sop_article, status: 200 }
        end
      end
    end
  end

  def show
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        sop_article = SopArticle.find(params[:id])
        sop_times = SopTime.all
        sop_categories = SopCategory.all
        responsible_offices = ResponsibleOffice.all
        support_affiliations = SupportAffiliation.all
        render json: { sop_article: sop_article, sop_times: sop_times, sop_categories: sop_categories, responsible_offices: responsible_offices, support_affiliations: support_affiliations, status: 200 }
      end
    end
  end

  def update
    if current_user.is_admin? || current_user.is_editor?
      if request.xhr?
        article = SopArticle.find_by(id: params[:id])
        article.update(safe_article_params)
        render json: { status: 200 }
      end
    end
  end

  def publish
    if current_user.is_admin? || current_user.is_editor?
      sop_article = SopArticle.find_by(id: params['id'])
      sop_article.update(published: !sop_article.published)
    end
  end

  def safe_article_params
    params.require(:article).permit(:cms_title, :title, :responsible, :support, :responsible_office_id, :support_affiliation_id, :content, :video_url, :sop_time_id, :sop_category_id)
  end
end
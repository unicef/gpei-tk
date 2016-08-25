class C4dController < ApplicationController
  before_action do |controller|
    @is_c4d = true
    @user = current_user
    @is_c4d = true
    @nav_bar_offset = 'col-md-offset-3'
    @c4d_categories = C4dCategory.all
  end

  def index
    @is_c4d_nav = true
    @c4d_category = C4dCategory.find_by(title:'Understand')
  end

  def understand
    @is_c4d_understand = true
    @c4d_category = C4dCategory.find_by(title:'Understand')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
  end

  def plan
    @is_c4d_plan = true
    @c4d_category = C4dCategory.find_by(title:'Plan')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
  end

  def act
    @is_c4d_act = true
    @c4d_category = C4dCategory.find_by(title:'Act')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
  end

  def tools
    @is_c4d_tools = true
    @c4d_category = C4dCategory.find_by(title:'Tools')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
  end
end

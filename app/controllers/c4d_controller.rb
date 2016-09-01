class C4dController < ApplicationController
  before_action do |controller|
    @is_c4d = true
    @user = current_user
    @nav_bar_offset = 'col-md-offset-1'
  end

  def index
    @is_c4d_nav = true
    @c4d_category = C4dCategory.find_by(title:'Understand')
    @c4d_categories = C4dCategory.all
  end

  def understand
    @is_c4d_understand = true
    @c4d_category = C4dCategory.find_by(title:'Understand')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
    @article_colors = get_c4d_article_color_array(@c4d_category.title)
  end

  def plan
    @is_c4d_plan = true
    @c4d_category = C4dCategory.find_by(title:'Plan')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
    @article_colors = get_c4d_article_color_array(@c4d_category.title)
  end

  def act
    @is_c4d_act = true
    @c4d_category = C4dCategory.find_by(title:'Act')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
    @article_colors = get_c4d_article_color_array(@c4d_category.title)
  end

  def tools
    @is_c4d_tools = true
    @c4d_category = C4dCategory.find_by(title:'Tools')
    @c4d_articles = C4dArticle.where(c4d_category_id: @c4d_category.id, published: true).order(order_id: :asc)
    @c4d_subcategories = C4dSubcategory.where(c4d_category_id: @c4d_category.id)
    @article_colors = get_c4d_article_color_array(@c4d_category.title)
  end

  private
  def get_c4d_article_color_array category
    colors = { 'Understand':
              { 'BehaviouralGoal': ['#77980F', '#586E12', '#6F8D0E', '#4B5C16'],
                'UsingEvidence': [nil, nil, nil, nil, '#60791C', '#749115', '#80A30A', '#98B90B'],
                'IDHighRiskGroups': [nil, nil, nil, nil, nil, nil, nil, nil, '#81A228']
              },
                'Plan':
              { 'Segmentation': ['#142964', '#173283', '#1E40A5'],
                'Barriers': [nil, nil, nil, '#192C93', '#1F36A8', '#2742CB'],
                'Messaging': [nil, nil, nil, nil, nil, nil, '#215CAF', '#296ECE'],
                'ChannelAnalysis': [nil, nil, nil, nil, nil, nil, nil, nil, '#4799DD'],
                'IDYourScenario': [nil, nil, nil, nil, nil, nil, nil, nil, nil, '#6BA6D6', '#7CB5DE', '#85C0EA', '#93C7E8']
              },
                'Act':
              {
                'TheGlobalStrategy': ['#0A462F', '#0E6040', '#14714C', '#17885B'],
                'IntegratedAction': [nil, nil, nil, nil, '#085D40', '#0C6949', '#127653', '#16805B', '#1E8E67', '#21956D', '#28A278'],
                'MonitorEvaluate': [nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, '#579866', '#5FA870', '#69B57B', '#7CC98E'],
              },
              'Tools':
              {
                'MassMediaIEC': ['#175067', '#1F6480', '#2B7896'],
                'Training': [nil, nil, nil, '#06868D', '#11979F', '#30AFB7'],
                'ManagementTools': [nil, nil, nil, nil, nil, nil, '#29A8A8', '#2CB4B4', '#4BC6C6'],
                'Innovations': [nil, nil, nil, nil, nil, nil, nil, nil, nil, '#4DAFAF', '#57B7B7', '#62C4C4', '#6ECCCC']
              }
            }
  end
end

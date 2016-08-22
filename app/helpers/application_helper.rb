module ApplicationHelper
  def build_classes args
    return args.values.join(' ')
  end

  def style_visible icon, user, article
    if icon == 'add'
      if user
        user.sop_checklist.sop_articles.each do |check_list_article|
          if check_list_article.title == article.title
            return 'visibility:hidden'
          end
        end
      end
      return 'visibility:visible'
    else
      if user
        user.sop_checklist.sop_articles.each do |check_list_article|
          if check_list_article.title == article.title
            return 'visibility:visible'
          end
        end
      end
      return 'visibility:hidden'
    end
  end

  def c4d_style_visible icon, user, article
    if icon == 'add'
      if user
        user.c4d_toolkit.c4d_articles.each do |check_list_article|
          if check_list_article.title == article.title
            return 'visibility:hidden'
          end
        end
      end
      return 'visibility:visible'
    else
      if user
        user.c4d_toolkit.c4d_articles.each do |check_list_article|
          if check_list_article.title == article.title
            return 'visibility:visible'
          end
        end
      end
      return 'visibility:hidden'
    end
  end

  def get_color_for_subcategory article_subcategory
    special_categories = ['ID Your Scenario', 'Monitor Evaluate', 'Innovations']
    if special_categories.include?(article_subcategory)
      return 'black'
    else
      return 'white'
    end
  end

  def get_color_for_sop_time article_time
    special_categories = ['14 Days to Close']
    if special_categories.include?(article_time)
      return 'black'
    else
      return 'white'
    end
  end
  def get_grid_image_by_sop_subcategory article_subcategory, image
    special_categories = ['14 Days to Close']
    if image == 'icon-time-white' && special_categories.include?(article_subcategory)
      image = 'icon-time-black'
    elsif image == 'icon-category-white' && special_categories.include?(article_subcategory)
      image = 'icon-category-black'
    elsif image == 'icon-resp-white' && special_categories.include?(article_subcategory)
      image = 'icon-resp-black'
    end
    image
  end
end

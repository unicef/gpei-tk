module ApplicationHelper
  include ActionView::Helpers::NumberHelper

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

  def getSopCategoryIcon sop_category
    image = ''
    if sop_category == 'Outbreak Confirmation'
      image = '/assets/sop/icons/24Hours_OutbreakConfir.png'
    elsif sop_category == 'Coordination and Advocacy'
      image = '/assets/sop/icons/14DaysClose_AdvoCoor.png'
    elsif sop_category == 'Technical and Human Resources'
      image = '/assets/sop/icons/14Days_TechHuman.png'
    elsif sop_category == 'Information Management'
      image = '/assets/sop/icons/14DaysClose_InfoMan.png'
    elsif sop_category == 'Communication'
      image = '/assets/sop/icons/14DaysClose_ExCom.png'
    elsif sop_category == 'Finances and Logistics'
      image = '/assets/sop/icons/14DaysClose_Finance.png'
    elsif sop_category == 'Context'
      image = '/assets/sop/icons/14DaysClose_Context.png'
    end
    image
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

  def getPaginatorLastPageNumber(item_count)
    divided_idx = item_count / 20
    modulus_idx = item_count % 20
    (modulus_idx >= 1 ? divided_idx + 1 :  divided_idx)
  end

  def getPaginatorIdNumber(item_idx, last_idx)
    "#{item_idx == last_idx && item_idx % 20 != 0 ? (item_idx / 20 + 1) : (item_idx / 20)}"
  end

  def getSearchResultFilter(idx)
    if (idx <= 20)
      return 1
    elsif (idx % 20 == 0)
      return (idx / 20)
    else
      return (idx / 20 + 1)
    end
  end

  def buildClassesWithDot args
    if args
      return args.map{ |arg| "#{arg}" }.join(' ')
    end
  end
end

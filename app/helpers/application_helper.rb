module ApplicationHelper
  def build_classes args
    return args.values.join(' ')
  end

  def style_visible icon, user, article
    if icon == 'add'
      user.sop_checklist.sop_articles.each do |check_list_article|
        if check_list_article.title == article.title
          return 'visibility:hidden'
        end
      end
      return 'visibility:visible'
    else
      user.sop_checklist.sop_articles.each do |check_list_article|
        if check_list_article.title == article.title
          return 'visibility:visible'
        end
      end
      return 'visibility:hidden'
    end
  end
end

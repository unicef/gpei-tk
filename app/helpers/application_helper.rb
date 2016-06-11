module ApplicationHelper
  def build_classes args
    return args.values.join(' ')
  end
end

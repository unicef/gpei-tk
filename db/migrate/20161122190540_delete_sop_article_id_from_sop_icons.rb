class DeleteSopArticleIdFromSopIcons < ActiveRecord::Migration
  def change
    remove_column :sop_icons, :sop_article_id, :integer
  end
end

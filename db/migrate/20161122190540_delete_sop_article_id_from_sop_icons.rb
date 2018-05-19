class DeleteSopArticleIdFromSopIcons < ActiveRecord::Migration[4.2]
  def change
    remove_column :sop_icons, :sop_article_id, :integer
  end
end

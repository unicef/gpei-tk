class RemoveCmsTitleFromArticles < ActiveRecord::Migration[4.2]
  def change
    remove_column :sop_articles, :cms_title, :string
    remove_column :c4d_articles, :cms_title, :string
  end
end

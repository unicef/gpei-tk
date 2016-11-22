class RemoveCmsTitleFromArticles < ActiveRecord::Migration
  def change
    remove_column :sop_articles, :cms_title, :string
    remove_column :c4d_articles, :cms_title, :string
  end
end

class AddDownloadCountAndLikeCountAttributeReferenceLink < ActiveRecord::Migration
  def change
    add_column :reference_links, :download_count, :integer
    add_column :reference_links, :like_count, :integer
  end
end

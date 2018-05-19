class AddDownloadCountAndLikeCountAttributeReferenceLink < ActiveRecord::Migration[4.2]
  def change
    add_column :reference_links, :download_count, :integer
    add_column :reference_links, :like_count, :integer
  end
end

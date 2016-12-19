class RemoveTypeReferenceDownloadsAndDownloads < ActiveRecord::Migration
  def change
    remove_column :reference_likes, :type, :string
    remove_column :reference_downloads, :type, :string
    remove_column :article_likes, :type, :string
  end
end

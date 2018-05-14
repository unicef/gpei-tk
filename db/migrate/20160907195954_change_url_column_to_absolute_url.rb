class ChangeUrlColumnToAbsoluteUrl < ActiveRecord::Migration[4.2]
  def change
    rename_column :reference_links, :url, :absolute_url
    rename_column :embedded_images, :url, :absolute_url
  end
end

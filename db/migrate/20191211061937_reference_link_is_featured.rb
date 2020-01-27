class ReferenceLinkIsFeatured < ActiveRecord::Migration[5.2]
  def change
    add_column :reference_links, :is_featured, :boolean, default: false
  end
end

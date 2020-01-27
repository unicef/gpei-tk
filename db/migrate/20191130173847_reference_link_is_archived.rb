class ReferenceLinkIsArchived < ActiveRecord::Migration[5.2]
  def change
    add_column :reference_links, :is_archived, :boolean, default: false
  end
end

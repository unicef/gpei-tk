class ReferenceLinkPublicYear < ActiveRecord::Migration[5.2]
  def change
    add_column :reference_links, :publication_year, :string, default: ""
  end
end

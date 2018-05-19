class AddTitleToReferenceLink < ActiveRecord::Migration[4.2]
  def change
    add_column :reference_links, :title, :string
  end
end

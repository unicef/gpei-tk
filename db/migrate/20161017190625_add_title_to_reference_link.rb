class AddTitleToReferenceLink < ActiveRecord::Migration
  def change
    add_column :reference_links, :title, :string
  end
end

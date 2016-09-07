class AddDescriptionAttrToReferenceLinks < ActiveRecord::Migration
  def change
    add_column :reference_links, :description, :string
  end
end

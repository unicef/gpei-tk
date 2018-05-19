class AddDescriptionAttrToReferenceLinks < ActiveRecord::Migration[4.2][4.2]
  def change
    add_column :reference_links, :description, :string
  end
end

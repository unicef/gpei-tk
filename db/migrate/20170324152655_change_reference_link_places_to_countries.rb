class ChangeReferenceLinkPlacesToCountries < ActiveRecord::Migration[4.2]
  def change
    rename_column :reference_links, :places, :countries
  end
end

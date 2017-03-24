class ChangeReferenceLinkPlacesToCountries < ActiveRecord::Migration
  def change
    rename_column :reference_links, :places, :countries
  end
end

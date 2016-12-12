class AddCommonLanguageAndPlacesFieldToReferenceLink < ActiveRecord::Migration
  def change
    add_column :reference_links, :common_languages, :string
    add_column :reference_links, :places, :string
    add_column :reference_mp3s, :common_languages, :string
    add_column :reference_mp3s, :places, :string
    add_column :reference_pptxes, :common_languages, :string
    add_column :reference_pptxes, :places, :string
  end
end

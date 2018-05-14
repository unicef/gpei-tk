class RenameCommonLanguagesToDocumentLanguage < ActiveRecord::Migration[4.2]
  def change
    rename_column :reference_links, :common_languages, :document_language
    rename_column :reference_mp3s, :common_languages, :document_language
    rename_column :reference_pptxes, :common_languages, :document_language
  end
end

class AddColumnAbsoluteUrlToReferenceMp3AndPptx < ActiveRecord::Migration[4.2]
  def change
    add_column :reference_mp3s, :absolute_url, :string
    add_column :reference_pptxes, :absolute_url, :string
  end
end

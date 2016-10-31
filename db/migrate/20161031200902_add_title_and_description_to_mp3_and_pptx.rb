class AddTitleAndDescriptionToMp3AndPptx < ActiveRecord::Migration
  def change
    add_column :reference_mp3s, :title, :string
    add_column :reference_mp3s, :description, :string
    add_column :reference_pptxes, :title, :string
    add_column :reference_pptxes, :description, :string
  end
end

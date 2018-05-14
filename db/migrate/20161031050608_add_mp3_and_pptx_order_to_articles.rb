class AddMp3AndPptxOrderToArticles < ActiveRecord::Migration[4.2]
  def change
    add_column :sop_articles, :reference_mp3_order, :string
    add_column :c4d_articles, :reference_mp3_order, :string

    add_column :sop_articles, :reference_pptx_order, :string
    add_column :c4d_articles, :reference_pptx_order, :string
  end
end

class ReferencePptxAndReferenceMp3JoinTables < ActiveRecord::Migration[4.2]
  def change
    create_table :reference_mp3_articles do |t|
      t.integer :reference_mp3_id
      t.references :reference_mp3able, polymorphic: true
      t.timestamps null: false
    end

    create_table :reference_pptx_articles do |t|
      t.integer :reference_pptx_id
      t.references :reference_pptxable, polymorphic: true
      t.timestamps null: false
    end
  end
end

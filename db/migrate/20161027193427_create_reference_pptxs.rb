class CreateReferencePptxs < ActiveRecord::Migration[4.2]
  def change
    create_table :reference_pptxes do |t|
      t.string :url, null: false
      t.string :language, null: false
      t.integer :author_id, null: false
      t.timestamps null: false
    end
  end
end

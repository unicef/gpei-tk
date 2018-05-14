class CreateReferenceMp3s < ActiveRecord::Migration[4.2]
  def change
    create_table :reference_mp3s do |t|
      t.string :url, null: false
      t.string :language, null: false
      t.integer :author_id, null: false
      t.timestamps null: false
    end
  end
end

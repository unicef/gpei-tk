class CreateLanguages < ActiveRecord::Migration[4.2]
  def change
    create_table :languages do |t|
      t.text :title
      t.timestamps null: false
    end
    create_table :language_references do |t|
      t.integer :language_id
      t.references :reference_languageable, polymorphic: true
      t.timestamps null: false
    end
  end
end

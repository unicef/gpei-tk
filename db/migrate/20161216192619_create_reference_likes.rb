class CreateReferenceLikes < ActiveRecord::Migration[4.2]
  def change
    create_table :reference_likes do |t|
      t.integer :like_id
      t.references :reference_likeable, polymorphic: true
      t.string :type, null: false
      t.timestamps null: false
    end
  end
end

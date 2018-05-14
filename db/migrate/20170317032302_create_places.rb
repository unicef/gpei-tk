class CreatePlaces < ActiveRecord::Migration[4.2]
  def change
    create_table :places do |t|
      t.text :title
      t.timestamps null: false
    end
    create_table :place_references do |t|
      t.integer :place_id
      t.references :reference_placeable, polymorphic: true
      t.timestamps null: false
    end
  end
end

class CreateRelatedReferences < ActiveRecord::Migration[4.2]
  def change
    create_table :related_references do |t|
      t.integer :reference_link_id
      t.references :related_referenceable, polymorphic: true
      t.timestamps null: false
    end
  end
end

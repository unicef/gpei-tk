class CreateReferenceLinkTags < ActiveRecord::Migration
  def change
    create_table :tag_references do |t|
      t.integer :tag_id
      t.references :reference_tagable, polymorphic: true
      t.timestamps null: false
    end
  end
end

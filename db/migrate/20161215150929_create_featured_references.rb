class CreateFeaturedReferences < ActiveRecord::Migration[4.2]
  def change
    create_table :featured_references do |t|
      t.integer :reference_link_id
      t.timestamps null: false
    end
  end
end

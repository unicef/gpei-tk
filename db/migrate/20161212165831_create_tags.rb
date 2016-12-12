class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.text :title
      t.timestamps null: false
    end
  end
end

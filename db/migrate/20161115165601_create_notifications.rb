class CreateNotifications < ActiveRecord::Migration[4.2]
  def change
    create_table :notifications do |t|
      t.string :content, null: false
      t.integer :author_id
      t.timestamps null: false
    end
  end
end

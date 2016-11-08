class CreateFeedbackWithContentAndAuthor < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.string :content, null: false
      t.integer :author_id, null: false
      t.timestamps null: false
    end
  end
end

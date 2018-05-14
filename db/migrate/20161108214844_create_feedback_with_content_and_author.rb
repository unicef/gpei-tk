class CreateFeedbackWithContentAndAuthor < ActiveRecord::Migration[4.2]
  def change
    create_table :feedbacks do |t|
      t.string :content, null: false
      t.integer :author_id, null: false
      t.timestamps null: false
    end
  end
end

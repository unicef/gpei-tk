class CreateLikesAndDownloads < ActiveRecord::Migration[4.2]
  def change
    create_table :likes do |t|
      t.integer :author_id, null: false
      t.timestamps null: false
    end

    create_table :downloads do |t|
      t.integer :author_id, null: false
      t.timestamps null: false
    end

    create_table :reference_downloads do |t|
      t.integer :download_id
      t.references :reference_downloadable, polymorphic: true
      t.string :type, null: false
      t.timestamps null: false
    end

    create_table :article_likes do |t|
      t.integer :like_id
      t.references :article_likeable, polymorphic: true
      t.string :type, null: false
      t.timestamps null: false
    end

  end
end

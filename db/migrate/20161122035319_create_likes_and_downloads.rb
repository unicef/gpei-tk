class CreateLikesAndDownloads < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :author_id, null: false
      t.timestamps null: false
    end
    create_table :downloads do |t|
      t.integer :author_id, null: false
      t.timestamps null: false
    end

    create_table :article_downloads do |t|
      t.integer :download_id
      t.references :downloadable, polymorphic: true
      t.timestamps null: false
    end

    create_table :article_likes do |t|
      t.integer :like_id
      t.references :likeable, polymorphic: true
      t.timestamps null: false
    end

  end
end

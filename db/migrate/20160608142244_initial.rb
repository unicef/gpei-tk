class Initial < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false, unique: true
      t.string :password_digest
      t.string :country, null: false
      t.string :organization, null: false
      t.integer :role_id, null: false
      t.integer :responsible_office_id, null: false
      t.boolean :is_deleted, null: false, default: false
      t.boolean :TOS_accepted, null: false, default: false
      t.timestamps null: false
    end

    create_table :roles do |t|
      t.string :title, null: false, unique: true
      t.timestamps null: false
    end

    create_table :sop_checklists do |t|
      t.integer :user_id, null: false, unique: true
      t.timestamps null: false
    end

    create_table :c4d_toolkits do |t|
      t.integer :user_id, null: false, unique: true
      t.timestamps null: false
    end

    create_table :c4d_articles do |t|
      t.string :cms_title
      t.string :title, null: false
      t.string :content, null: false
      t.integer :c4d_category_id, null: false
      t.integer :c4d_subcategory_id, null: false
      t.string :video_url
      t.integer :order_id, null: false, unique: true
      t.boolean :published, null: false, default: false
      t.integer :author_id, null: false
      t.index :order_id
      t.timestamps null: false
    end

    create_table :sop_articles do |t|
      t.string :cms_title
      t.string :content, null: false
      t.string :title, null: false
      t.integer :sop_category_id, null: false
      t.integer :sop_time_id, null: false
      t.string :video_url
      t.string :support
      t.string :responsible
      t.integer :support_affiliation_id
      t.integer :responsible_office_id
      t.integer :order_id, null: false, unique: true
      t.boolean :published, null: false, default: false
      t.integer :author_id, null: false
      t.index :order_id
      t.timestamps null: false
    end

    create_table :support_affiliations do |t|
      t.string :title, null: false, unique: true
      t.timestamps null: false
    end

    create_table :responsible_offices do |t|
      t.string :title, null: false, unique: true
      t.timestamps null: false
    end

    create_table :c4d_categories do |t|
      t.string :title, null: false, unique: true
      t.string :color, null: false
      t.string :description, null: false
      t.timestamps null: false
    end

    create_table :sop_categories do |t|
      t.string :title, null: false, unique: true
      t.timestamps null: false
    end

    create_table :c4d_subcategories do |t|
      t.string :title, null: false, unique: true
      t.string :color, null: false
      t.integer :c4d_category_id
      t.timestamps null: false
    end

    create_table :sop_times do |t|
      t.string :period, unique: true
      t.string :color
      t.timestamps null: false
    end

    create_table :sop_checklist_sop_articles do |t|
      t.integer :sop_article_id
      t.integer :sop_checklist_id
      t.timestamps null: false
    end

    create_table :c4d_toolkit_c4d_articles do |t|
      t.integer :c4d_article_id
      t.integer :c4d_toolkit_id
      t.timestamps null: false
    end

    create_table :sop_icons do |t|
      t.integer :sop_time_id
      t.integer :sop_category_id
      t.integer :sop_article_id
      t.string :title
      t.timestamps null: false
    end

    create_table :reference_links do |t|
      t.integer :file_name, null: false
      t.references :reference_linkable, polymorphic: true
      t.integer :author_id, null: false
      t.timestamps null: false
    end
  end
end

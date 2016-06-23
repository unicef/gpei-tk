class Initial < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :screenname
      t.string :password_digest
      t.string :organization
      t.string :team
      t.string :company
      t.integer :role_id
      t.integer :office_id
      t.boolean :TOS_accepted
      t.timestamps
    end

    create_table :roles do |t|
      t.string :title
      t.timestamps
    end

    create_table :sop_checklists do |t|
      t.integer :user_id
      t.timestamps
    end

    create_table :c4d_toolkits do |t|
      t.integer :user_id
      t.timestamps
    end

    create_table :c4d_articles do |t|
      t.string :cms_title
      t.string :description
      t.string :title
      t.integer :c4d_category_id
      t.integer :c4d_subcategory_id
      t.string :version
      t.string :videoURL
      t.string :status
      t.string :owner_id
      t.timestamps
    end

    create_table :sop_articles do |t|
      t.string :cms_title
      t.string :article
      t.string :title
      t.integer :sop_category_id
      t.integer :sop_time_id
      t.string :version
      t.string :status
      t.string :video_url
      t.string :support
      t.string :responsible
      t.integer :responsibility_id
      t.integer :owner_id
      t.timestamps
    end

    create_table :offices do |t|
      t.string :title
      t.timestamps
    end

    create_table :c4d_categories do |t|
      t.string :title
      t.string :color
      t.string :description
      t.timestamps
    end

    create_table :sop_categories do |t|
      t.string :title
      t.integer :icon_id
      t.timestamps
    end

    create_table :c4d_subcategories do |t|
      t.string :title
      t.string :color
      t.string :image_name
      t.integer :c4d_category_id
      t.timestamps
    end

    create_table :sop_times do |t|
      t.string :period
      t.string :color
      t.timestamps
    end

    create_table :sop_checklist_sop_articles do |t|
      t.integer :sop_article_id
      t.integer :sop_checklist_id
      t.timestamps
    end

    create_table :c4d_toolkit_c4d_articles do |t|
      t.integer :c4d_article_id
      t.integer :c4d_toolkit_id
      t.timestamps
    end

    create_table :sop_icons do |t|
      t.integer :sop_time_id
      t.integer :sop_category_id
      t.integer :sop_article_id
      t.string :title
      t.timestamps
    end

    create_table :sop_reference_links do |t|
      t.integer :file_name
      t.timestamps
    end

    create_table :sop_template_links do |t|
      t.integer :file_name
      t.timestamps
    end

    create_table :sop_article_sop_reference_links do |t|
      t.integer :sop_reference_link_id
      t.integer :sop_article_id
      t.timestamps
    end

    create_table :sop_article_sop_template_links do |t|
      t.integer :sop_template_link_id
      t.integer :sop_article_id
      t.timestamps
    end

    create_table :c4d_reference_links do |t|
      t.integer :file_name
      t.timestamps
    end

    create_table :c4d_template_links do |t|
      t.integer :file_name
      t.timestamps
    end

    create_table :c4d_article_c4d_reference_links do |t|
      t.integer :c4d_reference_link_id
      t.integer :c4d_article_id
      t.timestamps
    end

    create_table :c4d_article_c4d_template_links do |t|
      t.integer :c4d_template_link_id
      t.integer :c4d_article_id
      t.timestamps
    end
  end
end

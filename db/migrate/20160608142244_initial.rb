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
      t.boolean :TOS_accepted
      t.timestamps
    end

    create_table :roles do |t|
      t.string :type
      t.integer :user_id
      t.timestamps
    end

    create_table :SOP_checklist do |t|
      t.integer :user_id
      t.timestamps
    end

    create_table :C4D_checklist do |t|
      t.integer :user_id
      t.timestamps
    end

    create_table :C4D_articles do |t|
      t.string :CMS_title
      t.string :description
      t.string :title
      t.integer :C4D_category_id
      t.integer :C4D_subcategory_id
      t.string :version
      t.string :status
      t.string :owner_id
      t.timestamps
    end

    create_table :SOP_articles do |t|
      t.string :CMS_title
      t.string :article
      t.string :title
      t.integer :SOP_category_id
      t.integer :SOP_time_id
      t.string :version
      t.string :status
      t.integer :owner_id
      t.timestamps
    end

    create_table :offices do |t|
      t.string :title
      t.timestamps
    end

    create_table :C4D_categories do |t|
      t.string :title
      t.timestamps
    end

    create_table :SOP_categories do |t|
      t.string :title
      t.timestamps
    end

    create_table :C4D_subcategories do |t|
      t.string :title
      t.timestamps
    end

    create_table :SOP_times do |t|
      t.string :period
      t.timestamps
    end
  end
end

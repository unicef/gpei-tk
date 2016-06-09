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

    create_table :c4d_checklists do |t|
      t.integer :user_id
      t.timestamps
    end

    create_table :c4d_articles do |t|
      t.string :CMS_title
      t.string :description
      t.string :title
      t.integer :c4d_category_id
      t.integer :c4d_subcategory_id
      t.string :version
      t.string :status
      t.string :owner_id
      t.timestamps
    end

    create_table :sop_articles do |t|
      t.string :CMS_title
      t.string :article
      t.string :title
      t.integer :sop_category_id
      t.integer :sop_time_id
      t.string :version
      t.string :status
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
      t.timestamps
    end

    create_table :sop_categories do |t|
      t.string :title
      t.timestamps
    end

    create_table :c4d_subcategories do |t|
      t.string :title
      t.timestamps
    end

    create_table :sop_times do |t|
      t.string :period
      t.timestamps
    end

    create_table :sopchecklist_soparticles do |t|
      t.integer :sop_article_id
      t.integer :sop_checklist_id
      t.timestamps
    end
  end
end

class ForgotPassword < ActiveRecord::Migration
  def change
    create_table :forgot_passwords do |t|
      t.integer :user_id, null: false
      t.string :user_key, null: false, unique: true
      t.boolean :expired, null: false, default: false
      t.timestamps null: false
    end
  end
end

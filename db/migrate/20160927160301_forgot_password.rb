class ForgotPassword < ActiveRecord::Migration
  def change
    create_table :forgot_passwords do |t|
      t.integer :user_id, null: false
      t.integer :user_key, null: false, unique: true
      t.integer :secret_key, null: false, unique: true
      t.timestamps null: false
    end
  end
end

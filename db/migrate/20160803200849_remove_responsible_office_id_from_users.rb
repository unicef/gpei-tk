class RemoveResponsibleOfficeIdFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :responsible_office_id, :integer
  end
end

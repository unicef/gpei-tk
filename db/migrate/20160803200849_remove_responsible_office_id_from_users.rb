class RemoveResponsibleOfficeIdFromUsers < ActiveRecord::Migration[4.2]
  def change
    remove_column :users, :responsible_office_id, :integer
  end
end

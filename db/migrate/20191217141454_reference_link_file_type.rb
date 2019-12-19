class ReferenceLinkFileType < ActiveRecord::Migration[5.2]
  def change
		create_table :file_types do |t|
	    t.string :title, null: false
	    t.timestamps null: false
	  end
		add_column :reference_links, :file_type_id, :integer
	end
end

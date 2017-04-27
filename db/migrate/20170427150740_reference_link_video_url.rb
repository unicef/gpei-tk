class ReferenceLinkVideoUrl < ActiveRecord::Migration
  def change
    add_column :reference_links, :video_url, :string
    add_column :reference_links, :is_video, :boolean
    change_column_null :reference_links, :absolute_url, true
    remove_column :reference_links, :countries
  end
end

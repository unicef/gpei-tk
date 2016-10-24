class AddReferenceLinkOrderToArticles < ActiveRecord::Migration
  def change
    add_column :sop_articles, :reference_link_order, :string
    add_column :c4d_articles, :reference_link_order, :string
  end
end

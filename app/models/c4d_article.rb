class C4dArticle < ActiveRecord::Base
  belongs_to :c4d_category
  belongs_to :c4d_subcategory
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'

  validates_uniqueness_of :title, :CMS_title
end
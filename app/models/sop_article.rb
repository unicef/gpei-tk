class SopArticle < ActiveRecord::Base
  belongs_to :sop_time
  belongs_to :sop_category
  belongs_to :responsibility, class_name: 'Office', foreign_key: 'responsibility_id'
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :sopchecklist_soparticles

  validates_uniqueness_of :title, :CMS_title

  def to_param
    [id, title.parameterize].join("-")
  end
end
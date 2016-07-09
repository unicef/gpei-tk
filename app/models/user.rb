class User < ActiveRecord::Base
  has_secure_password
  has_many :c4d_articles
  has_many :sop_articles
  has_one :sop_checklist
  has_one :c4d_toolkit
  belongs_to :responsible_office
  belongs_to :role

  validates_uniqueness_of :email

  def is_admin?
    self.role.title == 'Administrator' || self.role.title == 'root'
  end

  def is_editor?
    self.role.title == 'Editor'
  end

end
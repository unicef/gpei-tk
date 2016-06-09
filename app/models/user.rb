class User < ActiveRecord::Base
  has_secure_password
  has_many :c4d_articles
  has_many :sop_articles
  has_one :sop_checklist
  has_one :c4d_checklist
  belongs_to :office
  belongs_to :role
end
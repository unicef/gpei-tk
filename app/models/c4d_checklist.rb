class C4dToolkit < ActiveRecord::Base
  has_one :user
  has_many :c4d_articles, :through => :c4dtoolkit_c4darticles
  has_many :c4dtoolkit_c4darticles
end
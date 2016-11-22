class C4dArticle < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_articles, :against => {:title => 'A', :content => 'B'},
                                    :using => {
                                      :tsearch => {:dictionary => "english"}
                                    }
  belongs_to :c4d_category
  belongs_to :c4d_subcategory
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_many :c4d_toolkits
  has_many :c4d_toolkit_c4d_articles
  has_many :c4d_toolkits, :through => :c4d_toolkit_c4d_articles

  has_attached_file :reference_link
  has_many :reference_link_articles, as: :reference_linkable
  has_many :reference_links, through: :reference_link_articles

  has_attached_file :reference_mp3
  has_many :reference_mp3_articles, as: :reference_mp3able
  has_many :reference_mp3s, through: :reference_mp3_articles

  has_attached_file :reference_pptx
  has_many :reference_pptx_articles, as: :reference_pptxable
  has_many :reference_pptxes, through: :reference_pptx_articles

  has_many :article_likes, as: :likeable
  has_many :likes, through: :article_likes

  has_many :article_downloads, as: :downloadable
  has_many :downloads, through: :article_downloads

  has_many :embedded_images

  def next
    self.class.where('order_id > ? AND c4d_category_id = ? AND c4d_subcategory_id = ?', order_id, c4d_category_id, c4d_subcategory_id).order(:order_id).first
  end

  def previous
    self.class.where('order_id < ? AND c4d_category_id = ? AND c4d_subcategory_id = ?', order_id, c4d_category_id, c4d_subcategory_id).order(:order_id).last
  end

  def to_param
    [id, title.parameterize].join("-")
  end
end
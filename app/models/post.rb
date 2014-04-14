class Post < ActiveRecord::Base
  #after_update :save_images
  default_scope {order('created_at DESC')}

  belongs_to :user
  has_many :images
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :post_content, presence: true

  def save_images
    images.each do |image|
      image.save()
    end
  end
end

class ForgotPassword < ApplicationRecord
  belongs_to :user

  validates_uniqueness_of :user_key

  def expired?
    if (self.created_at + 4.hours).past?
      self.update(expired: true)
      errors.add(:expired, 'forgotten password link has expired')
      return true
    end
    false
  end
end
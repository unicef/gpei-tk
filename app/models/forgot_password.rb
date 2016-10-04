class ForgotPassword < ActiveRecord::Base
  belongs_to :user

  validate :user_key_not_eq_secret_key, :expired

  validates_uniqueness_of :user_key, :secret_key

  def user_key_not_eq_secret_key
    if self.user_key == self.secret_key
      errors.add(:keys, 'user key and secret key are the same')
    end
  end

  def expired
    if (self.created_at + 4.hours).past?
      errors.add(:expired, 'forgotten password link has expired')
    end
  end
end
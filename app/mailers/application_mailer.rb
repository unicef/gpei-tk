class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('MAIL_LOGIN')
  layout 'mailer'
end
class ApplicationMailer < ActionMailer::Base
  default from: "notify@poliok.it"
  layout 'mailer'
end
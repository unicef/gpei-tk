puts 'seeding database...'

Role.create(title: 'root')
Role.create(title: 'Owner')
Role.create(title: 'Administrator')
Role.create(title: 'Editor')
Role.create(title: 'Member')

SopTime.create(period: 'Immediately')
SopTime.create(period: '14 Days')
SopTime.create(period: '24 Hours')
SopTime.create(period: '72 Hours')
SopTime.create(period: '14 Days to close')
SopTime.create(period: '3 Weeks')
SopTime.create(period: '3 Months')

SopCategory.create(title: 'Coordination and Advocacy')
SopCategory.create(title: 'Technical and Human Resources')
SopCategory.create(title: 'Information Management')
SopCategory.create(title: 'Communication')
SopCategory.create(title: 'Finances and Logistics')
SopCategory.create(title: 'Context')
SopCategory.create(title: 'Outbreak Confirmation')

C4dCategory.create(title: 'Plan')
C4dCategory.create(title: 'Understand')
C4dCategory.create(title: 'Tools')
C4dCategory.create(title: 'Act')

C4dSubcategory.create(title: 'Behavioural Goal')
C4dSubcategory.create(title: 'Using Evidence')
C4dSubcategory.create(title: 'ID High Risk Groups')
C4dSubcategory.create(title: 'Segmentation')
C4dSubcategory.create(title: 'Barriers')
C4dSubcategory.create(title: 'Messaging')
C4dSubcategory.create(title: 'ID Your Scenario')
C4dSubcategory.create(title: 'The Global Strategy')
C4dSubcategory.create(title: 'Integrated Action')
C4dSubcategory.create(title: 'Capacity Building')
C4dSubcategory.create(title: 'Monitor Evaluate')
C4dSubcategory.create(title: 'Mass Media IEC')
C4dSubcategory.create(title: 'Training')
C4dSubcategory.create(title: 'Management Tools')
C4dSubcategory.create(title: 'Innovations')
C4dSubcategory.create(title: 'Channel Analysis')

Office.create(title: 'Country')
Office.create(title: 'WHO')
Office.create(title: 'UNICEF')
Office.create(title: 'Rapid Response')
Office.create(title: 'Surge Team')

user = User.new(first_name: 'root', email: 'root@example.com', screenname: 'root', TOS_accepted: true)
user.password = 'foobar'
user.role = Role.where(title: 'root').first
user.office = Office.where(title: 'UNICEF').first
user.save

puts 'done!'
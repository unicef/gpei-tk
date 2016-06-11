puts 'seeding database...'

Role.create(title: 'root')
Role.create(title: 'Owner')
Role.create(title: 'Administrator')
Role.create(title: 'Editor')
Role.create(title: 'Member')


##immediately, 3 weeks, and 3 months do not have a color assigned.
SopTime.create(period: 'Immediately', color:'#FDFDFD')
SopTime.create(period: '14 Days', color: '#B12924')
SopTime.create(period: '24 Hours', color: '#EB5F65')
SopTime.create(period: '72 Hours', color: '#F49393')
SopTime.create(period: '15 Days-Close', color: '#FBE3E6')
SopTime.create(period: '3 Weeks', color:'#FDFDFD')
SopTime.create(period: '3 Months', color:'#FDFDFD')

SopCategory.create(title: 'Coordination and Advocacy')
SopCategory.create(title: 'Technical and Human Resources')
SopCategory.create(title: 'Information Management')
SopCategory.create(title: 'Communication')
SopCategory.create(title: 'Finances and Logistics')
SopCategory.create(title: 'Context')
SopCategory.create(title: 'Outbreak Confirmation')

C4dCategory.create(title: 'Understand', color:'#8DA900')
C4dCategory.create(title: 'Plan', color:'#0735AC')
C4dCategory.create(title: 'Act', color:'#008953')
C4dCategory.create(title: 'Tools', color:'#009DA4')

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

SopArticle.create(title: 'awesome_title', sop_time_id: 2, CMS_title: 'awesome_title', responsibility_id: 1, sop_category_id: 7)
SopArticle.create(title: 'awesome_title2', sop_time_id: 3, CMS_title: 'awesome_title2', responsibility_id: 2, sop_category_id: 6)
SopArticle.create(title: 'awesome_title3', sop_time_id: 4, CMS_title: 'awesome_title3', responsibility_id: 3, sop_category_id: 5)
SopArticle.create(title: 'awesome_title4', sop_time_id: 4, CMS_title: 'awesome_title4', responsibility_id: 4, sop_category_id: 4)
SopArticle.create(title: 'awesome_title5', sop_time_id: 2, CMS_title: 'awesome_title5', responsibility_id: 5, sop_category_id: 3)
SopArticle.create(title: 'awesome_title6', sop_time_id: 4, CMS_title: 'awesome_title6', responsibility_id: 3, sop_category_id: 2)
SopArticle.create(title: 'awesome_title7', sop_time_id: 5, CMS_title: 'awesome_title7', responsibility_id: 3, sop_category_id: 2)

user = User.new(first_name: 'root', email: 'root@example.com', screenname: 'root', TOS_accepted: true)
user.password = 'foobar'
user.role = Role.where(title: 'root').first
user.office = Office.where(title: 'UNICEF').first
user.save

SopChecklist.create(user_id: user.id)

puts 'done!'
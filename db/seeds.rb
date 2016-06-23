puts 'seeding database...'

Role.create(title: 'root')
Role.create(title: 'Owner')
Role.create(title: 'Administrator')
Role.create(title: 'Editor')
Role.create(title: 'Member')

##immediately, 3 weeks, and 3 months do not have a color assigned.
SopTime.create(period: 'Immediately', color:'#FDFDFD')
SopTime.create(period: '14 Days', color: '#F49393')
SopTime.create(period: '24 Hours', color: '#B12924')
SopTime.create(period: '72 Hours', color: '#EB5F65')
SopTime.create(period: '14 Days-Close', color: '#FBE3E6')
SopTime.create(period: '3 Weeks', color:'#FDFDFD')
SopTime.create(period: '3 Months', color:'#FDFDFD')

SopCategory.create(title: 'Coordination and Advocacy')
SopCategory.create(title: 'Technical and Human Resources')
SopCategory.create(title: 'Information Management')
SopCategory.create(title: 'Communication')
SopCategory.create(title: 'Finances and Logistics')
SopCategory.create(title: 'Context')
SopCategory.create(title: 'Outbreak Confirmation')

SopIcon.create(sop_time_id: 2, sop_category_id: 1, title: '14Days_AdvoCoor')
SopIcon.create(sop_time_id: 2, sop_category_id: 4, title: '14Days_ExCom')
SopIcon.create(sop_time_id: 2, sop_category_id: 5, title: '14Days_Finance')
SopIcon.create(sop_time_id: 2, sop_category_id: 3, title: '14Days_InfoMan')
SopIcon.create(sop_time_id: 2, sop_category_id: 2, title: '14Days_TechHuman')

SopIcon.create(sop_time_id: 5, sop_category_id: 1, title: '14DaysClose_AdvoCoor')
SopIcon.create(sop_time_id: 5, sop_category_id: 6, title: '14DaysClose_Context')
SopIcon.create(sop_time_id: 5, sop_category_id: 4, title: '14DaysClose_ExCom')
SopIcon.create(sop_time_id: 5, sop_category_id: 5, title: '14DaysClose_Finance')
SopIcon.create(sop_time_id: 5, sop_category_id: 3, title: '14DaysClose_InfoMan')
SopIcon.create(sop_time_id: 5, sop_category_id: 2, title: '14DaysClose_TechHuman')

SopIcon.create(sop_time_id: 3, sop_category_id: 5, title: '24Hours_Finance')
SopIcon.create(sop_time_id: 3, sop_category_id: 3, title: '24Hours_InfoMan')
SopIcon.create(sop_time_id: 3, sop_category_id: 7, title: '24Hours_OutbreakConfir')
SopIcon.create(sop_time_id: 3, sop_category_id: 2, title: '24Hours_TechHuman')

SopIcon.create(sop_time_id: 4, sop_category_id: 1, title: '72Hours_AdvoCoor')
SopIcon.create(sop_time_id: 4, sop_category_id: 6, title: '72Hours_Context')
SopIcon.create(sop_time_id: 4, sop_category_id: 4, title: '72Hours_ExCom')
SopIcon.create(sop_time_id: 4, sop_category_id: 5, title: '72Hours_Finance')
SopIcon.create(sop_time_id: 4, sop_category_id: 3, title: '72Hours_InfoMan')
SopIcon.create(sop_time_id: 4, sop_category_id: 7, title: '72Hours_OutbreakConfir')
SopIcon.create(sop_time_id: 4, sop_category_id: 2, title: '72Hours_TechHuman')

C4dCategory.create(title: 'Understand', color:'#8DA900', description: "At the end of this section, you will understand the problem and the highest risk groups and their perception of vaccination, you will understand how to use research to refine the objectives and the role communication can play.")
C4dCategory.create(title: 'Plan', color:'#0735AC', description: "At the end of this section, you will have defined the target audience, barriers to change, developed messaging and channels to reach the target. You will have used and understood the Comms Planning Tool.")
C4dCategory.create(title: 'Act', color:'#008953', description: "At the end of this section, you will understand and will be able go to apply the global strategy, including integrated communication tactics, their strengths and weaknesses, plus how to evaluate and monitor your own strategy's success.")
C4dCategory.create(title: 'Tools', color:'#009DA4', description: "At the end of this section, you will have access to practical tools and how to use them, including in Innovations and innovations research. dashboard and other Management Tools.")

C4dSubcategory.create(title: 'Behavioural Goal', c4d_category_id: 1, color: '#5F7B05')
C4dSubcategory.create(title: 'Using Evidence', c4d_category_id: 1, color: '#8da900')
C4dSubcategory.create(title: 'ID High Risk Groups', c4d_category_id: 1, color: '#B3D438')
C4dSubcategory.create(title: 'Segmentation', c4d_category_id: 2, color: '#072F77')
C4dSubcategory.create(title: 'Barriers', c4d_category_id: 2, color: '#0735AC')
C4dSubcategory.create(title: 'Messaging', c4d_category_id: 2, color: '#2076DB')
C4dSubcategory.create(title: 'Channel Analysis', c4d_category_id: 2, color: '#5AB0F1')
C4dSubcategory.create(title: 'ID Your Scenario', c4d_category_id: 2, color: '#B3E1FF')
C4dSubcategory.create(title: 'The Global Strategy', c4d_category_id: 3, color: '#06583D')
C4dSubcategory.create(title: 'Integrated Action', c4d_category_id: 3, color: '#008953')
# C4dSubcategory.create(title: 'Capacity Building', c4d_category_id: 3, color: '#5F7B05')
C4dSubcategory.create(title: 'Monitor Evaluate', c4d_category_id: 3, color: '#C4F1C4')
C4dSubcategory.create(title: 'Mass Media IEC', c4d_category_id: 4, color: '#1C6682')
C4dSubcategory.create(title: 'Training', c4d_category_id: 4, color: '#009DA4')
C4dSubcategory.create(title: 'Management Tools', c4d_category_id: 4, color: '#1DBEBE')
C4dSubcategory.create(title: 'Innovations', c4d_category_id: 4, color: '#AEF1DF')

Office.create(title: 'Country')
Office.create(title: 'WHO')
Office.create(title: 'UNICEF')
Office.create(title: 'Rapid Response')
Office.create(title: 'Surge Team')

C4dArticle.create(title: 'awesome_title', c4d_category_id: 1, c4d_subcategory_id: 1, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title2', c4d_category_id: 1, c4d_subcategory_id: 2, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title3', c4d_category_id: 1, c4d_subcategory_id: 3, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title4', c4d_category_id: 2, c4d_subcategory_id: 4, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title5', c4d_category_id: 2, c4d_subcategory_id: 5, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title6', c4d_category_id: 2, c4d_subcategory_id: 6, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title7', c4d_category_id: 2, c4d_subcategory_id: 7, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title8', c4d_category_id: 2, c4d_subcategory_id: 8, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title9', c4d_category_id: 3, c4d_subcategory_id: 9, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title10', c4d_category_id: 3, c4d_subcategory_id: 10, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title11', c4d_category_id: 3, c4d_subcategory_id: 11, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title12', c4d_category_id: 4, c4d_subcategory_id: 12, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title13', c4d_category_id: 4, c4d_subcategory_id: 13, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title14', c4d_category_id: 4, c4d_subcategory_id: 14, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title15', c4d_category_id: 4, c4d_subcategory_id: 15, description: 'foobar', cms_title: 'awesome_title')

C4dArticle.create(title: 'awesome_title16', c4d_category_id: 1, c4d_subcategory_id: 1, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title17', c4d_category_id: 1, c4d_subcategory_id: 2, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title18', c4d_category_id: 1, c4d_subcategory_id: 3, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title19', c4d_category_id: 2, c4d_subcategory_id: 4, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title20', c4d_category_id: 2, c4d_subcategory_id: 5, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title21', c4d_category_id: 2, c4d_subcategory_id: 6, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title22', c4d_category_id: 2, c4d_subcategory_id: 7, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title23', c4d_category_id: 2, c4d_subcategory_id: 8, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title24', c4d_category_id: 3, c4d_subcategory_id: 9, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title25', c4d_category_id: 3, c4d_subcategory_id: 10, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title26', c4d_category_id: 3, c4d_subcategory_id: 11, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title27', c4d_category_id: 4, c4d_subcategory_id: 12, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title28', c4d_category_id: 4, c4d_subcategory_id: 13, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title29', c4d_category_id: 4, c4d_subcategory_id: 14, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title30', c4d_category_id: 4, c4d_subcategory_id: 15, description: 'foobar', cms_title: 'awesome_title')

C4dArticle.create(title: 'awesome_title31', c4d_category_id: 1, c4d_subcategory_id: 1, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title32', c4d_category_id: 1, c4d_subcategory_id: 2, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title33', c4d_category_id: 1, c4d_subcategory_id: 3, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title34', c4d_category_id: 2, c4d_subcategory_id: 4, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title35', c4d_category_id: 2, c4d_subcategory_id: 5, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title36', c4d_category_id: 2, c4d_subcategory_id: 6, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title37', c4d_category_id: 2, c4d_subcategory_id: 7, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title38', c4d_category_id: 2, c4d_subcategory_id: 8, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title39', c4d_category_id: 3, c4d_subcategory_id: 9, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title40', c4d_category_id: 3, c4d_subcategory_id: 10, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title41', c4d_category_id: 3, c4d_subcategory_id: 11, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title42', c4d_category_id: 4, c4d_subcategory_id: 12, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title43', c4d_category_id: 4, c4d_subcategory_id: 13, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title44', c4d_category_id: 4, c4d_subcategory_id: 14, description: 'foobar', cms_title: 'awesome_title')
C4dArticle.create(title: 'awesome_title45', c4d_category_id: 4, c4d_subcategory_id: 15, description: 'foobar', cms_title: 'awesome_title')


sop_article = SopArticle.create(title: 'awesome_title', sop_time_id: 2, cms_title: 'awesome_title', responsibility_id: 1, sop_category_id: 1)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title2', sop_time_id: 2, cms_title: 'awesome_title2', responsibility_id: 2, sop_category_id: 4)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title4', sop_time_id: 2, cms_title: 'awesome_title4', responsibility_id: 4, sop_category_id: 5)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title6', sop_time_id: 2, cms_title: 'awesome_title6', responsibility_id: 3, sop_category_id: 3)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title7', sop_time_id: 2, cms_title: 'awesome_title7', responsibility_id: 1, sop_category_id: 2)
binding.pry
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title8', sop_time_id: 5, cms_title: 'awesome_title8', responsibility_id: 2, sop_category_id: 1)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title9', sop_time_id: 5, cms_title: 'awesome_title9', responsibility_id: 4, sop_category_id: 6)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title10', sop_time_id: 5, cms_title: 'awesome_title10', responsibility_id: 3, sop_category_id: 4)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title11', sop_time_id: 5, cms_title: 'awesome_title11', responsibility_id: 1, sop_category_id: 5)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title12', sop_time_id: 5, cms_title: 'awesome_title12', responsibility_id: 2, sop_category_id: 3)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title13', sop_time_id: 5, cms_title: 'awesome_title13', responsibility_id: 4, sop_category_id: 2)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title14', sop_time_id: 3, cms_title: 'awesome_title14', responsibility_id: 3, sop_category_id: 5)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title15', sop_time_id: 3, cms_title: 'awesome_title15', responsibility_id: 1, sop_category_id: 3)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title16', sop_time_id: 3, cms_title: 'awesome_title16', responsibility_id: 2, sop_category_id: 7)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title17', sop_time_id: 3, cms_title: 'awesome_title17', responsibility_id: 4, sop_category_id: 2)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title18', sop_time_id: 4, cms_title: 'awesome_title18', responsibility_id: 3, sop_category_id: 1)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title19', sop_time_id: 4, cms_title: 'awesome_title19', responsibility_id: 2, sop_category_id: 6)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title20', sop_time_id: 4, cms_title: 'awesome_title20', responsibility_id: 4, sop_category_id: 4)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title21', sop_time_id: 4, cms_title: 'awesome_title21', responsibility_id: 3, sop_category_id: 5)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title22', sop_time_id: 4, cms_title: 'awesome_title22', responsibility_id: 1, sop_category_id: 3)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title23', sop_time_id: 4, cms_title: 'awesome_title23', responsibility_id: 2, sop_category_id: 7)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save
sop_article = SopArticle.create(title: 'awesome_title24', sop_time_id: 4, cms_title: 'awesome_title24', responsibility_id: 4, sop_category_id: 2)
sop_article.sop_icon = SopIcon.where(sop_time_id: sop_article.sop_time.id, sop_category_id: sop_article.sop_category.id).first
sop_article.save

user = User.new(first_name: 'root', email: 'root@example.com', screenname: 'root', TOS_accepted: true)
user.password = 'foobar'
user.role = Role.where(title: 'root').first
user.office = Office.where(title: 'UNICEF').first
user.save

SopChecklist.create(user_id: user.id)
C4dToolkit.create(user_id: user.id)

puts 'done!'
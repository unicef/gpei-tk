puts 'seeding database...'

Role.create(title: 'root')
Role.create(title: 'Administrator')
Role.create(title: 'Editor')
Role.create(title: 'Member')

ResponsibleOffice.create(title: 'Country')
ResponsibleOffice.create(title: 'Rapid Response')
ResponsibleOffice.create(title: 'Surge Team')
ResponsibleOffice.create(title: 'UNICEF')
ResponsibleOffice.create(title: 'WHO')

SupportAffiliation.create(title: 'WHO')
SupportAffiliation.create(title: 'CDC')
SupportAffiliation.create(title: 'UNICEF')
SupportAffiliation.create(title: 'Other')

##immediately, 3 weeks, and 3 months do not have a color assigned.
# SopTime.create(period: 'Immediately', color:'#FDFDFD')
SopTime.create(period: '14 Days', color: '#F49393')
SopTime.create(period: '24 Hours', color: '#B12924')
SopTime.create(period: '72 Hours', color: '#EB5F65')
SopTime.create(period: '14 Days-Close', color: '#FBE3E6')
# SopTime.create(period: '3 Weeks', color:'#FDFDFD')
# SopTime.create(period: '3 Months', color:'#FDFDFD')

SopCategory.create(title: 'Coordination and Advocacy')
SopCategory.create(title: 'Technical and Human Resources')
SopCategory.create(title: 'Information Management')
SopCategory.create(title: 'Communication')
SopCategory.create(title: 'Finances and Logistics')
SopCategory.create(title: 'Context')
SopCategory.create(title: 'Outbreak Confirmation')

SopIcon.create(sop_time_id: 1, sop_category_id: 1, title: '14Days_AdvoCoor')
SopIcon.create(sop_time_id: 1, sop_category_id: 2, title: '14Days_TechHuman')
SopIcon.create(sop_time_id: 1, sop_category_id: 3, title: '14Days_InfoMan')
SopIcon.create(sop_time_id: 1, sop_category_id: 4, title: '14Days_ExCom')
SopIcon.create(sop_time_id: 1, sop_category_id: 5, title: '14Days_Finance')

SopIcon.create(sop_time_id: 2, sop_category_id: 2, title: '24Hours_TechHuman')
SopIcon.create(sop_time_id: 2, sop_category_id: 3, title: '24Hours_InfoMan')
SopIcon.create(sop_time_id: 2, sop_category_id: 5, title: '24Hours_Finance')
SopIcon.create(sop_time_id: 2, sop_category_id: 7, title: '24Hours_OutbreakConfir')

SopIcon.create(sop_time_id: 3, sop_category_id: 1, title: '72Hours_AdvoCoor')
SopIcon.create(sop_time_id: 3, sop_category_id: 2, title: '72Hours_TechHuman')
SopIcon.create(sop_time_id: 3, sop_category_id: 3, title: '72Hours_InfoMan')
SopIcon.create(sop_time_id: 3, sop_category_id: 4, title: '72Hours_ExCom')
SopIcon.create(sop_time_id: 3, sop_category_id: 5, title: '72Hours_Finance')
SopIcon.create(sop_time_id: 3, sop_category_id: 6, title: '72Hours_Context')
SopIcon.create(sop_time_id: 3, sop_category_id: 7, title: '72Hours_OutbreakConfir')

SopIcon.create(sop_time_id: 4, sop_category_id: 1, title: '14DaysClose_AdvoCoor')
SopIcon.create(sop_time_id: 4, sop_category_id: 2, title: '14DaysClose_TechHuman')
SopIcon.create(sop_time_id: 4, sop_category_id: 3, title: '14DaysClose_InfoMan')
SopIcon.create(sop_time_id: 4, sop_category_id: 4, title: '14DaysClose_ExCom')
SopIcon.create(sop_time_id: 4, sop_category_id: 5, title: '14DaysClose_Finance')
SopIcon.create(sop_time_id: 4, sop_category_id: 6, title: '14DaysClose_Context')

C4dCategory.create(title: 'Understand', color:'#8DA900', description: "At the end of this section, you will understand the problem and the highest risk groups and their perception of vaccination, you will understand how to use research to refine the objectives and the role communication can play.")
C4dCategory.create(title: 'Plan', color:'#0735AC', description: "At the end of this section, you will have defined the target audience, barriers to change, developed messaging and channels to reach the target. You will have used and understood the Comms Planning Tool.")
C4dCategory.create(title: 'Act', color:'#008953', description: "At the end of this section, you will understand and will be able go to apply the global strategy, including integrated communication tactics, their strengths and weaknesses, plus how to evaluate and monitor your own strategy's success.")
C4dCategory.create(title: 'Tools', color:'#009DA4', description: "At the end of this section, you will have access to practical tools and how to use them, including in Innovations and innovations research. dashboard and other Management Tools.")

C4dSubcategory.create(title: 'Behavioural Goal', c4d_category_id: 1, color: '#5F7B05')
C4dSubcategory.create(title: 'Using Evidence', c4d_category_id: 1, color: '#8DA900')
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

user = User.new(
  first_name: 'root',
  last_name: 'guy',
  country: 'USA',
  email: 'root@example.com',
  TOS_accepted: true)
user.password = 'foobar'
user.role = Role.where(title: 'root').first
user.organization = user.role.title
user.responsible_office = ResponsibleOffice.where(title: 'UNICEF').first
user.save

content_random_number_max = 20
order_id = 0
all_users = User.all
responsible_offices = ResponsibleOffice.all
support_affiliations = SupportAffiliation.all

C4dCategory.all.count.times do |x|
  c4d_category_id = x + 1
  3.times do |times|
    category_offset = 0
    c4d_category = C4dCategory.find(c4d_category_id)
    if c4d_category.title == 'Plan'
      category_offset = 4
    elsif c4d_category.title == 'Act'
      category_offset = 9
    elsif c4d_category.title == 'Tools'
      category_offset = 12
    end
    C4dSubcategory.where(c4d_category_id: c4d_category.id).count.times do |y|
      C4dArticle.create(
        cms_title: Faker::Lorem.words(rand(2)+1).join(' '),
        title: Faker::Lorem.sentence,
        content: Faker::Lorem.paragraph(rand(content_random_number_max)+1),
        c4d_category_id: c4d_category_id,
        c4d_subcategory_id: category_offset += 1,
        video_url: rand(2).even? ? Faker::Internet.url : '',
        published: true,
        order_id: order_id += 1,
        author_id: all_users.sample.id
        )
    end
  end
end

SopTime.all.count.times do |x|
  sop_time_id = x + 1
  3.times do |times|
    sop_time_id_categories = []
    sop_time = SopTime.find(sop_time_id)
    if sop_time.period == '14 Days'
      sop_time_id_categories = [2,3,4,5]
    elsif sop_time.period == '24 Hours'
      sop_time_id_categories = [2,3,5,7]
    elsif sop_time.period == '72 Hours'
      sop_time_id_categories = [1,2,3,4,5,6,7]
    elsif sop_time.period == '14 Days-Close'
      sop_time_id_categories = [1,2,3,4,5,6]
    end
    sop_time_id_categories.size.times do |idx|
      sop_article = SopArticle.create(
        cms_title: Faker::Lorem.words(rand(2)+1).join(' '),
        content: Faker::Lorem.paragraph(rand(content_random_number_max)+1),
        title: Faker::Lorem.sentence,
        sop_category_id: sop_time_id_categories[idx],
        sop_time_id: sop_time_id,
        video_url: rand(2).even? ? Faker::Internet.url : '',
        order_id: order_id += 1,
        responsible_office_id: responsible_offices.sample.id,
        support_affiliation_id: support_affiliations.sample.id,
        published: true,
        author_id: all_users.sample.id
      )
      icon_title = SopIcon.where(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id).first.title
      SopIcon.create(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id, sop_article_id: sop_article.id, title: icon_title)
    end
  end
end

SopChecklist.create(user_id: user.id)
C4dToolkit.create(user_id: user.id)

puts 'done!'
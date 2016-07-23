puts 'seeding database...'

Role.create(title: 'root')
Role.create(title: 'Administrator')
Role.create(title: 'Editor')
Role.create(title: 'Member')

ResponsibleOffice.create(title: 'Country')
ResponsibleOffice.create(title: 'Rapid Response')
ResponsibleOffice.create(title: 'Surge Team')
ResponsibleOffice.create(title: 'Ministry of Health')
ResponsibleOffice.create(title: 'UNICEF')
ResponsibleOffice.create(title: 'WHO')
ResponsibleOffice.create(title: 'EOMG')
ResponsibleOffice.create(title: 'GPEI')

SupportAffiliation.create(title: 'WHO')
SupportAffiliation.create(title: 'CDC')
SupportAffiliation.create(title: 'UNICEF')
SupportAffiliation.create(title: 'Other')

##immediately, 3 weeks, and 3 months do not have a color assigned.
# SopTime.create(period: 'Immediately', color:'#FDFDFD')
SopTime.create(period: '24 Hours', color: '#B12924')
SopTime.create(period: '72 Hours', color: '#EB5F65')
SopTime.create(period: '14 Days', color: '#F49393')
SopTime.create(period: '14 Days to Close', color: '#FBE3E6')
# SopTime.create(period: '3 Weeks', color:'#FDFDFD')
# SopTime.create(period: '3 Months', color:'#FDFDFD')

SopCategory.create(title: 'Coordination and Advocacy')
SopCategory.create(title: 'Technical and Human Resources')
SopCategory.create(title: 'Information Management')
SopCategory.create(title: 'Communication')
SopCategory.create(title: 'Finances and Logistics')
SopCategory.create(title: 'Context')
SopCategory.create(title: 'Outbreak Confirmation')

SopIcon.create(sop_time_id: 1, sop_category_id: 2, title: '24Hours_TechHuman')
SopIcon.create(sop_time_id: 1, sop_category_id: 3, title: '24Hours_InfoMan')
SopIcon.create(sop_time_id: 1, sop_category_id: 5, title: '24Hours_Finance')
SopIcon.create(sop_time_id: 1, sop_category_id: 7, title: '24Hours_OutbreakConfir')

SopIcon.create(sop_time_id: 2, sop_category_id: 1, title: '72Hours_AdvoCoor')
SopIcon.create(sop_time_id: 2, sop_category_id: 2, title: '72Hours_TechHuman')
SopIcon.create(sop_time_id: 2, sop_category_id: 3, title: '72Hours_InfoMan')
SopIcon.create(sop_time_id: 2, sop_category_id: 4, title: '72Hours_ExCom')
SopIcon.create(sop_time_id: 2, sop_category_id: 5, title: '72Hours_Finance')
SopIcon.create(sop_time_id: 2, sop_category_id: 6, title: '72Hours_Context')
SopIcon.create(sop_time_id: 2, sop_category_id: 7, title: '72Hours_OutbreakConfir')

SopIcon.create(sop_time_id: 3, sop_category_id: 1, title: '14Days_AdvoCoor')
SopIcon.create(sop_time_id: 3, sop_category_id: 2, title: '14Days_TechHuman')
SopIcon.create(sop_time_id: 3, sop_category_id: 3, title: '14Days_InfoMan')
SopIcon.create(sop_time_id: 3, sop_category_id: 4, title: '14Days_ExCom')
SopIcon.create(sop_time_id: 3, sop_category_id: 5, title: '14Days_Finance')

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
  last_name: 'admin',
  country: 'USA',
  email: 'root@example.com',
  TOS_accepted: true)
user.password = 'foobar'
user.role = Role.find_by(title: 'root')
user.organization = user.role.title
user.responsible_office = ResponsibleOffice.find_by(title: 'UNICEF')
user.save

user = User.new(
  first_name: 'core',
  last_name: 'admin',
  country: 'USA',
  email: 'admin@example.com',
  TOS_accepted: true)
user.password = 'password'
user.role = Role.find_by(title: 'Administrator')
user.organization = user.role.title
user.responsible_office = ResponsibleOffice.find_by(title: 'UNICEF')
user.save

content_random_number_max = 40
root = Role.find_by(title: 'root')
all_users = User.where.not(role_id: root.id)
admin_user = User.find_by(first_name: 'core', last_name: 'admin', email: 'admin@example.com')
responsible_offices = ResponsibleOffice.all
support_affiliations = SupportAffiliation.all

SopChecklist.create(user_id: root.id)
C4dToolkit.create(user_id: root.id)
SopChecklist.create(user_id: admin_user.id)
C4dToolkit.create(user_id: admin_user.id)

def generateC4dArticles(content_random_number_max, all_users)
  C4dCategory.all.count.times do |x|
    c4d_category_id = x + 1
    3.times do |times|
      category_offset = 0
      c4d_category = C4dCategory.find(c4d_category_id)
      if c4d_category.title == 'Plan'
        category_offset = 3
      elsif c4d_category.title == 'Act'
        category_offset = 8
      elsif c4d_category.title == 'Tools'
        category_offset = 11
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
end
# order_id = 0
# generateC4dArticles(content_random_number_max, all_users)

def generateSopArticles(content_random_number_max, all_users, responsible_offices, support_affiliations)
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
end
# order_id = 0
# generateSopArticles(content_random_number_max, all_users, responsible_offices, support_affiliations)

def createC4dArticle(row_elements, admin_user)
  c4d_article = C4dArticle.new
  c4d_article.cms_title = row_elements[3][row_elements[3].index("\"urlTitle\">")+11..row_elements[3].index("</field>")-1].downcase
  c4d_article.created_at = row_elements[1][row_elements[1].index("\"createDate\">")+14..row_elements[1].index("</field>")-1]
  c4d_article.updated_at = row_elements[2][row_elements[2].index("\"modifiedDate\">")+15..row_elements[2].index("</field>")-1]
  c4d_article.order_id = row_elements[3][row_elements[3].index("\"urlTitle\">")+11..row_elements[3].index("</field>")-1].downcase.gsub!('c4d_','').to_i
  c4d_article.published = true
  c4d_article.author_id = admin_user.id
  row_elements[-1].split("<dynamic-element name=")[1..-1].each do |field|
    field_data = field[field.index('><![CDATA[')+10..field.index(']]')-1]
    if !field.index("\"Sub-Category\"").nil? && field.index("\"Sub-Category\"") == 0
      c4d_article.c4d_subcategory_id = C4dSubcategory.find_by(title: field_data).id
    elsif !field.index("\"Category\"").nil? && field.index("\"Category\"") == 0
      c4d_article.c4d_category_id = C4dCategory.find_by(title: field_data).id
    elsif !field.index("\"Title\"").nil? && field.index("\"Title\"") == 0
      c4d_article.title = field_data
    elsif !field.index("\"Description\"").nil? && field.index("\"Description\"") == 0
      c4d_article.content = field_data
    end
  end
  c4d_article.save
end

def getResponsibleTitleToQuery(field_data, support_field, sop_article, calledOnce)
  if field_data.include?('who') && field_data.index('who') == 0
    return 'WHO'
  elsif field_data.include?('ministry of health') && field_data.index('ministry of health')
    return 'Ministry of Health'
  elsif field_data.include?('eomg') && field_data.index('eomg')
    return 'EOMG'
  elsif field_data.include?('unicef') && field_data.index('unicef')
    return 'UNICEF'
  elsif field_data.include?('rapid response team') && field_data.index('rapid response team')
    return 'Rapid Response'
  elsif field_data.include?('country') && field_data.index('country')
    return 'Country'
  elsif field_data.include?('gpei') && field_data.index('gpei')
    return 'GPEI'
  elsif field_data.include?('first surge') && field_data.index('first surge')
    return 'Surge Team'
  elsif field_data.include?('') && field_data.index('')
    getResponsibleTitleToQuery(support_field, '', sop_article, !calledOnce) if calledOnce
  end
end

def createSopArticle(row_elements, admin_user)
  # PARSE OUT &lt; &gt; &quot;
  sop_article = SopArticle.new
  if row_elements[3].index("\"urlTitle\">")
    sop_article.cms_title = row_elements[3][row_elements[3].index("\"urlTitle\">")+11..row_elements[3].index("</field>")-1].downcase
    sop_article.order_id = row_elements[3][row_elements[3].index("\"urlTitle\">")+11..row_elements[3].index("</field>")-1].downcase.gsub!('sop_00','').to_i
  else
    sop_article.cms_title = row_elements[3][row_elements[3].index("\"urlTitle\"<name />")+18..row_elements[3].index("</field>")-1].downcase
    sop_article.order_id = row_elements[3][row_elements[3].index("\"urlTitle\"<name />")+18..row_elements[3].index("</field>")-1].downcase.gsub!('sop_','').to_i
  end

  sop_article.created_at = row_elements[1][row_elements[1].index("\"createDate\">")+14..row_elements[1].index("</field>")-1]
  sop_article.updated_at = row_elements[2][row_elements[2].index("\"modifiedDate\">")+15..row_elements[2].index("</field>")-1]
  sop_article.published = true
  sop_article.author_id = admin_user.id
  row_elements[-1].split("<dynamic-element name=")[1..-1].each do |field|
    field_data = field[field.index('><![CDATA[')+10..field.index(']]')-1]
    if !field.index("\"TIME\"").nil? && field.index("\"TIME\"") == 0
      if field_data.downcase.start_with?('14 day')
        field_data = '14 Days To Close'
      elsif field_data.downcase.start_with?('immediately')
        return
      elsif field_data.downcase.start_with?('3 weeks')
        return
      elsif field_data.downcase.start_with?('3 months')
        return
      end
      sop_article.sop_time_id = SopTime.where('lower(period) = ?', field_data.downcase).first.id
    elsif !field.index("\"Category\"").nil? && field.index("\"Category\"") == 0
      if field_data.downcase.start_with?('extenral')
        field_data = 'Communication'
      end
      sop_article.sop_category_id = SopCategory.where('lower(title) = ?', field_data.downcase).first.id
    elsif !field.index("\"Title\"").nil? && field.index("\"Title\"") == 0
      sop_article.title = field_data
    elsif !field.index("\"Responsible\"").nil? && field.index("\"Responsible\"") == 0
      sop_article.responsible = field_data
      support_field = row_elements[-1].split("<dynamic-element name=")[1..-1].select{|field| !field.index("\"Support\"").nil? && field.index("\"Support\"") == 0 }
      if !support_field.empty?
        support_field = support_field.first
        if !support_field.index('><![CDATA[').nil?
          support_field = support_field[support_field.index('><![CDATA[')+10..support_field.index(']]')-1]
        end
      else
        support_field = ''
      end
      found_title = getResponsibleTitleToQuery(field_data.downcase, support_field.downcase, sop_article, true)
      sop_article.responsible_office_id = ResponsibleOffice.find_by(title: found_title).id
    elsif !field.index("\"Support\"").nil? && field.index("\"Support\"") == 0
      sop_article.support = field_data
    elsif !field.index("\"Article\"").nil? && field.index("\"Article\"") == 0
      sop_article.content = field_data
    end
  end
  sop_article.save
  icon_title = SopIcon.where(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id).first.title
  SopIcon.create(sop_time_id: sop_article.sop_time_id, sop_category_id: sop_article.sop_category_id, sop_article_id: sop_article.id, title: icon_title)
end

sop_order_id = 0
c4d_order_id = 0
content = IO.read("file.xml")
content.split("<row>")[1..-1].each do |row|
  row_elements = row.split("<field name=")
  isSop = row_elements[3].downcase.include? 'sop'
  isC4d = row_elements[3].downcase.include? 'c4d' unless isSop
  if isSop
    sop_order_id += 1
    createSopArticle(row_elements, admin_user)
  elsif isC4d
    c4d_order_id += 1
    createC4dArticle(row_elements, admin_user)
  end
end

puts "#{sop_order_id} sop articles"
puts "#{c4d_order_id} c4d articles"

puts 'done!'
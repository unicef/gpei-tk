puts 'seeding database...'

Role.create(title: 'root')
Role.create(title: 'Administrator')
Role.create(title: 'Editor')
Role.create(title: 'Member')

ResponsibleOffice.create(title: 'Country')
ResponsibleOffice.create(title: 'EOMG')
ResponsibleOffice.create(title: 'GPEI')
ResponsibleOffice.create(title: 'Ministry of Health')
ResponsibleOffice.create(title: 'Rapid Response')
ResponsibleOffice.create(title: 'Surge Team')
ResponsibleOffice.create(title: 'UNICEF')
ResponsibleOffice.create(title: 'WHO')

SupportAffiliation.create(title: 'CDC')
SupportAffiliation.create(title: 'UNICEF')
SupportAffiliation.create(title: 'WHO')
SupportAffiliation.create(title: 'Other')

##immediately, 3 weeks, and 3 months do not have a color assigned.
# SopTime.create(period: 'Immediately', color:'#FDFDFD')
SopTime.create(period: '24 Hours', color: '#B12924')
SopTime.create(period: '72 Hours', color: '#EB5F65')
SopTime.create(period: '14 Days', color: '#F49393')
SopTime.create(period: '14 Days to Close', color: '#FBE3E6')
# SopTime.create(period: '3 Weeks', color:'#FDFDFD')
# SopTime.create(period: '3 Months', color:'#FDFDFD')

SopCategory.create(title: 'Outbreak Confirmation')
SopCategory.create(title: 'Coordination and Advocacy')
SopCategory.create(title: 'Technical and Human Resources')
SopCategory.create(title: 'Information Management')
SopCategory.create(title: 'Communication')
SopCategory.create(title: 'Finances and Logistics')
SopCategory.create(title: 'Context')

SopIcon.create(sop_time_id: 1, sop_category_id: 1, title: '24Hours_OutbreakConfir')
SopIcon.create(sop_time_id: 1, sop_category_id: 3, title: '24Hours_TechHuman')
SopIcon.create(sop_time_id: 1, sop_category_id: 4, title: '24Hours_InfoMan')
SopIcon.create(sop_time_id: 1, sop_category_id: 6, title: '24Hours_Finance')

SopIcon.create(sop_time_id: 2, sop_category_id: 1, title: '72Hours_OutbreakConfir')
SopIcon.create(sop_time_id: 2, sop_category_id: 2, title: '72Hours_AdvoCoor')
SopIcon.create(sop_time_id: 2, sop_category_id: 3, title: '72Hours_TechHuman')
SopIcon.create(sop_time_id: 2, sop_category_id: 4, title: '72Hours_InfoMan')
SopIcon.create(sop_time_id: 2, sop_category_id: 5, title: '72Hours_ExCom')
SopIcon.create(sop_time_id: 2, sop_category_id: 6, title: '72Hours_Finance')
SopIcon.create(sop_time_id: 2, sop_category_id: 7, title: '72Hours_Context')

SopIcon.create(sop_time_id: 3, sop_category_id: 2, title: '14Days_AdvoCoor')
SopIcon.create(sop_time_id: 3, sop_category_id: 3, title: '14Days_TechHuman')
SopIcon.create(sop_time_id: 3, sop_category_id: 4, title: '14Days_InfoMan')
SopIcon.create(sop_time_id: 3, sop_category_id: 5, title: '14Days_ExCom')
SopIcon.create(sop_time_id: 3, sop_category_id: 6, title: '14Days_Finance')

SopIcon.create(sop_time_id: 4, sop_category_id: 2, title: '14DaysClose_AdvoCoor')
SopIcon.create(sop_time_id: 4, sop_category_id: 3, title: '14DaysClose_TechHuman')
SopIcon.create(sop_time_id: 4, sop_category_id: 4, title: '14DaysClose_InfoMan')
SopIcon.create(sop_time_id: 4, sop_category_id: 5, title: '14DaysClose_ExCom')
SopIcon.create(sop_time_id: 4, sop_category_id: 6, title: '14DaysClose_Finance')
SopIcon.create(sop_time_id: 4, sop_category_id: 7, title: '14DaysClose_Context')

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
  row_elements[-2].split("<dynamic-element name=")[1..-1].each do |field|
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
    sop_article.order_id = row_elements[3][row_elements[3].index("\"urlTitle\">")+11..row_elements[3].index("</field>")-1].downcase.gsub!('sop_','').to_i
  else
    sop_article.cms_title = row_elements[3][row_elements[3].index("\"urlTitle\"<name />")+18..row_elements[3].index("</field>")-1].downcase
    sop_article.order_id = row_elements[3][row_elements[3].index("\"urlTitle\"<name />")+18..row_elements[3].index("</field>")-1].downcase.gsub!('sop_','').to_i
  end
  sop_article.created_at = row_elements[1][row_elements[1].index("\"createDate\">")+13..row_elements[1].index("</field>")-1]
  sop_article.updated_at = row_elements[2][row_elements[2].index("\"modifiedDate\">")+15..row_elements[2].index("</field>")-1]
  sop_article.published = true
  sop_article.author_id = admin_user.id
  row_elements[-2].split("<dynamic-element name=")[1..-1].each do |field|
    field_data = field[field.index('><![CDATA[')+10..field.index(']]')-1]
    if !field.index("\"TIME\"").nil? && field.index("\"TIME\"") == 0
      if field_data.downcase.start_with?('14 dayes')
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
      support_field = row_elements[-2].split("<dynamic-element name=")[1..-1].select{|field| !field.index("\"Support\"").nil? && field.index("\"Support\"") == 0 }
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

def videoPersistRaise(article)
  if !article.save
    raise Exception.new("SEEDING VIDEO URL ERROR")
  end
end
twentyFour_hours_id = SopTime.find_by(period: '24 Hours').id
seventyTwo_hours_id = SopTime.find_by(period: '72 Hours').id
fourteen_days_id = SopTime.find_by(period: '14 Days').id
fourteen_days_to_close_id = SopTime.find_by(period: '14 Days to Close').id

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', 'Ensure government notification'.downcase, twentyFour_hours_id).first
article.video_url = 'https://vimeo.com/138580685'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', 'Initiate Epidemiological & Social Investigation'.downcase, twentyFour_hours_id).first
article.video_url = 'https://vimeo.com/136684766'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Ensure Notification of GPEI's EOMG".downcase, twentyFour_hours_id).first
article.video_url = 'https://vimeo.com/138580748'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Assess Human Resource Capacity".downcase, twentyFour_hours_id).first
article.video_url = 'https://vimeo.com/136684824'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "EOMG Outbreak Grading".downcase, seventyTwo_hours_id).first
article.video_url = 'https://vimeo.com/136684765'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Establish Outbreak Response Cell".downcase, seventyTwo_hours_id).first
article.video_url = 'https://vimeo.com/136684870'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Establish Outbreak Task Forces".downcase, seventyTwo_hours_id).first
article.video_url = 'https://vimeo.com/138580799'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Identify Human Resource Surge Capacity".downcase, seventyTwo_hours_id).first
article.video_url = 'https://vimeo.com/136684825'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Finalize Media Protocol".downcase, seventyTwo_hours_id).first
article.video_url = 'https://vimeo.com/136684767'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Finalize C4D Community Engagement".downcase, fourteen_days_id).first
article.video_url = 'https://vimeo.com/136684823'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Facilitate Social Mobilization".downcase, fourteen_days_id).first
article.video_url = 'https://vimeo.com/138580862'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Support Partners' Communication Campaigns".downcase, fourteen_days_id).first
article.video_url = 'https://vimeo.com/138580884'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Assess Cold-Chain Capacity".downcase, fourteen_days_id).first
article.video_url = 'https://youtu.be/i0kbQkyP0P8'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Conduct SIAs".downcase, fourteen_days_to_close_id).first
article.video_url = 'https://youtu.be/i0kbQkyP0P8'
videoPersistRaise(article)

article = SopArticle.where('lower(title) = ? AND sop_time_id = ?', "Implement Strategic Communication Plan".downcase, fourteen_days_to_close_id).first
article.video_url = 'https://vimeo.com/136684822'
videoPersistRaise(article)

# delete duplicate articles #

SopArticle.where('title ILIKE ?', 'Communicate Risk Assessment Through IHR').last.destroy
SopArticle.where(content: "Finalize the six-month outbreak response plan document and make it available to all partners.").last.destroy
SopArticle.where('title ILIKE ? AND sop_time_id = 2', 'Rapid Response Phase').last.destroy
SopArticle.where('title ILIKE ?', 'Implement Strategic Communication Plan').last.destroy
# FIX ARTICLE ORDERING #

mysql_article_titles = [
                        [1, 1, "Ensure Government Notification", 1],
                        [1, 1, "Initiate Epidemiological & Social Investigation", 2],
                        [1, 1, "Ensure Notification of GPEI's EOMG", 3],
                        [1, 3, "Activate GPEI's RRT", 4],
                        [1, 4, "Conduct Analysis Of AFP Databases", 5],
                        [1, 4, "Assess Security And Access Situation", 6],
                        [1, 3, "Assess Human Resource Capacity", 7],
                        [1, 6, "Alert Supply Division", 8],
                        [2, 2, "Conference Calls With GPEI Partners", 9],
                        [2, 2, "Advocate Expedited Visas", 10],
                        [2, 2, "Write to Health Minister", 11],
                        [2, 2, "Convene Meeting Of Stakeholders", 12],
                        [2, 1, "Finalize Epidemiological & Social Investigation", 13],
                        [2, 2, "Communicate Risk Assessment Through IHR", 14],
                        [2, 2, "Communicate With Donor Community And Media", 15],
                        [2, 2, "Align to Conduct Interventions", 16],
                        [2, 3, "Deploy RRT", 17],
                        [2, 3, "Develop Initial Immunization Response", 18],
                        [2, 3, "Implement Actions Required By PHEIC", 19],
                        [2, 3, "Develop Outbreak Response Document", 20],
                        [2, 3, "Establish Outbreak Task Forces", 21],
                        [2, 3, "Initiate Enhanced Surveillance", 22],
                        [2, 3, "Conduct Additional Intervention", 23],
                        [2, 3, "Identify Human Resource Surge Capacity", 24],
                        [2, 3, "Provide Updated Materials And Guidelines", 25],
                        [2, 4, "Compile And Produce SITREP", 26],
                        [2, 4, "Complete Situational Data Analysis", 27],
                        [2, 5, "Share Polio Toolkit", 28],
                        [2, 5, "Media Landscape Analysis", 29],
                        [2, 5, "Identify Media Focal Person", 30],
                        [2, 5, "Finalize Media Protocol", 31],
                        [2, 5, "Press Brief/Media Release", 32],
                        [2, 5, "Finalize C4D Messages", 33],
                        [2, 5, "Receive And Review Media Releases", 34],
                        [2, 1, "EOMG Outbreak Grading", 35],
                        [2, 6, "Evaluate Administrative Capacity", 36],
                        [2, 6, "Allocate Lump-Sum Funding", 37],
                        [2, 6, "Order Vaccine and Initiate Transport", 38],
                        [2, 7, "Grade Outbreak", 39],
                        [2, 7, "Create On-Call Staff List", 40],
                        [2, 7, "Initiate Full Investigation", 41],
                        [2, 7, "Rapid Response Phase", 42],
                        [2, 2, "Establish Outbreak Response Cell", 43],
                        [2, 2, "Develop External Communication Guidance", 44],
                        [3, 2, "Establish Weekly Stakeholder Meeting", 45],
                        [3, 2, "Inform Goverments Outbreak Zone Countries", 46],
                        [3, 2, "Develop Funding And Plan Advocacy", 47],
                        [3, 3, "Deploy Surge Team", 48],
                        [3, 3, "Brief And Deploy Surge Staff", 49],
                        [3, 3, "Initial Immunization Response Campaigns", 50],
                        [3, 3, "Establish Campaign Monitoring", 51],
                        [3, 3, "Finalize Microplanning, Tools And Manuals", 52],
                        [3, 3, "Implement Outbreak Response Plan", 53],
                        [3, 4, "Establish Weekly SITREPs", 54],
                        [3, 4, "Liase With In-Country Data Managers", 55],
                        [3, 5, "Finalize C4D Community Engagement", 56],
                        [3, 5, "Facilitate Social Mobilization", 57],
                        [3, 5, "Develop Media Response Plan", 58],
                        [3, 5, "Work With The Media", 59],
                        [3, 5, "Support Partners' Communication Campaigns", 60],
                        [3, 5, "Ensure Availability of IEC Materials", 61],
                        [3, 5, "Begin Communication/IPC Training", 62],
                        [3, 5, "Ensure Microplanning", 63],
                        [3, 6, "Review and Release Budget", 64],
                        [3, 6, "Assess Cold-Chain Capacity", 65],
                        [3, 6, "Order For Additional Campaigns", 66],
                        [3, 6, "Review Additional Support", 67],
                        [3, 6, "Fill Vacant Positions", 68],
                        [4, 2, "Conduct Weekly Stakeholder Meeting", 69],
                        [4, 2, "Weekly Calls With GPEI Partners", 70],
                        [4, 2, "Conduct Donor Meetings And Advocacy", 71],
                        [4, 3, "Implement Outbreak Response Plan", 72],
                        [4, 3, "Conduct SIAs", 73],
                        [4, 3, "Maintain Enhanced Surveillance", 74],
                        [4, 4, "Continue Weekly SITREPs", 75],
                        [4, 4, "Ensure Data Completion And Transmission", 76],
                        [4, 5, "Implement Strategic Communication Plan", 77],
                        [4, 6, "Implement Six-Month Response Plan", 78],
                        [4, 7, "Investigate Poliovirus Event", 79],
                        [4, 7, "Surge Response Phase", 80],
                        [4, 7, "Assess Response Activities", 81],
                        [4, 7, "Update Outbreak Grade", 82]
                      ]

all_sop_articles = SopArticle.all
fz = FuzzyMatch.new(mysql_article_titles, :read => 2, :find_best => true, :find_all => true)
all_sop_articles.each do |current_article|
  match_found = false
  found_articles = fz.find(current_article.title)
  if !found_articles.empty?
    found_articles.each do |found_article|
      if found_article[0] == current_article.sop_time_id &&
         found_article[1] == current_article.sop_category_id

        current_article.update(title: found_article[2], sop_time_id: found_article[0], sop_category_id: found_article[1], order_id: found_article[3])
        match_found = true
      end
    end
  end
  if !match_found && !found_articles.empty?
    current_article.update(title: found_articles[0][2], sop_time_id: found_articles[0][0], sop_category_id: found_articles[0][1], order_id: found_articles[0][3])
  end
  match_found
end

# fix typo #
SopArticle.where('title ILIKE ? AND sop_time_id = 3', 'Inform goverments outbreak zone countries').last.update(title: 'Inform Governments Outbreak Zone Countries')

# create missing articles
article = SopArticle.create(
  sop_time_id: 3,
  sop_category_id: 3,
  title: "Implement Outbreak Response Plan",
  order_id: 53,
  content: 'Finalize the six-month outbreak response plan document and make it available to all partners.',
  responsible: 'RAPID RESPONSE TEAM AND SURGE TEAM, WITH REPURPOSED COUNTRY STAFF'.downcase,
  responsible_office_id: 5,
  published: true,
  author_id: admin_user.id
  )
icon_title = SopIcon.where(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id).first.title
SopIcon.create(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id, sop_article_id: article.id, title: icon_title)

# gpei_id = SupportAffiliation.where(title: 'GPEI').first.id
article = SopArticle.create(
  sop_time_id: 4,
  sop_category_id: 7,
  title: "Investigate Poliovirus Event",
  order_id: 79,
  content: 'Upon receiving a report of a poliovirus event, the GPEI will support the country with technical guidance to investigate, assess and monitor the event. The poliovirus event should trigger putting the surveillance system on high alert to detect any signs of poliovirus transmission. A detailed investigation of the case and community and a travel history should urgently be conducted. The community should be searched for unreported cases, with visits to health-care facilities and other health-care providers, including traditional healers. Immunization response planning should begin in case the investigation and evaluation identify that the event is actually a polio outbreak.',
  support: 'GPEI',
  responsible_office_id: 3,
  published: true,
  author_id: admin_user.id
  )
icon_title = SopIcon.where(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id).first.title
SopIcon.create(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id, sop_article_id: article.id, title: icon_title)

article = SopArticle.create(
  sop_time_id: 4,
  sop_category_id: 7,
  title: "Surge Response Phase",
  order_id: 80,
  content: 'Within three weeks of the outbreak notification, the GPEI makes available, consistent with the outbreak grade, a multidisciplinary and trained surge team and additional surge staff as needed and outlined in the outbreak response plan.',
  responsible: 'GPEI',
  responsible_office_id: 3,
  published: true,
  author_id: admin_user.id
  )
icon_title = SopIcon.where(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id).first.title
SopIcon.create(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id, sop_article_id: article.id, title: icon_title)

article = SopArticle.create(
  sop_time_id: 4,
  sop_category_id: 7,
  title: "Assess Response Activities",
  order_id: 81,
  content: "After one month of confirmation of the index case, the GPEI will assess the response activities against established criteria and adapt the outbreak response plan's subsequent phases. The assessments will subsequently be conducted at three-month intervals until six months have passed without identification of the poliovirus. After six months without identification of the poliovirus, a final external assessment will be conducted, focusing on surveillance and activities to sustain the polio-free status in order to declare the end of the outbreak.",
  responsible: 'GPEI',
  responsible_office_id: 3,
  published: true,
  author_id: admin_user.id
  )
icon_title = SopIcon.where(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id).first.title
SopIcon.create(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id, sop_article_id: article.id, title: icon_title)

article = SopArticle.create(
  sop_time_id: 4,
  sop_category_id: 7,
  title: "Update Outbreak Grade",
  order_id: 82,
  content: "The grade will be updated at least once every three months or whenever a significant change in the outbreak's evolution requires a re-evaluation of the assigned grade. Outbreaks will be declared closed if no transmission is detected for six months, with all subnational areas achieving sensitive surveillance after an external assessment following the end of the outbreak.",
  responsible: 'GPEI',
  responsible_office_id: 3,
  published: true,
  author_id: admin_user.id
  )
icon_title = SopIcon.where(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id).first.title
SopIcon.create(sop_time_id: article.sop_time_id, sop_category_id: article.sop_category_id, sop_article_id: article.id, title: icon_title)

# c4d corrections
c4d_subcat_channel = C4dSubcategory.where(title: 'Channel Analysis').first
C4dArticle.where(cms_title: 'c4d_19').first.update(c4d_subcategory_id: c4d_subcat_channel.id)

mysql_c4d_articles = [
  [ 1, 1, 'Situation Analysis', 1],
  [ 1, 1, 'Prioritize', 2],
  [ 1, 1, 'Epidemiological Risk Factors', 3],
  [ 1, 1, 'Social Analysis', 4],
  [ 1, 1, 'Writing an Effective Objective', 5],
  [ 1, 2, 'Introduction', 6],
  [ 1, 2, 'EPI and Campaign Data', 7],
  [ 1, 2, 'Case Profiles', 8],
  [ 1, 2, 'Social Data', 9],
  [ 1, 3, 'Identify High Risk Groups', 10],
  [ 2, 4, 'Introduction', 11],
  [ 2, 4, 'Audience Analysis', 12],
  [ 2, 4, 'Audience Segmentation Tool', 13],
  [ 2, 5, 'Introduction', 14],
  [ 2, 5, 'Barrier Analysis', 15],
  [ 2, 5, 'Situational vs Attitudinal Barriers', 16],
  [ 2, 6, 'Introduction', 17],
  [ 2, 6, 'Message Themes', 18],
  [ 2, 7, 'Media Selection', 19],
  [ 2, 8, 'Introduction', 20],
  [ 2, 8, 'Outbreak', 21],
  [ 2, 8, 'Enduring Outbreak', 22],
  [ 2, 8, 'Maintenance', 23],
  [ 3, 9, 'Introduction', 24],
  [ 3, 9, 'The Global Brand', 25],
  [ 3, 9, 'Guiding Principles', 26],
  [ 3, 9, 'The Journey to Vaccination', 27],
  [ 3, 10, 'Introduction', 28],
  [ 3, 10, 'Social Mobilization', 29],
  [ 3, 10, 'Mass (Paid) Media', 30],
  [ 3, 10, 'Owned Media', 31],
  [ 3, 10, 'Earned Media', 32],
  [ 3, 10, 'Advocacy Media', 33],
  [ 3, 10, 'Multi-Media and SMS', 34],
  [ 3, 11, 'Introduction', 35],
  [ 3, 11, 'Monitor', 36],
  [ 3, 11, 'Test', 37],
  [ 3, 11, 'Evaluate', 38],
  [ 4, 12, 'Global Commmunications Guide', 39],
  [ 4, 12, 'Global Strategy Templates', 40],
  [ 4, 12, 'Country Samples', 41],
  [ 4, 13, 'Social Mobilization Curriculum', 42],
  [ 4, 13, 'Vaccinator Training Kit', 43],
  [ 4, 13, 'IEC Samples', 44],
  [ 4, 14, 'Sample ToRs', 45],
  [ 4, 14, 'Sample Job Descriptions', 46],
  [ 4, 14, 'LTAs for C4D Support', 47],
  [ 4, 15, 'Rapid Pro', 48],
  [ 4, 15, 'Data', 49],
  [ 4, 15, 'Design', 50],
  [ 4, 15, 'mHealth', 51],
  ]

all_c4d_articles = C4dArticle.all
fz = FuzzyMatch.new(mysql_c4d_articles, :read => 2, :find_best => true, :find_all => true)
all_c4d_articles.each do |current_article|
  match_found = false
  found_articles = fz.find(current_article.title)
  if !found_articles.empty?
    found_articles.each do |found_article|
      if found_article[0] == current_article.c4d_category_id &&
         found_article[1] == current_article.c4d_subcategory_id

        current_article.update(title: found_article[2], c4d_category_id: found_article[0], c4d_subcategory_id: found_article[1], order_id: found_article[3])
        match_found = true
      end
    end
  end
  if !match_found && !found_articles.empty?
    current_article.update(title: found_articles[0][2], c4d_category_id: found_articles[0][0], c4d_subcategory_id: found_articles[0][1], order_id: found_articles[0][3])
  end
  match_found
end

#c4d delete duplicates #
C4dArticle.where(title: 'The Global Brand', c4d_category_id: 3, c4d_subcategory_id: 9, cms_title: 'c4d_54').last.destroy
C4dArticle.where(title: 'Social Mobilization', c4d_category_id: 3, c4d_subcategory_id: 10, cms_title: 'c4d_53').last.destroy
C4dArticle.where(title: 'Multi-Media and SMS', c4d_category_id: 3, c4d_subcategory_id: 10, cms_title: 'c4d_50').last.destroy
C4dArticle.where(title: 'Social Mobilization Curriculum', c4d_category_id: 4, c4d_subcategory_id: 13, cms_title: 'c4d_42').last.destroy
C4dArticle.where(title: 'Social Mobilization Curriculum', c4d_category_id: 4, c4d_subcategory_id: 13, cms_title: 'c4d_43').last.destroy
C4dArticle.where(title: 'LTAs for C4D Support', c4d_category_id: 4, c4d_subcategory_id: 14, cms_title: 'c4d_52').last.destroy
C4dArticle.where(title: 'Enduring Outbreak', c4d_category_id: 2, c4d_subcategory_id: 8, cms_title: 'c4d_44').last.destroy
C4dArticle.where(title: 'Global Strategy Templates', cms_title: 'c4d_-1', c4d_subcategory_id: 12, c4d_category_id: 4).last.destroy
C4dArticle.where(cms_title: 'c4d_53-design', title: 'Design', c4d_category_id: 4, c4d_subcategory_id: 15).last.destroy
#c4d create missing article #
C4dArticle.create(
  cms_title: "c4d_#{}",
  title: 'IEC Samples',
  content: '',
  c4d_category_id: 4,
  c4d_subcategory_id: 13,
  order_id: 44,
  published: true,
  author_id: admin_user.id
  )

puts 'done!'
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
# SopTime.create(period: 'Immediately', color:'#680909')
SopTime.create(period: '24 Hours', color: '#8D3733')
SopTime.create(period: '72 Hours', color: '#C24A3E')
SopTime.create(period: '14 Days', color: '#EA7767')
SopTime.create(period: '14 Days to Close', color: '#EA9B91')
# SopTime.create(period: '3 Weeks', color:'#FDFDFD')
# SopTime.create(period: '3 Months', color:'#F2BCB6')

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

C4dCategory.create(title: 'Understand', color:'#9BB234', description: "At the end of this section, you will understand the problem and the highest risk groups and their perception of vaccination, you will understand how to use research to refine the objectives and the role communication can play.")
C4dCategory.create(title: 'Plan', color:'#4263C2', description: "At the end of this section, you will have defined the target audience, barriers to change, developed messaging and channels to reach the target. You will have used and understood the Comms Planning Tool.")
C4dCategory.create(title: 'Act', color:'#2C9674', description: "At the end of this section, you will understand and will be able go to apply the global strategy, including integrated communication tactics, their strengths and weaknesses, plus how to evaluate and monitor your own strategy's success.")
C4dCategory.create(title: 'Tools', color:'#35A3AE', description: "At the end of this section, you will have access to practical tools and how to use them, including in Innovations and innovations research. dashboard and other Management Tools.")

C4dSubcategory.create(title: 'Behavioural Goal', c4d_category_id: 1, color: '#5F7B05')
C4dSubcategory.create(title: 'Using Evidence', c4d_category_id: 1, color: '#8DA900')
C4dSubcategory.create(title: 'ID High Risk Groups', c4d_category_id: 1, color: '#A4BC4B')
C4dSubcategory.create(title: 'Segmentation', c4d_category_id: 2, color: '#12296C')
C4dSubcategory.create(title: 'Barriers', c4d_category_id: 2, color: '#1931AD')
C4dSubcategory.create(title: 'Messaging', c4d_category_id: 2, color: '#2E76DB')
C4dSubcategory.create(title: 'Channel Analysis', c4d_category_id: 2, color: '#62B1F0')
C4dSubcategory.create(title: 'ID Your Scenario', c4d_category_id: 2, color: '#8EBFF0')
C4dSubcategory.create(title: 'The Global Strategy', c4d_category_id: 3, color: '#0D573A')
C4dSubcategory.create(title: 'Integrated Action', c4d_category_id: 3, color: '#148A53')
# C4dSubcategory.create(title: 'Capacity Building', c4d_category_id: 3, color: '#5F7B05')
C4dSubcategory.create(title: 'Monitor Evaluate', c4d_category_id: 3, color: '#82C382')
C4dSubcategory.create(title: 'Mass Media IEC', c4d_category_id: 4, color: '#206682')
C4dSubcategory.create(title: 'Training', c4d_category_id: 4, color: '#1F9EA5')
C4dSubcategory.create(title: 'Management Tools', c4d_category_id: 4, color: '#2FBFBF')
C4dSubcategory.create(title: 'Innovations', c4d_category_id: 4, color: '#76C7C7')

user = User.new(
  first_name: 'root',
  last_name: 'admin',
  country: 'us',
  email: 'root@example.com',
  TOS_accepted: true)
user.password = 'foobar'
user.role = Role.find_by(title: 'root')
user.organization = 'UNICEF'
user.save

user = User.new(
  first_name: 'core',
  last_name: 'admin',
  country: 'us',
  email: 'admin@example.com',
  TOS_accepted: true)
user.password = 'password'
user.role = Role.find_by(title: 'Administrator')
user.organization = 'UNICEF'
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

#create languages
["English",
 "French",
 "Urdu",
 "Pashto",
 "Global",
 "Akan",
 "Amharic",
 "Arabic",
 "Assamese",
 "Awadhi",
 "Azerbaijani",
 "Balochi",
 "Belarusian",
 "Bengali",
 "Bhojpuri",
 "Burmese",
 "Cebuano",
 "Chewa",
 "Chhattisgarhi",
 "Chittagonian",
 "Czech",
 "Deccan",
 "Dhundhari",
 "Dutch",
 "Eastern Min",
 "Fula",
 "Gan Chinese",
 "German",
 "Greek",
 "Gujarati",
 "Haitian Creole",
 "Hakka",
 "Haryanvi",
 "Hausa",
 "Hiligaynon/Ilonggo",
 "Hindi",
 "Hmong",
 "Hungarian",
 "Igbo",
 "Ilocano",
 "Italian",
 "Japanese",
 "Javanese",
 "Jin",
 "Kannada",
 "Kazakh",
 "Khmer",
 "Kinyarwanda",
 "Kirundi",
 "Konkani",
 "Korean",
 "Kurdish",
 "Madurese",
 "Magahi",
 "Maithili",
 "Malagasy",
 "Malay",
 "Malayalam",
 "Mandarin",
 "Marathi",
 "Marwari",
 "Mossi",
 "Nepali",
 "Northern Min",
 "Odia",
 "Oromo",
 "Persian",
 "Polish",
 "Portuguese",
 "Punjabi",
 "Quechua",
 "Romanian",
 "Russian",
 "Saraiki",
 "Serbo-Croatian",
 "Shona",
 "Sindhi",
 "Sinhalese",
 "Somali",
 "Southern Min",
 "Spanish",
 "Sundanese",
 "Swedish",
 "Sylheti",
 "Tagalog",
 "Tamil",
 "Telugu",
 "Thai",
 "Turkish",
 "Turkmen",
 "Ukrainian",
 "Uyghur",
 "Uzbek",
 "Vietnamese",
 "Wu",
 "Xhosa",
 "Xiang",
 "Yoruba",
 "Yue",
 "Zhuang",
 "Zulu"].each { |language| Language.create(title: language) }

["Global",
"Africa",
"India",
"Nigeria",
"Somalia",
"Kenya",
"Pakistan",
"Ukraine",
"Jordan",
"Afghanistan",
"Nigeria",
"Lebanon",
"United States of America",
"Yemen",
"Bunia",
"Equatorial Guinea",
"Uganda",
"Liberia",
"Ethiopia",
"Bangladesh",
"China",
"Indonesia",
"Brazil",
"Russia",
"Mexico",
"Japan",
"Philippines",
"Vietnam",
"Egypt",
"Germany",
"Iran",
"Democratic Republic of the Congo",
"Turkey",
"Thailand",
"United Kingdom",
"France",
"Italy",
"Tanzania",
"South Africa",
"Myanmar",
"South Korea",
"Colombia",
"Spain",
"Argentina",
"Sudan",
"Algeria",
"Poland",
"Iraq",
"Canada",
"Morocco",
"Saudi Arabia",
"Peru Americas",
"Venezuela",
"Malaysia",
"Uzbekistan",
"Nepal",
"Mozambique",
"Ghana",
"Angola",
"North Korea",
"Madagascar",
"Australia",
"Cameroon",
"Taiwan",
"Côte d'Ivoire",
"Sri Lanka",
"Niger",
"Romania",
"Burkina Faso",
"Syrian Arab Republic",
"Mali",
"Chile",
"Kazakhstan",
"Malawi",
"Netherlands",
"Zambia",
"Guatemala",
"Ecuador",
"Zimbabwe",
"Cambodia",
"Senegal",
"Chad",
"Guinea",
"South Sudan",
"Rwanda",
"Burundi",
"Cuba",
"Tunisia",
"Belgium",
"Benin",
"Greece",
"Bolivia",
"Haiti",
"Dominican Republic",
"Czech Republic",
"Portugal",
"Azerbaijan",
"Sweden",
"Hungary",
"Belarus",
"United Arab Emirates",
"Serbia",
"Tajikistan",
"Austria",
"Switzerland",
"Israel",
"Honduras",
"Papua New Guinea",
"Togo",
"Hong Kong",
"Bulgaria",
"Laos",
"Paraguay",
"Sierra Leone",
"Libya",
"Nicaragua",
"El Salvador",
"Kyrgyzstan",
"Singapore",
"Denmark",
"Finland",
"Turkmenistan",
"Slovakia",
"Eritrea",
"Norway",
"Central African Republic",
"Costa Rica",
"Palestine",
"Congo",
"Ireland",
"Oman",
"New Zealand",
"Croatia",
"Mauritania",
"Moldova",
"Kuwait",
"Panama",
"Georgia",
"Bosnia and Herzegovina",
"Puerto Rico",
"Uruguay",
"Armenia",
"Mongolia",
"Albania",
"Lithuania",
"Jamaica",
"Namibia",
"Botswana",
"Qatar",
"Lesotho",
"Republic of Macedonia",
"Slovenia",
"Gambia",
"Latvia",
"Guinea-Bissau",
"Gabon",
"Bahrain",
"Trinidad and Tobago",
"Estonia",
"Swaziland",
"Mauritius",
"Timor-Leste",
"Cyprus",
"Djibouti",
"Fiji",
"Réunion",
"Comoros",
"Bhutan",
"Guyana",
"Montenegro",
"Macau",
"Solomon Islands",
"Western Sahara",
"Luxembourg",
"Suriname",
"Cabo Verde",
"Guadeloupe",
"Brunei",
"Malta",
"Martinique",
"Bahamas",
"Maldives",
"Belize",
"Iceland",
"French Polynesia",
"Barbados",
"French Guiana",
"Vanuatu",
"New Caledonia",
"Mayotte",
"Samoa",
"Sao Tome and Principe",
"Saint Lucia",
"Guam",
"Guernsey and Jersey",
"Curaçao",
"Kiribati",
"Saint Vincent and the Grenadines",
"Grenada",
"Tonga",
"United States Virgin Islands",
"Federated States of Micronesia",
"Aruba",
"Seychelles",
"Antigua and Barbuda",
"Isle of Man",
"Dominica",
"Andorra",
"Bermuda",
"Cayman Islands",
"Greenland",
"Saint Kitts and Nevis",
"American Samoa",
"Northern Mariana Islands",
"Marshall Islands",
"Faroe Islands",
"Sint Maarten",
"Monaco",
"Liechtenstein",
"Turks and Caicos Islands",
"Gibraltar",
"San Marino",
"British Virgin Islands",
"Caribbean Netherlands",
"Palau",
"Cook Islands",
"Anguilla",
"Wallis and Futuna",
"Nauru",
"Tuvalu",
"Saint Pierre and Miquelon",
"Montserrat",
"Saint Helena, Ascension and Tristan da Cunha",
"Falkland Islands",
"Niue",
"Tokelau",
"Vatican City"].each { |country| Place.create(title: country) }

puts 'done!'
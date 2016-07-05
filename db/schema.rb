# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160608142244) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "c4d_article_c4d_reference_links", force: :cascade do |t|
    t.integer  "c4d_reference_link_id"
    t.integer  "c4d_article_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "c4d_article_c4d_template_links", force: :cascade do |t|
    t.integer  "c4d_template_link_id"
    t.integer  "c4d_article_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "c4d_articles", force: :cascade do |t|
    t.string   "cms_title",                          null: false
    t.string   "title",                              null: false
    t.string   "content",                            null: false
    t.integer  "c4d_category_id",                    null: false
    t.integer  "c4d_subcategory_id",                 null: false
    t.string   "video_url"
    t.integer  "order_id",                           null: false
    t.boolean  "published",          default: false, null: false
    t.integer  "author_id",                          null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "c4d_categories", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "color",       null: false
    t.string   "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "c4d_reference_links", force: :cascade do |t|
    t.integer  "file_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "c4d_subcategories", force: :cascade do |t|
    t.string   "title",           null: false
    t.string   "color",           null: false
    t.integer  "c4d_category_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "c4d_template_links", force: :cascade do |t|
    t.integer  "file_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "c4d_toolkit_c4d_articles", force: :cascade do |t|
    t.integer  "c4d_article_id"
    t.integer  "c4d_toolkit_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "c4d_toolkits", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "responsible_offices", force: :cascade do |t|
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_article_sop_reference_links", force: :cascade do |t|
    t.integer  "sop_reference_link_id"
    t.integer  "sop_article_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "sop_article_sop_template_links", force: :cascade do |t|
    t.integer  "sop_template_link_id"
    t.integer  "sop_article_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "sop_articles", force: :cascade do |t|
    t.string   "cms_title",                              null: false
    t.string   "content",                                null: false
    t.string   "title",                                  null: false
    t.integer  "sop_category_id",                        null: false
    t.integer  "sop_time_id",                            null: false
    t.string   "video_url"
    t.string   "support"
    t.string   "responsible"
    t.integer  "support_affiliation_id"
    t.integer  "responsible_office_id"
    t.integer  "order_id",                               null: false
    t.boolean  "published",              default: false, null: false
    t.integer  "author_id",                              null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
  end

  create_table "sop_categories", force: :cascade do |t|
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_checklist_sop_articles", force: :cascade do |t|
    t.integer  "sop_article_id"
    t.integer  "sop_checklist_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "sop_checklists", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_icons", force: :cascade do |t|
    t.integer  "sop_time_id"
    t.integer  "sop_category_id"
    t.integer  "sop_article_id"
    t.string   "title"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "sop_reference_links", force: :cascade do |t|
    t.integer  "file_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_template_links", force: :cascade do |t|
    t.integer  "file_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_times", force: :cascade do |t|
    t.string   "period"
    t.string   "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "support_affiliations", force: :cascade do |t|
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                            null: false
    t.string   "last_name",                             null: false
    t.string   "email",                                 null: false
    t.string   "password_digest"
    t.string   "country",                               null: false
    t.string   "organization",                          null: false
    t.integer  "role_id",                               null: false
    t.integer  "responsible_office_id",                 null: false
    t.boolean  "TOS_accepted",          default: false, null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

end

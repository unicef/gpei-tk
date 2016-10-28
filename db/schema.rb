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

ActiveRecord::Schema.define(version: 20161028173843) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "c4d_articles", force: :cascade do |t|
    t.string   "cms_title"
    t.string   "title",                                null: false
    t.string   "content",                              null: false
    t.integer  "c4d_category_id",                      null: false
    t.integer  "c4d_subcategory_id",                   null: false
    t.string   "video_url"
    t.integer  "order_id",                             null: false
    t.boolean  "published",            default: false, null: false
    t.integer  "author_id",                            null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "reference_link_order"
  end

  add_index "c4d_articles", ["order_id"], name: "index_c4d_articles_on_order_id", using: :btree

  create_table "c4d_categories", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "color",       null: false
    t.string   "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "c4d_subcategories", force: :cascade do |t|
    t.string   "title",           null: false
    t.string   "color",           null: false
    t.integer  "c4d_category_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
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

  create_table "embedded_images", force: :cascade do |t|
    t.string   "absolute_url",       null: false
    t.integer  "c4d_article_id",     null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "forgot_passwords", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.string   "user_key",                   null: false
    t.boolean  "expired",    default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "reference_link_articles", force: :cascade do |t|
    t.integer  "reference_link_id"
    t.integer  "reference_linkable_id"
    t.string   "reference_linkable_type"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "reference_links", force: :cascade do |t|
    t.string   "absolute_url",          null: false
    t.string   "language",              null: false
    t.integer  "author_id",             null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "document_file_name"
    t.string   "document_content_type"
    t.integer  "document_file_size"
    t.datetime "document_updated_at"
    t.string   "description"
    t.string   "title"
  end

  create_table "reference_mp3_articles", force: :cascade do |t|
    t.integer  "reference_mp3_id"
    t.integer  "reference_mp3able_id"
    t.string   "reference_mp3able_type"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "reference_mp3s", force: :cascade do |t|
    t.string   "url",               null: false
    t.string   "language",          null: false
    t.integer  "author_id",         null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "clip_file_name"
    t.string   "clip_content_type"
    t.integer  "clip_file_size"
    t.datetime "clip_updated_at"
  end

  create_table "reference_pptx_articles", force: :cascade do |t|
    t.integer  "reference_pptx_id"
    t.integer  "reference_pptxable_id"
    t.string   "reference_pptxable_type"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "reference_pptxes", force: :cascade do |t|
    t.string   "url",                   null: false
    t.string   "language",              null: false
    t.integer  "author_id",             null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "document_file_name"
    t.string   "document_content_type"
    t.integer  "document_file_size"
    t.datetime "document_updated_at"
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

  create_table "sop_articles", force: :cascade do |t|
    t.string   "cms_title"
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
    t.string   "reference_link_order"
  end

  add_index "sop_articles", ["order_id"], name: "index_sop_articles_on_order_id", using: :btree

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
    t.string   "first_name",                      null: false
    t.string   "last_name",                       null: false
    t.string   "email",                           null: false
    t.string   "password_digest"
    t.string   "country",                         null: false
    t.string   "organization",                    null: false
    t.integer  "role_id",                         null: false
    t.boolean  "is_deleted",      default: false, null: false
    t.boolean  "TOS_accepted",    default: false, null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

end

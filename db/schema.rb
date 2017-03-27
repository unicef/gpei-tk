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

ActiveRecord::Schema.define(version: 20170324152655) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "article_likes", force: :cascade do |t|
    t.integer  "like_id"
    t.integer  "article_likeable_id"
    t.string   "article_likeable_type"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "c4d_articles", force: :cascade do |t|
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
    t.string   "reference_mp3_order"
    t.string   "reference_pptx_order"
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

  create_table "downloads", force: :cascade do |t|
    t.integer  "author_id",  null: false
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

  create_table "featured_references", force: :cascade do |t|
    t.integer  "reference_link_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.string   "content",    null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "forgot_passwords", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.string   "user_key",                   null: false
    t.boolean  "expired",    default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "how_to_instructions", force: :cascade do |t|
    t.string   "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "language_references", force: :cascade do |t|
    t.integer  "language_id"
    t.integer  "reference_languageable_id"
    t.string   "reference_languageable_type"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "languages", force: :cascade do |t|
    t.text     "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.string   "content",    null: false
    t.integer  "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "place_references", force: :cascade do |t|
    t.integer  "place_id"
    t.integer  "reference_placeable_id"
    t.string   "reference_placeable_type"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "places", force: :cascade do |t|
    t.text     "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reference_downloads", force: :cascade do |t|
    t.integer  "download_id"
    t.integer  "reference_downloadable_id"
    t.string   "reference_downloadable_type"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "reference_likes", force: :cascade do |t|
    t.integer  "like_id"
    t.integer  "reference_likeable_id"
    t.string   "reference_likeable_type"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
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
    t.string   "document_language"
    t.string   "countries"
    t.integer  "download_count"
    t.integer  "like_count"
  end

  create_table "reference_mp3_articles", force: :cascade do |t|
    t.integer  "reference_mp3_id"
    t.integer  "reference_mp3able_id"
    t.string   "reference_mp3able_type"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "reference_mp3s", force: :cascade do |t|
    t.string   "language",          null: false
    t.integer  "author_id",         null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "clip_file_name"
    t.string   "clip_content_type"
    t.integer  "clip_file_size"
    t.datetime "clip_updated_at"
    t.string   "absolute_url"
    t.string   "title"
    t.string   "description"
    t.string   "document_language"
    t.string   "places"
  end

  create_table "reference_pptx_articles", force: :cascade do |t|
    t.integer  "reference_pptx_id"
    t.integer  "reference_pptxable_id"
    t.string   "reference_pptxable_type"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "reference_pptxes", force: :cascade do |t|
    t.string   "language",              null: false
    t.integer  "author_id",             null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "document_file_name"
    t.string   "document_content_type"
    t.integer  "document_file_size"
    t.datetime "document_updated_at"
    t.string   "absolute_url"
    t.string   "title"
    t.string   "description"
    t.string   "document_language"
    t.string   "places"
  end

  create_table "related_references", force: :cascade do |t|
    t.integer  "reference_link_id"
    t.integer  "related_referenceable_id"
    t.string   "related_referenceable_type"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
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
    t.string   "reference_mp3_order"
    t.string   "reference_pptx_order"
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

  create_table "tag_references", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "reference_tagable_id"
    t.string   "reference_tagable_type"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "tags", force: :cascade do |t|
    t.text     "title"
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

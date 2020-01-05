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

ActiveRecord::Schema.define(version: 2020_01_03_205301) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "fuzzystrmatch"
  enable_extension "plpgsql"

  create_table "article_likes", id: :serial, force: :cascade do |t|
    t.integer "like_id"
    t.integer "article_likeable_id"
    t.string "article_likeable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "c4d_articles", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.string "content", null: false
    t.integer "c4d_category_id", null: false
    t.integer "c4d_subcategory_id", null: false
    t.string "video_url"
    t.integer "order_id", null: false
    t.boolean "published", default: false, null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reference_link_order"
    t.string "reference_mp3_order"
    t.string "reference_pptx_order"
    t.index ["order_id"], name: "index_c4d_articles_on_order_id"
  end

  create_table "c4d_categories", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.string "color", null: false
    t.string "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "c4d_subcategories", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.string "color", null: false
    t.integer "c4d_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "c4d_toolkit_c4d_articles", id: :serial, force: :cascade do |t|
    t.integer "c4d_article_id"
    t.integer "c4d_toolkit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "c4d_toolkits", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "downloads", id: :serial, force: :cascade do |t|
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "embedded_images", id: :serial, force: :cascade do |t|
    t.string "absolute_url", null: false
    t.integer "c4d_article_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "featured_references", id: :serial, force: :cascade do |t|
    t.integer "reference_link_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feedbacks", id: :serial, force: :cascade do |t|
    t.string "content", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "file_types", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "forgot_passwords", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "user_key", null: false
    t.boolean "expired", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "how_to_instructions", id: :serial, force: :cascade do |t|
    t.string "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "language_references", id: :serial, force: :cascade do |t|
    t.integer "language_id"
    t.integer "reference_languageable_id"
    t.string "reference_languageable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "languages", id: :serial, force: :cascade do |t|
    t.text "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "likes", id: :serial, force: :cascade do |t|
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", id: :serial, force: :cascade do |t|
    t.string "content", null: false
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pg_search_documents", id: :serial, force: :cascade do |t|
    t.text "content"
    t.integer "searchable_id"
    t.string "searchable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "place_references", id: :serial, force: :cascade do |t|
    t.integer "place_id"
    t.integer "reference_placeable_id"
    t.string "reference_placeable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "places", id: :serial, force: :cascade do |t|
    t.text "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reference_downloads", id: :serial, force: :cascade do |t|
    t.integer "download_id"
    t.integer "reference_downloadable_id"
    t.string "reference_downloadable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reference_likes", id: :serial, force: :cascade do |t|
    t.integer "like_id"
    t.integer "reference_likeable_id"
    t.string "reference_likeable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reference_link_articles", id: :serial, force: :cascade do |t|
    t.integer "reference_link_id"
    t.integer "reference_linkable_id"
    t.string "reference_linkable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reference_links", id: :serial, force: :cascade do |t|
    t.string "absolute_url"
    t.string "language", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "document_file_name"
    t.string "document_content_type"
    t.integer "document_file_size"
    t.datetime "document_updated_at"
    t.string "description"
    t.string "title"
    t.string "document_language"
    t.integer "download_count"
    t.integer "like_count"
    t.string "video_url"
    t.boolean "is_video"
    t.string "publication_year", default: ""
    t.boolean "is_archived", default: false
    t.boolean "is_featured", default: false
    t.integer "file_type_id"
  end

  create_table "reference_mp3_articles", id: :serial, force: :cascade do |t|
    t.integer "reference_mp3_id"
    t.integer "reference_mp3able_id"
    t.string "reference_mp3able_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reference_mp3s", id: :serial, force: :cascade do |t|
    t.string "language", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "clip_file_name"
    t.string "clip_content_type"
    t.integer "clip_file_size"
    t.datetime "clip_updated_at"
    t.string "absolute_url"
    t.string "title"
    t.string "description"
    t.string "document_language"
    t.string "places"
  end

  create_table "reference_pptx_articles", id: :serial, force: :cascade do |t|
    t.integer "reference_pptx_id"
    t.integer "reference_pptxable_id"
    t.string "reference_pptxable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reference_pptxes", id: :serial, force: :cascade do |t|
    t.string "language", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "document_file_name"
    t.string "document_content_type"
    t.integer "document_file_size"
    t.datetime "document_updated_at"
    t.string "absolute_url"
    t.string "title"
    t.string "description"
    t.string "document_language"
    t.string "places"
  end

  create_table "related_references", id: :serial, force: :cascade do |t|
    t.integer "reference_link_id"
    t.integer "related_referenceable_id"
    t.string "related_referenceable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "responsible_offices", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_articles", id: :serial, force: :cascade do |t|
    t.string "content", null: false
    t.string "title", null: false
    t.integer "sop_category_id", null: false
    t.integer "sop_time_id", null: false
    t.string "video_url"
    t.string "support"
    t.string "responsible"
    t.integer "support_affiliation_id"
    t.integer "responsible_office_id"
    t.integer "order_id", null: false
    t.boolean "published", default: false, null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reference_link_order"
    t.string "reference_mp3_order"
    t.string "reference_pptx_order"
    t.index ["order_id"], name: "index_sop_articles_on_order_id"
  end

  create_table "sop_categories", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_checklist_sop_articles", id: :serial, force: :cascade do |t|
    t.integer "sop_article_id"
    t.integer "sop_checklist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_checklists", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_icons", id: :serial, force: :cascade do |t|
    t.integer "sop_time_id"
    t.integer "sop_category_id"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sop_times", id: :serial, force: :cascade do |t|
    t.string "period"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "support_affiliations", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tag_references", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.integer "reference_tagable_id"
    t.string "reference_tagable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.text "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest"
    t.string "country", null: false
    t.string "organization", null: false
    t.integer "role_id", null: false
    t.boolean "is_deleted", default: false, null: false
    t.boolean "TOS_accepted", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

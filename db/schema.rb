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

  create_table "C4D_articles", force: :cascade do |t|
    t.string   "CMS_title"
    t.string   "description"
    t.string   "title"
    t.integer  "C4D_category_id"
    t.integer  "C4D_subcategory_id"
    t.string   "version"
    t.string   "status"
    t.string   "owner_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "C4D_categories", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "C4D_checklist", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "C4D_subcategories", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "SOP_articles", force: :cascade do |t|
    t.string   "CMS_title"
    t.string   "article"
    t.string   "title"
    t.integer  "SOP_category_id"
    t.integer  "SOP_time_id"
    t.string   "version"
    t.string   "status"
    t.integer  "owner_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "SOP_categories", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "SOP_checklist", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "SOP_times", force: :cascade do |t|
    t.string   "period"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "offices", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "type"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "screenname"
    t.string   "password_digest"
    t.string   "organization"
    t.string   "team"
    t.string   "company"
    t.boolean  "TOS_accepted"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end

# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20081203140407) do

  create_table "assets", :force => true do |t|
    t.string   "caption"
    t.string   "title"
    t.string   "asset_file_name"
    t.string   "asset_content_type"
    t.integer  "asset_file_size"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "upload_token"
    t.integer  "site_id"
    t.boolean  "furniture"
    t.string   "copyright"
  end

  create_table "calendars", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.string   "category"
    t.string   "slug"
    t.integer  "created_by"
    t.integer  "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "lock_version"
    t.integer  "site_id"
  end

  create_table "config", :force => true do |t|
    t.string "key",   :limit => 40, :default => "", :null => false
    t.string "value",               :default => ""
  end

  add_index "config", ["key"], :name => "key", :unique => true

  create_table "downloads", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.string   "document_file_name"
    t.string   "document_content_type"
    t.integer  "document_file_size"
    t.datetime "document_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "lock_version"
    t.integer  "site_id"
  end

  create_table "downloads_groups", :id => false, :force => true do |t|
    t.integer "download_id"
    t.integer "group_id"
  end

  create_table "events", :force => true do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "title"
    t.text     "description"
    t.string   "location"
    t.integer  "calendar_id"
    t.string   "url"
    t.integer  "site_id"
    t.integer  "status_id",   :default => 1, :null => false
  end

  create_table "extension_meta", :force => true do |t|
    t.string  "name"
    t.integer "schema_version", :default => 0
    t.boolean "enabled",        :default => true
  end

  create_table "forums", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "site_id"
    t.integer  "topics_count",  :default => 0
    t.integer  "posts_count",   :default => 0
    t.integer  "position"
    t.integer  "lock_version",  :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "reader_id"
    t.boolean  "for_comments"
    t.integer  "old_id"
    t.integer  "group_id"
  end

  add_index "forums", ["site_id"], :name => "index_forums_on_site_id"

  create_table "groups", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.text     "notes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "homepage_id"
    t.integer  "site_id"
    t.integer  "lock_version"
  end

  create_table "icals", :force => true do |t|
    t.integer  "calendar_id"
    t.string   "url"
    t.integer  "last_refresh_count"
    t.datetime "last_refresh_date"
    t.string   "username"
    t.string   "password"
    t.boolean  "use_https"
    t.integer  "refresh_interval"
    t.integer  "site_id"
  end

  create_table "layouts", :force => true do |t|
    t.string   "name",              :limit => 100
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.string   "content_type",      :limit => 40
    t.integer  "lock_version",                     :default => 0
    t.string   "default_filter_id", :limit => 25
    t.integer  "site_id"
  end

  create_table "memberships", :force => true do |t|
    t.integer "group_id"
    t.integer "reader_id"
  end

  create_table "message_readers", :force => true do |t|
    t.integer  "site_id"
    t.integer  "message_id"
    t.integer  "reader_id"
    t.datetime "sent_at"
  end

  create_table "messages", :force => true do |t|
    t.integer  "site_id"
    t.string   "subject"
    t.text     "body"
    t.text     "filter_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "lock_version"
    t.string   "function_id"
    t.integer  "status_id",     :default => 1
    t.integer  "group_id"
  end

  create_table "page_attachments", :force => true do |t|
    t.integer "asset_id"
    t.integer "page_id"
    t.integer "position"
  end

  create_table "page_parts", :force => true do |t|
    t.string  "name",      :limit => 100
    t.string  "filter_id", :limit => 25
    t.text    "content"
    t.integer "page_id"
  end

  add_index "page_parts", ["page_id", "name"], :name => "parts_by_page"

  create_table "pages", :force => true do |t|
    t.string   "title"
    t.string   "slug",            :limit => 100
    t.string   "breadcrumb",      :limit => 160
    t.string   "class_name",      :limit => 25
    t.integer  "status_id",                      :default => 1,     :null => false
    t.integer  "parent_id"
    t.integer  "layout_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "published_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.boolean  "virtual",                        :default => false, :null => false
    t.integer  "lock_version",                   :default => 0
    t.string   "description"
    t.string   "keywords"
    t.boolean  "commentable",                    :default => true
    t.boolean  "comments_closed",                :default => false
    t.boolean  "searchable",                     :default => true
    t.boolean  "delta",                          :default => false
    t.integer  "position"
  end

  add_index "pages", ["class_name"], :name => "pages_class_name"
  add_index "pages", ["parent_id"], :name => "pages_parent_id"
  add_index "pages", ["searchable"], :name => "index_pages_on_searchable"
  add_index "pages", ["slug", "parent_id"], :name => "pages_child_slug"
  add_index "pages", ["virtual", "status_id"], :name => "pages_published"

  create_table "permissions", :force => true do |t|
    t.integer "group_id"
    t.integer "page_id"
  end

  create_table "post_attachments", :force => true do |t|
    t.integer  "post_id"
    t.integer  "reader_id"
    t.integer  "position"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", :force => true do |t|
    t.integer  "reader_id"
    t.integer  "topic_id"
    t.integer  "forum_id"
    t.integer  "site_id"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "old_id"
    t.integer  "group_id"
  end

  add_index "posts", ["forum_id", "created_at"], :name => "index_posts_on_forum_id"
  add_index "posts", ["reader_id", "created_at"], :name => "index_posts_on_reader_id"
  add_index "posts", ["site_id"], :name => "index_posts_on_site_id"

  create_table "readers", :force => true do |t|
    t.integer  "site_id"
    t.string   "name",                    :limit => 100
    t.string   "email"
    t.string   "login",                   :limit => 40,  :default => "",    :null => false
    t.string   "crypted_password"
    t.text     "description"
    t.text     "notes"
    t.boolean  "trusted",                                :default => true
    t.boolean  "receive_email",                          :default => false
    t.boolean  "receive_essential_email",                :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.string   "password_salt"
    t.string   "session_token"
    t.string   "provisional_password"
    t.datetime "activated_at"
    t.string   "honorific"
    t.integer  "user_id"
    t.datetime "last_request_at"
    t.datetime "last_login_at"
    t.string   "persistence_token",                      :default => "",    :null => false
    t.string   "single_access_token",                    :default => "",    :null => false
    t.string   "perishable_token",                       :default => "",    :null => false
    t.integer  "login_count",                            :default => 0,     :null => false
    t.integer  "failed_login_count",                     :default => 0,     :null => false
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.string   "clear_password"
    t.string   "forename"
    t.string   "phone"
    t.string   "organisation"
    t.string   "post_building"
    t.string   "post_street"
    t.string   "post_place"
    t.string   "post_town"
    t.string   "post_county"
    t.string   "postcode"
    t.integer  "posts_count",                            :default => 0
    t.integer  "old_id"
  end

  add_index "readers", ["session_token"], :name => "session_token"

  create_table "sessions", :force => true do |t|
    t.string   "session_id"
    t.text     "data"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "sites", :force => true do |t|
    t.string   "name"
    t.string   "domain"
    t.integer  "homepage_id"
    t.integer  "position",          :default => 0
    t.string   "base_domain"
    t.integer  "created_by_id"
    t.datetime "created_at"
    t.integer  "updated_by_id"
    t.datetime "updated_at"
    t.string   "subtitle"
    t.string   "abbreviation"
    t.integer  "forum_layout_id"
    t.integer  "reader_layout_id"
    t.string   "mail_from_name"
    t.string   "mail_from_address"
  end

  create_table "snippets", :force => true do |t|
    t.string   "name",          :limit => 100, :default => "", :null => false
    t.string   "filter_id",     :limit => 25
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "lock_version",                 :default => 0
    t.integer  "site_id"
  end

  add_index "snippets", ["name"], :name => "name", :unique => true

  create_table "submenu_links", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.integer  "user_id"
    t.integer  "site_id"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "submenu_links", ["site_id", "user_id"], :name => "index_links_by_site_and_user"

  create_table "taggings", :force => true do |t|
    t.integer "tag_id"
    t.string  "tagged_type"
    t.integer "tagged_id"
  end

  add_index "taggings", ["tag_id", "tagged_id", "tagged_type"], :name => "index_taggings_on_tag_id_and_tagged_id_and_tagged_type", :unique => true

  create_table "tags", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "site_id"
  end

  add_index "tags", ["title"], :name => "index_tags_on_title", :unique => true

  create_table "text_asset_dependencies", :force => true do |t|
    t.integer  "text_asset_id"
    t.string   "names"
    t.datetime "effectively_updated_at"
  end

  create_table "text_assets", :force => true do |t|
    t.string   "class_name",    :limit => 25
    t.string   "name",          :limit => 100
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "lock_version"
    t.string   "filter_id",     :limit => 25
    t.integer  "site_id"
    t.boolean  "minify"
  end

  create_table "topics", :force => true do |t|
    t.integer  "forum_id"
    t.integer  "site_id"
    t.integer  "reader_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "replied_at"
    t.integer  "hits",          :default => 0
    t.boolean  "sticky",        :default => false
    t.integer  "posts_count",   :default => 0
    t.integer  "first_post_id"
    t.integer  "last_post_id"
    t.boolean  "locked",        :default => false
    t.integer  "replied_by_id"
    t.integer  "page_id"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.integer  "old_id"
    t.integer  "group_id"
  end

  add_index "topics", ["forum_id", "replied_at"], :name => "index_topics_on_forum_id_and_replied_at"
  add_index "topics", ["forum_id", "sticky", "replied_at"], :name => "index_topics_on_sticky_and_replied_at"
  add_index "topics", ["forum_id"], :name => "index_topics_on_forum_id"
  add_index "topics", ["page_id"], :name => "index_topics_on_page_id"
  add_index "topics", ["site_id"], :name => "index_topics_on_site_id"

  create_table "users", :force => true do |t|
    t.string   "name",          :limit => 100
    t.string   "email"
    t.string   "login",         :limit => 40,  :default => "",    :null => false
    t.string   "password",      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "created_by_id"
    t.integer  "updated_by_id"
    t.boolean  "admin",                        :default => false, :null => false
    t.boolean  "developer",                    :default => false, :null => false
    t.text     "notes"
    t.integer  "lock_version",                 :default => 0
    t.string   "salt"
    t.string   "session_token"
    t.integer  "site_id"
  end

end

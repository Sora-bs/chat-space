# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

##DB設計

##usersテーブル

|column|type|opsions|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: ture|

###association

- has_many :groups
- has_many :message



##groupテーブル

|column|type|opsions|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

###association

- has_many :users
- has_many :messages



##messageテーブル

|column|type|opsions|
|------|----|-------|
|text|string|null: false|
|user_id|integer|null: false, foreign_key: true|

###association

- belongs_to :user
- belongs_to :group

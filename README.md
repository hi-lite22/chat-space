# Chat-Space DB設計
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false,foreign_key|
|group_id|integer|null: false,foreign_key|
### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
Column|Type|Options|
|------|----|-------|
name|string|null: false, add_index: true|
email|string|null: false, unique: true|
### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :messages

## groupsテーブル
Column|Type|Options|
|------|----|-------|
name|string|null: false|
### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages

## groups_usersテーブル
Column|Type|Options|
|------|----|-------|
user_id|integer|null: false, foreign_key: true|
group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
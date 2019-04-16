class Group < ApplicationRecord
    has_many :group_users
    has_many :usres, through: :group_users
end

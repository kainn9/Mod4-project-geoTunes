class PlayRoute < ApplicationRecord
    belongs_to :user
    has_many :pins
    has_many :fav_routes
    has_many :users, through: :fav_routes
end

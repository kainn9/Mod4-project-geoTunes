class User < ApplicationRecord
    has_secure_password
    has_many :play_routes
    has_many :fav_routes
    has_many :routes, through: :fav_routes, source: :play_route
    validates :username, uniqueness: {case_sensitive:false}
end

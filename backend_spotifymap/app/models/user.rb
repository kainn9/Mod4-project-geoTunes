class User < ApplicationRecord
    has_many :play_routes
    has_many :fav_routes, through: :play_routes
    has_secure_password
    validates :username, uniqueness: {case_sensitive:false}


end

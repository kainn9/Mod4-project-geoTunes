class User < ApplicationRecord
    has_secure_password
    has_many :play_routes
    has_many :fav_routes
    has_many :routes, through: :fav_routes, source: :play_route
    validates :username, uniqueness: {case_sensitive:false}
    validates :name, :username, :password, presence: true


    def fields_filled
        if name.blank?
            errors.add("Name cannot be blank")
        elsif username.blank?
            errors.add("Username cannot be blank")
        else password.blank?
            errors.add("Password cannot be blank")
        end   

    end




end

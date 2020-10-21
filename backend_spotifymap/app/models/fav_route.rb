class FavRoute < ApplicationRecord
    belongs_to :user
    belongs_to :play_route
end

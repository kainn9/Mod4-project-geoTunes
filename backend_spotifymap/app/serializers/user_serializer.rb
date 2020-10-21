class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :play_routes, :fav_routes
end

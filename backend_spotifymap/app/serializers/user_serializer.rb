class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :location, :avatar
end

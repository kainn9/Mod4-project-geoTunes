class PlayRouteSerializer < ActiveModel::Serializer
  attributes :id, :pins, :user, :playlist
end

class Api::V1::FavRoutesController < ApplicationController

    def create
        FavRoute.create(user_id: params[:user_id], play_route_id: params[:play_route_id])
    end

    def destroy
        favRoute = FavRoute.find(params[:id])
        favRoute.destroy
    end
end

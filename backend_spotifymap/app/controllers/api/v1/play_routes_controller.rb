class Api::V1::PlayRoutesController < ApplicationController
    
    def show
        playRoute = PlayRoute.find(params[:id])

        render json: playRoute
    end

    def create
        playRoute = PlayRoute.create(
            user_id: params[:user][:id],
            name: params[:plName],
            playlist: params[:playlist],
        )

        params[:playRouteData].each do |cord|
            Pin.create(
                play_route_id: playRoute.id,
                lat: cord[:lat],
                lng: cord[:lng],
            )
        end 

   
    end

    def update
        playRoute = PlayRoute.find(params[:id])
        playRoute.pins.each do |pin|
            pin.destroy
        end

        
        params[:cords].each do |cord|
            Pin.create(
            play_route_id: playRoute.id,
            lat: cord[:lat],
            lng: cord[:lng],
            )

        end
    end

    def index
        playRoutes = PlayRoute.all
        render json: playRoutes
    end

    private
    
    def play_route_params
        params.require(:why)
    end
end

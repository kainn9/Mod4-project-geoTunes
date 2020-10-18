class Api::V1::PlayRoutesController < ApplicationController
    
    def create
        playRoute = PlayRoute.create(
            user_id: params[:user][:id],
            name: 'Testing_Placeholder'

        )

        params[:playRouteData].each do |cord|
            Pin.create(
                play_route_id: playRoute.id,
                lat: cord[:lat],
                lng: cord[:lng],
            ) 
        end
        
    end

    private
    
    def play_route_params
        params.require(:why)
    end
end

class Api::TripsController < ApplicationController

    # def index 
    #     @trips = []
    #     if current_user
    #         @trips = bounds ? current_user.trips.in_bounds(bounds) : current_user.trips     
    #         @trips = @trips.reverse()
    #     end
    #     render :index
    # end

    # def create
        
    #     @activity = current_user.trips.new(trip_params)
    #     if @trip.save
    #         render "api/trips/show"
    #     else
    #         render json: @trip.errors.full_messages, status: 422
    #     end
    # end

    # def show
    #     @trip = Trip.find(params[:id])
    # end

    private

    def activities_params
        params.require(:activities).permit([:title, :description, :user_id, :start_date, :end_date, :location_lat, :location_lng, :photo])
    end

end
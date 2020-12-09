class Api::TripsController < ApplicationController

    def index 
        @trips = []
        if current_user
            @trips = bounds ? current_user.trips.in_bounds(bounds) : current_user.trips     
        end
        render :index
    end

    def create
        @trip = current_user.trips.new(trip_params)
        activity_inputs = activity_params
        if activity_inputs
            @activities = []
            activity_inputs.each do |activity|
                @activities.push(@trip.activities.new(activity))
            end
        end
        if @trip.save
            render "api/trips/show"
        else
            render json: @trip.errors.full_messages, status: 422
        end
    end

    def show
        @trip = Trip.with_attached_photos.find(params[:id])
    end

    private

    def trip_params
        params.require(:trip).permit(:title, :description, :user_id, :start_date, :end_date, :location_lat, :location_lng, photos: [], activities_attributes: [:id, :elevation_gain, :distance, :trackpoints])
    end

    def activity_params
        JSON.parse params.require(:trip).permit(:activities)["activities"]
    end

    def bounds
        params[:bounds]
    end
end
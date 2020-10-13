class Api::TripsController < ApplicationController

    def index 
        @trips = bounds ? Trip.in_bounds(bounds) : Trip.all
        if params[:minCapacity] && params[:maxCapacity]
            @trips = @trips.where(capacity: capacity_range)
        end
        render :index
    end

    def create
        @trip = Trip.new(trip_params)
        if @trip.save
            render "api/trips/show"
        else
            render json: @trip.errors.full_messages, status: 422
        end
    end

    def show
        @trip = Trip.find(params[:id])
    end

    private

    def trip_params
        params.require(:trip).permit(:title, :description, :lat, :lng, :capacity, :maxCapacity, :minCapacity, :photo)
    end

      def capacity_range
    (params[:minCapacity]..params[:maxCapacity])
        end

    def bounds
        params[:bounds]
    end
end
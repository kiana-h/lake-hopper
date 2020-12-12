@trips.each do |trip|
    json.set! trip.id do
        json.partial! 'api/trips/trip-summary', trip: trip

    end
end

@trips.each do |trip|
    json.set! trip.id do
        json.partial! 'api/trips/trip-summary', trip: trip
        json.activitySummaries do
            json.array! trip.activities do |activity|
            json.partial! 'api/activities/activity-summary', activity: activity 
            end
        end
    end
end

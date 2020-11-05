json.partial! 'api/trips/trip', trip: @trip
json.activities do
    json.array! @trip.activities do |activity|
       json.partial! 'api/activities/activity', activity: activity 
    end
end

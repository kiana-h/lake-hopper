json.extract! trip, :id ,:user_id, :title, :start_date, :end_date, :description, :distance, :elevation_gain, :location_lat, :location_lng
if trip.photos.attached? 
    if trip.photos.length > 1
        photo = url_for(trip.photos[1]) 
    else
        photo = url_for(trip.photos[0])
    end 
    json.photo_url photo
end





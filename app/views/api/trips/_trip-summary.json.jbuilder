json.extract! trip, :id ,:user_id, :title, :start_date, :end_date, :description, :location_lat, :location_lng, :mapImageUrl
if trip.photos.attached? 
    photos = [url_for(trip.photos[0])]  
    json.photos_url photos
end





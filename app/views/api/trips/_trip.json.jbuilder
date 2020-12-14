json.extract! trip, :id ,:user_id, :title, :start_date, :end_date, :description, :distance, :elevation_gain, :location_lat, :location_lng
if trip.photos.attached? 
    photos = []
    trip.photos.each_with_index do |photo,i|
        photos.push(url_for(photo))
    end
    json.photos_url photos     
end





json.extract! trip, :id ,:user_id, :title, :start_date, :end_date, :description, :location_lat, :location_lng, :mapImageUrl
if trip.photos.attached? 
    photos = []
    trip.photos.each_with_index do |photo,i|
        photos.push(url_for(photo))
    end
    json.photos_url photos     
end





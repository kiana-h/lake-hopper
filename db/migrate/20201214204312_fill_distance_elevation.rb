class FillDistanceElevation < ActiveRecord::Migration[5.2]
  def change
    Trip.includes(:activities).find_each do |trip|
      activities = trip.activities
      distance = 0
      elevation_gain = 0
      activities.each do |activity|
        distance += activity.distance
        elevation_gain += activity.elevation_gain
      end
      trip.update_column(:distance, (distance*0.000621371).round(2) )
      trip.update_column(:elevation_gain,(elevation_gain*3.28084).round(0))
    end
  end
end

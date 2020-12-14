class AddDistanceElevationToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :distance, :float
    add_column :trips, :elevation_gain, :integer
  end
end

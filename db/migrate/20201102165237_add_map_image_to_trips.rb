class AddMapImageToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :mapImageUrl, :string
  end
end

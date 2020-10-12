class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.float :location_lat, null: false
      t.float :location_lng, null: false
      t.text :description

      t.timestamps
    end
    add_index :trips, :user_id
  end
end

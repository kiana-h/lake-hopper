class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.datetime :time, null: false
      t.string :type, null: false
      t.text :description
      t.float :distance
      t.integer :duration
      t.binary :track_points

      t.integer :calories  
      t.integer :average_hr
      t.float :pace
      t.integer :elevation_gain

      t.integer :trip_id

      t.timestamps

    end
    add_index :activities, :trip_id
  end
end

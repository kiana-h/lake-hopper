class CreateActivitiesT < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.binary :trackpoints, null: false
      t.integer :elevation_gain, null: false
      t.float :distance, null: false
      t.integer :calories  
      t.integer :avg_hr
      t.integer :duration
      t.integer :trip_id

      t.timestamps

    end
    add_index :activities, :trip_id
  end
end

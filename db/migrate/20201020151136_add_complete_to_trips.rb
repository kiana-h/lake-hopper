class AddCompleteToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :complete, :boolean, default: false, null: false
  end
end

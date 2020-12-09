class RemoveMapImageColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :trips, :mapImageUrl
  end
end

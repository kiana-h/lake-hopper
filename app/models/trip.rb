class Trip < ApplicationRecord
    validates :user_id, :title, :start_date, :end_date, :location_lat, :location_lng, presence: true

    belongs_to :user
    
    has_many :activities,
    class_name: 'Activity',
    foreign_key: :trip_id,
    primary_key: :id,
    :dependent => :destroy

    accepts_nested_attributes_for :activities

    has_many_attached :photos

    def self.in_bounds(bounds)
        self.where("location_lat < ?", bounds[:northEast][:lat])
            .where("location_lat > ?", bounds[:southWest][:lat])
            .where("location_lng > ?", bounds[:southWest][:lng])
            .where("location_lng < ?", bounds[:northEast][:lng])
    end
  
end
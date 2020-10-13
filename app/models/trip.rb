class Trip < ApplicationRecord
    validates :user_id, :title, :start_date, :end_date, :location_lat, :location_lng, presence: true

    belongs_to :user
    has_many :activities,
    class_name: 'Activity',
    foreign_key: :trip_id,
    primary_key: :id
  
end
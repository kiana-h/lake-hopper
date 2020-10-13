class Activity < ApplicationRecord
    validates :user_id, :title, :start_date, :end_date, :location_lat, :location_lng, presence: true

    belongs_to :trip
    belongs_to :user, through: :trip
end
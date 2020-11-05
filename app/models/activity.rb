class Activity < ApplicationRecord
    validates  :trackpoints, :elevation_gain, :distance, presence: true

    belongs_to :trip, optional: true

end


class Book < ApplicationRecord
    has_many :reviews

    def avg_score
        return 0  unless reviews.count.positive?
        reviews.average(:score).round(2).to_f
    end



end

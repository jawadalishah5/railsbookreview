class Api::V1::ReviewsController < ApplicationController
    
    def create
      review = Review.create!(review_params)

      if review.save
        render json: review
      else
        render json: errors(review), status: 422
      end
    end
  
  
    private
  
    def review_params
        params.require(:review).permit(:title, :description, :score, :book_id)
    end

  
  
  
  end
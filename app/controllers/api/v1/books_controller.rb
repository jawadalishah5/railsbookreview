class Api::V1::BooksController < ApplicationController
  
  def index
    books = Book.all
    render json: books, include: [:reviews]
    # render json: {books: books.as_json(include: [:reviews])
    
  end

  def create
    book = Book.create!(book_params)
    if book
      render json: book
    else
      render json: book.errors
    end
  end

  def show
    book = Book.find(params[:id])
    render json: book, include: [:reviews]
  end

  def search
    books=Book.where("lower(title) LIKE ?", "%" + params[:q].downcase + "%")
    render json: books, include: [:reviews]
  end

  private

  def book_params
    params.permit(:title, :subjects, :author, :languages, :image)
  end


  def options
    @options ||= { include: %i[reviews] }
  end



end

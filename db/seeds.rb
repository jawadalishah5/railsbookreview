# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'httparty'



# response = HTTParty.get('https://gutendex.com/books/')
# books = response.parsed_response['results']

# books.each do |book|
#   Book.create(
#     title: book['title'],
#     subjects: book['subjects'],
#     languages: book['languages'],
#     author: book['authors'][0]["name"],
#     image: book['formats']["image/jpeg"]
#   )
# end


review = Review.create([
    {
        title: 'Great book!',
        description: 'One of the greatest. Please read it in your free time.',
        score: 5,
        book: Book.first
    },
    {
        title: 'Masterpiece!',
        description: 'Give it a read. Fantastic',
        score: 5,
        book: Book.first
    },
    {
        title: 'Pathetic!',
        description: 'Spreading hate speech. Do not read.',
        score: 1,
        book: Book.second        
    }
])
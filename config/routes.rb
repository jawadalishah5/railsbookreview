Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # resources :books, :defaults => { :format => 'json' }
      get 'books/index'
      post 'books/create'
      get '/show/:id', to: 'books#show'
      get 'reviews/index'
      post 'reviews/create'
      get '/show/:id', to: 'reviews#show'
      get "search", to: "books#search"
      post "search", to: "books#search"
      
    end
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

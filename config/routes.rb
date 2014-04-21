BackWater02::Application.routes.draw do
  root :to => "home#index"

  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users

  get 'posts/my', to: 'posts#my'
  get 'posts/list/:id', to: 'posts#list'
  resources :posts do
    resources :images
  end

  get '/l/:id', to: "home#list"

end
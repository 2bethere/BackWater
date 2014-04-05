BackWater02::Application.routes.draw do
  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
  get 'posts/my', to: 'posts#my'
  resources :posts do

    resources :images
  end




end
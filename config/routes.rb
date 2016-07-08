Rails.application.routes.draw do
  root 'home#index'

  get '/c4d/' => 'c4d#index'
  get '/c4d/selection' => 'c4d#selection'

  get '/sop/' => 'sop#index'

  post '/sop/checklist/' => 'sop_checklist#create'
  delete '/sop/checklist/' => 'sop_checklist#destroy'

  post '/c4d/toolkit/' => 'c4d_toolkit#create'
  delete '/c4d/toolkit/' => 'c4d_toolkit#destroy'

  resources :sop_articles, only: [:show]
  resources :c4d_articles, only: [:show]

  resources :cms, only: [:index]

  namespace :cms, defaults: { format: :json } do
    resources :users, only: [:index, :update, :create, :destroy]
    resources :sop_articles, only: [:index, :update, :show, :create]
    resources :c4d_articles, only: [:index, :update, :show, :create]
    resources :c4d_reference_links, only: [:show]
    resources :sop_reference_links, only: [:show]
  end

  namespace :api, defaults: { format: :json } do
    resources :sop_times, only: [:index]
    resources :sop_categories, only: [:index]
    resources :responsible_offices, only: [:index]
    resources :support_affiliations, only: [:index]
    resources :c4d_subcategories, only: [:index]
    resources :c4d_categories, only: [:index]
  end

  resources :users, only: [:new, :create, :show]

  post '/signin/', to: 'sessions#create', as: :signin
  delete '/signout/', to: 'sessions#destroy', as: :signout
end
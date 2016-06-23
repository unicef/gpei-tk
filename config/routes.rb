Rails.application.routes.draw do
  root 'home#index'

  get '/c4d' => 'c4d#index'
  get '/c4d/selection' => 'c4d#selection'

  get '/sop' => 'sop#index'

  post '/sop/checklist/:title' => 'sop_checklist#create'
  delete '/sop/checklist/:title' => 'sop_checklist#destroy'

  post '/c4d/toolkit/:title' => 'c4d_toolkit#create'
  delete '/c4d/toolkit/:title' => 'c4d_toolkit#destroy'

  resources :sop_articles, only: [:index, :show]
  resources :c4d_articles, only: [:index, :show]

  resources :c4d_reference_links, only: [:show]
  resources :sop_reference_links, only: [:show]

  resources :cms, only: [:index]

  namespace :cms, defaults: { format: :json } do
    resources :users, only: [:index, :update, :create, :destroy]
    resources :sop_articles, only: [:index, :update, :show, :create]
    resources :c4d_articles, only: [:index, :update, :show, :create]
  end

  resources :users, only: [:show]
  resources :roles, only: [:index]

  namespace :api, defaults: { format: :json } do
    resources :sop_times, only: [:index]
    resources :sop_categories, only: [:index]
    resources :offices, only: [:index]
    resources :c4d_subcategories, only: [:index]
    resources :c4d_categories, only: [:index]
  end
end
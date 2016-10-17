Rails.application.routes.draw do
  root 'home#index'

  get '/c4d/' => 'c4d#index'
  get '/c4d/understand/' => 'c4d#understand'
  get '/c4d/plan/' => 'c4d#plan'
  get '/c4d/act/' => 'c4d#act'
  get '/c4d/tools/' => 'c4d#tools'

  get '/c4d/understand/:id' => 'c4d#understand'
  get '/c4d/plan/:id' => 'c4d#plan'
  get '/c4d/act/:id' => 'c4d#act'
  get '/c4d/tools/:id' => 'c4d#tools'

  get '/sop/' => 'sop#index'

  get '/sop/what_to_do_when/' => 'sop#whatToDoWhen'
  get '/sop/what_to_do_when/:id' => 'sop#whatToDoWhen'
  get '/sop/overview/' => 'sop#overview'

  post '/sop/checklist/' => 'sop_checklist#create'
  delete '/sop/checklist/' => 'sop_checklist#destroy'

  post '/c4d/toolkit/' => 'c4d_toolkit#create'
  delete '/c4d/toolkit/' => 'c4d_toolkit#destroy'

  resources :sop_articles, only: [:show]
  resources :c4d_articles, only: [:show]

  resources :cms, only: [:index]

  namespace :cms, defaults: { format: :json } do
    resources :users, only: [:index, :update, :create]
    patch '/users/toggleActive/:id', to: 'users#toggleActive', as: :users_toggle_active
    resources :sop_articles, only: [:index, :update, :show, :create]
    resources :c4d_articles, only: [:index, :update, :show, :create]
    patch '/sop_articles/publish/:id', to: 'sop_articles#publish', as: :sop_article_publish
    patch '/c4d_articles/publish/:id', to: 'c4d_articles#publish', as: :c4d_article_publish
    resources :reference_links, only: [:index, :create, :update, :destroy]
    resources :embedded_images, only: [:create]
  end

  namespace :api, defaults: { format: :json } do
    resources :sop_times, only: [:index]
    resources :sop_categories, only: [:index]
    resources :responsible_offices, only: [:index]
    resources :support_affiliations, only: [:index]
    resources :c4d_subcategories, only: [:index]
    resources :c4d_categories, only: [:index]
    resources :roles, only: [:index]
  end

  resources :users, only: [:new, :create, :show]

  resources :forgot_passwords, only: [:create, :update]
  get '/forgot_passwords/:key' => 'forgot_passwords#new'

  post '/signin/', to: 'sessions#create', as: :signin
  delete '/signout/', to: 'sessions#destroy', as: :signout

  get '/terms_of_service/' => 'terms_of_service#index'
end
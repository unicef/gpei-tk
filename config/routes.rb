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
    patch '/users/toggleActive/:id' => 'users#toggleActive', as: :users_toggle_active

    resources :sop_articles, only: [:index, :update, :show, :create]
    resources :c4d_articles, only: [:index, :update, :show, :create]

    patch '/sop_articles/publish/:id' => 'sop_articles#publish', as: :sop_article_publish
    patch '/c4d_articles/publish/:id' => 'c4d_articles#publish', as: :c4d_article_publish

    patch '/c4d_articles/orderUp/:id' => 'c4d_articles#orderUp', as: :c4d_article_order_up
    patch '/c4d_articles/orderDown/:id' => 'c4d_articles#orderDown', as: :c4d_article_order_down
    patch '/sop_articles/orderUp/:id' => 'sop_articles#orderUp', as: :sop_article_order_up
    patch '/sop_articles/orderDown/:id' => 'sop_articles#orderDown', as: :sop_article_order_down

    resources :reference_links, only: [:index, :show, :create, :update, :destroy]do
      get :utilized, on: :collection
    end
    resources :reference_mp3s, only: [:index, :create, :update, :destroy]
    resources :reference_pptxes, only: [:index, :create, :update, :destroy]

    resources :featured_references, only: [:index, :destroy, :create]

    resources :embedded_images, only: [:create]

    resources :feedbacks, only: [:index, :create]
    resources :notifications, only: [:index, :create]
  end

  namespace :api, defaults: { format: :json } do
    resources :reference_downloads, only: [:create]
    resources :reference_likes, only: [:create]
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

  post '/signin/' => 'sessions#create', as: :signin
  delete '/signout/' => 'sessions#destroy', as: :signout

  get '/terms_of_service/' => 'terms_of_service#index'

  post '/feedback/' => 'feedback#create'

  get '/library/' => 'library#index'
  get '/library/referenceSearch/' => 'library#referenceSearch'
end
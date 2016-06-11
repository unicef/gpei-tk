Rails.application.routes.draw do
  root 'home#index'
  get '/c4d' => 'c4d#index'
  get '/sop' => 'sop#index'
  patch '/sop/checklist/:title' => 'sop_checklist#update'
  resources :sop_articles, only: [:index, :show]
  resources :c4d_articles, only: [:index, :show]
end
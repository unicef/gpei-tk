Rails.application.routes.draw do
  root 'home#index'
  get '/c4d' => 'c4d#index'
  get '/c4d/selection' => 'c4d#selection'
  get '/sop' => 'sop#index'
  post '/sop/checklist/:title' => 'sop_checklist#create'
  delete '/sop/checklist/:title' => 'sop_checklist#destroy'
  resources :sop_articles, only: [:index, :show]
  resources :c4d_articles, only: [:index, :show]
end
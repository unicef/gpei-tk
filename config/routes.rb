Rails.application.routes.draw do
  root 'home#index'
  get '/c4d' => 'c4d#index'
  get '/sop' => 'sop#index'
end
Rails.application.routes.draw do
  root 'home#index'
  get '/c4d' => 'c4d#index'
  get '/sop' => 'sop#index'
  patch '/sop/checklist/:title' => 'sop_checklist#update'
end
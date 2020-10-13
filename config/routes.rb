Rails.application.routes.draw do
    namespace :api, defaults: {format: :json} do
      resources :users, only: [:show, :create, :destroy, :update]
      resource :session, only: [:create, :destroy]
      resources :trips, only: [:show, :create, :destroy, :update, :index]
    end
  root 'static_pages#root'
end

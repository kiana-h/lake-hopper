Rails.application.routes.draw do
    namespace :api, defaults: {format: :json} do
      resources :users, only: [:show, :create, :destroy, :update]
      resource :session, only: [:create, :destroy]
      resources :trips, only: [:show, :create, :destroy, :update, :index]
      resources :activities, only: [:create]
    end
  root 'static_pages#root'
  get '*path', to: 'static_pages#root', constraints: lambda { |req|
  req.path.exclude? 'rails/active_storage'
}
end

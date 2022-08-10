Rails.application.routes.draw do
  
  resources :players, :only => [:index, :update]
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end

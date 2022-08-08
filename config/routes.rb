Rails.application.routes.draw do
  
  resources :players, :only => [:index, :update]

end

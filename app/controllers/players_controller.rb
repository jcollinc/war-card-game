class PlayersController < ApplicationController

  def index 
    render json: Player.all
  end

  def update 
    player = Player.find(params[:id])
    player.update!(player_params)
    render json: player, status: 200
  end

  private 
  
  def player_params
    params.permit(:win_count)
  end

end
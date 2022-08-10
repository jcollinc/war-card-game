class PlayersController < ApplicationController

  def index 
    render json: Player.all
  end

  def update 
    player = Player.find(params[:id])
    player.update(games_won: params[:games_won])
    render json: player, status: 200
  end

end
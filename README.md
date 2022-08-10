# WAR

### Game Rules

This app allows you to simulate the card game War, which involves an entire deck being dealt between two players. Each player plays a card from their deck, and whoever has the highest value card takes both played cards and adds them back into their deck. If both players play cards of the same value, War is declared: each player will play one face down card, and one face up card. Whoever has the highest value takes all the cards played. If the same card is played again, the same process continues until one player wins the war and claims all the cards played. The game ends when a player runs out of cards, or enters into a war with too few cards to complete the round.  

## The deployed version of the app can be seen [here](https://play-war-card-game.herokuapp.com/).

This app is built using React and Ruby on Rails with a Postgres database. 

To run a local version of the app, clone this repository and run:

```
bundle install
rails db:create
npm install --prefix client
``` 

This will install dependencies and setup the database. In one terminal, run ```rails s``` to start the rails server, and in another terminal run ```npm start``` to launch the app. To start Postgres, run the command ```sudo service postgresql start```.  These instructions assume a WSL environment, and that certain services are already installed, and will need alterations for OSX.  

// "use strict";

class Game{
    constructor(){
	  this.canvas = new Canvas(WIDTH, HEIGHT, true);

	  this.input = new InputHandler({
  		 up: 38,
  		 down: 40,
  		 spaceBar: 32,
  		 enter: 13,
  		 left: 37,
  		 right: 39
	  });

	  this.currentState = null;
	  this.nextState = States.START;

	}

	run(){
	     var self = this;
		   var context = this.canvas.ctx;
		   if(ANIMATION){

			    this.canvas.animate(function(dt, frame){

  				if(self.nextState !== States.NO_CHANGE){
  				   switch(self.nextState){
  				      case States.START:
  						self.currentState = new StartState(self);
  						break;
  					  case States.MENU:
  						self.currentState = new MenuState(self);
  						break;
  					  case States.GAME:
  						self.currentState = new GameState(self);
  						break;
  				   }
  				   self.nextState = States.NO_CHANGE;
  				}

          self.currentState.handleInputs(self.input);
  				self.currentState.update(dt, frame);
  				self.currentState.render(self.canvas.ctx);

          TWEEN.update();

			 });

		 }
	}

}

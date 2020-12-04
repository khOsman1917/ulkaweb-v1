var Game = Class.extend({
    init: function(){
	  this.canvas = new Canvas(width, height);
	  // this.canvas.ctx.loadImagesNeeded();
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

	},

	run: function(){
	     var self = this;
		   var context = this.canvas.ctx;
		   if(animation){
			    this.canvas.animate(function(){

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

  		        self.canvas.ctx.setTransform(s, 0, 0, s, 0, moveAmt);
                self.currentState.handleInputs(self.input);
  				self.currentState.update();
  				self.currentState.render(self.canvas.ctx);
			 });
		 }
	}
});

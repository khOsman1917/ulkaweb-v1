class Game {
    constructor(){
	  this.canvas1 = new Canvas(width, height, true);
	  this.canvas2 = new Canvas(width, height, true);
	  this.canvas3 = new Canvas(width, height, true);
	  this.canvas4 = new Canvas(width, height, true);

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
	     let self = this,
		       context1 = this.canvas1.ctx,
		       context2 = this.canvas2.ctx,
		       context3 = this.canvas3.ctx,
					 context4 = this.canvas4.ctx;
					 
		   if(animation){
			    this.animate(function(){

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
  				self.currentState.update();
  				self.currentState.render(context1, context2, context3, context4);
			 });
		 }
	}

	animate(loop){
    let rf = (function(){
	  return window.requestAnimationFrame ||
	         window.webkitRequestAnimationFrame ||
					 window.mozRequestAnimationFrame ||
					 function(callback){
							window.setTimeout(callback, 1000/60);
					 };
		})();

		let l = function(){
			loop();
			if(animation) rf(l);
		}
		if(animation) rf(l);
		}
}

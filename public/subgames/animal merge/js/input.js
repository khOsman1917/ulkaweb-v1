// "use strict";

var xDown = null;
var yDown = null;
var xDiff = null;
var yDiff = null;
var touch_start_time = null, touch_end_time = null;

class InputHandler{

  constructor(keys){
    this.keys = {};
    this.down = {};
    this.pressed = {};

	for(var key in keys){
	  var code = keys[key];

	  this.keys[code] = key;
	  this.down[key] = false;
	  this.pressed[key] = false;
	}

	var self = this;


  CANVAS.addEventListener('mousedown', function(evt){
	evt.preventDefault();
    evt.stopPropagation();

    if(accordingToWidth){
       xDown = evt.clientX / SCALE;
  	   yDown = (evt.clientY - CANVAS.offsetTop - moveAmt) / SCALE;
    }else{
       xDown = (evt.clientX - moveAmt) / SCALE;
	     yDown = (evt.clientY - CANVAS.offsetTop) / SCALE;
    }
		self.down[self.keys[13]] = true;
		self.down[self.keys[32]] = false;
		self.pressed[self.keys[32]] = false;

		touch_start_time = new Date().getTime();

		screenX = xDown;
		screenY = yDown;

	}, false);

	CANVAS.addEventListener('mousemove', function(evt){
	  evt.preventDefault();
		evt.stopPropagation();
		if ( ! xDown || ! yDown ) {
			return;
		}

		if(accordingToWidth){
		   var xUp = evt.clientX / SCALE;
		   var yUp = (evt.clientY - CANVAS.offsetTop - moveAmt) / SCALE;
		}else{
		   var xUp = (evt.clientX - moveAmt) / SCALE;
		   var yUp = (evt.clientY - CANVAS.offsetTop) / SCALE;
		}

		xDiff = xDown - xUp;
		yDiff = yDown - yUp;

    if(Math.abs(xDiff) > Math.abs(yDiff)){
	     // swipe stuff
	  }else if(Math.abs(xDiff) < Math.abs(yDiff)){
	     // swipe stuff
	  }

    xDown = xUp;
    yDown = yUp;

	}, false);

	CANVAS.addEventListener('mouseup', function(evt){

	    xDown = null;
			yDown = null;
			xDiff = null;
			yDiff = null;

			self.down[self.keys[13]] = false;
			self.pressed[self.keys[13]] = false;

			self.down[self.keys[32]] = true;

			screenX = null;
			screenY = null;

	}, false);


	CANVAS.addEventListener('touchstart', function(evt){
	evt.preventDefault();
    evt.stopPropagation();

    if(accordingToWidth){
       xDown = evt.touches[0].clientX / SCALE;
  	   yDown = (evt.touches[0].clientY - CANVAS.offsetTop - moveAmt) / SCALE;
    }else{
       xDown = (evt.touches[0].clientX - moveAmt) / SCALE;
	     yDown = (evt.touches[0].clientY - CANVAS.offsetTop) / SCALE;
    }
		self.down[self.keys[13]] = true;
		self.down[self.keys[32]] = false;
		self.pressed[self.keys[32]] = false;

		touch_start_time = new Date().getTime();

		screenX = xDown;
		screenY = yDown;

	}, false);

	CANVAS.addEventListener('touchmove', function(evt){
	  evt.preventDefault();
		evt.stopPropagation();
		if ( ! xDown || ! yDown ) {
			return;
		}

		if(accordingToWidth){
		   var xUp = evt.touches[0].clientX / SCALE;
		   var yUp = (evt.touches[0].clientY - CANVAS.offsetTop - moveAmt) / SCALE;
		}else{
		   var xUp = (evt.touches[0].clientX - moveAmt) / SCALE;
		   var yUp = (evt.touches[0].clientY - CANVAS.offsetTop) / SCALE;
		}

		xDiff = xDown - xUp;
		yDiff = yDown - yUp;

    if(Math.abs(xDiff) > Math.abs(yDiff)){
	     // swipe stuff
	  }else if(Math.abs(xDiff) < Math.abs(yDiff)){
	     // swipe stuff
	  }

    xDown = xUp;
    yDown = yUp;

	}, false);

	CANVAS.addEventListener('touchend', function(evt){

	    xDown = null;
			yDown = null;
			xDiff = null;
			yDiff = null;

			self.down[self.keys[13]] = false;
			self.pressed[self.keys[13]] = false;

			self.down[self.keys[32]] = true;

			screenX = null;
			screenY = null;

	}, false);

  }

  isDown(key){
      return this.down[key];
  }

  isPressed(key){
      if(this.pressed[key]){
    	   return false;
    	}else if(this.down[key]){
    	   return this.pressed[key] = true;
    	}
    	return false;
  }
}

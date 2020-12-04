var xDown = null;
var yDown = null;
var xDiff = null;
var yDiff = null;
var touch_start_time = null, touch_end_time = null;

var InputHandler = Class.extend({

  init: function(keys){
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

  ///////////////////////////////////////////////////////////////////////////////

  canvas.addEventListener('mousedown', function(evt){
	evt.preventDefault();
    evt.stopPropagation();


       xDown = evt.clientX / scale;
  	   yDown = (evt.clientY - canvas.offsetTop - moveAmt) / scale;

       self.down[self.keys[13]] = true;
   		self.down[self.keys[32]] = false;
   		self.pressed[self.keys[32]] = false;

   		touch_start_time = new Date().getTime();

   		screenX = xDown;
   		screenY = yDown;

	}, false);

	canvas.addEventListener('mousemove', function(evt){
	  evt.preventDefault();
		evt.stopPropagation();
		if ( ! xDown || ! yDown ) {
			return;
		}

		   var xUp = evt.clientX / scale;
		   var yUp = (evt.clientY - canvas.offsetTop - moveAmt) / scale;

	

    xDiff = xDown - xUp;
		yDiff = yDown - yUp;

    if(Math.abs(xDiff) > Math.abs(yDiff)){
	   // swipe stuff
	}

	}, false);

	canvas.addEventListener('mouseup', function(evt){

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

  ///////////////////////////////////////////////////////////////////////////////

	canvas.addEventListener('touchstart', function(evt){
	evt.preventDefault();
    evt.stopPropagation();

        xDown = evt.touches[0].clientX / scale;
  		yDown = (evt.touches[0].clientY - canvas.offsetTop - moveAmt) / scale;
		self.down[self.keys[13]] = true;
		self.down[self.keys[32]] = false;
		self.pressed[self.keys[32]] = false;

		touch_start_time = new Date().getTime();

		screenX = xDown;
		screenY = yDown;

	}, false);

	canvas.addEventListener('touchmove', function(evt){
	  evt.preventDefault();
		evt.stopPropagation();
		if ( ! xDown || ! yDown ) {
			return;
		}
        var xUp = evt.touches[0].clientX / scale;
		var yUp = (evt.touches[0].clientY - canvas.offsetTop - moveAmt) / scale;

		xDiff = xDown - xUp;
		yDiff = yDown - yUp;

    if(Math.abs(xDiff) > Math.abs(yDiff)){
	   // swipe stuff
	}

	}, false);

	canvas.addEventListener('touchend', function(evt){

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

  },

  isDown: function(key){
    return this.down[key];
  },

  isPressed: function(key){
    if(this.pressed[key]){
	  return false;
	}else if(this.down[key]){
	  return this.pressed[key] = true;
	}
	return false;
  }
});

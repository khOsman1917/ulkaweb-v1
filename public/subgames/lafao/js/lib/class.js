var _game, animation = true, width = window.innerWidth,
    height = window.innerHeight, s = 1, scale = 1,
    canvas, canvasWidth = 360, canvasHeight = 640, mainHeight = 0,
    backgroundY = 0, screenX = null, screenY = null, bestScore = 0,
    frames = 0, picsToLoad = 0, downAmt = 0, moveAmt = 0,
    startTime = 0, translateX = 0, translateY = 0, tutorialShown = 0, bannerCalled = false,
    blackScreenAlphaDec = true, blackScreenAlpha = 1, blackScreenAlphaInc = false, onBlackScreenCompletion = null;

var	currentstate = 0;

var States = {
    NO_CHANGE: 0,
  	START: 1,
  	MENU: 2,
  	GAME: 3
};

(function(){
   var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*?/;

   this.Class = function(){};

   Class.extend = function(prop){
     var _super = this.prototype;

	 initializing = true;
	 var prototype = new this();
	 initializing = false;

     for(var name in prop){
	   prototype[name] = typeof prop[name] == "function" &&
	      typeof _super[name] == "function" && fnTest.test(prop[name]) ?
		  (function(name, fn){
	       return function(){
		     var tmp = this._super;

			 this._super = _super[name];

			 var ret = fn.apply(this, arguments);
			 this._super = tmp;

			 return ret;
		   };
		  })(name, prop[name]) :
		  prop[name];
	   }

       function Class(){
		 if( !initializing && this.init )
		    this.init.apply(this, arguments);
	   }

       Class.prototype = prototype;
       Class.prototype.constructor = Class;
       Class.extend = arguments.callee;

	   return Class;
   };
})();

function norm(value, min, max){
   return (value - min) / (max - min);
}

function lerp(norm, min, max){
   return (max - min) * norm + min;
}

function map(value, sourceMin, sourceMax, destMin, destMax){
   return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

function animate(amplitude, period, center, phase) {
   return amplitude * Math.sin(((new Date()).getTime() - startTime) * 2 * Math.PI / period + phase) + center;
}

function rangeIntersect(min0, max0, min1, max1){
   return Math.max(min0, max0) >= Math.min(min1, max1) &&
          Math.min(min0, max0) <= Math.max(min1, max1);
}

function rectIntersect(r0, r1){
   return rangeIntersect(r0.x, r0.x+r0.w, r1.x, r1.x+r1.w) &&
          rangeIntersect(r0.y, r0.y+r0.h, r1.y, r1.y+r1.h);
}
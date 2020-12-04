// "use strict";

class Canvas{

  ratioToWidth(){
		accordingToWidth = true;
		SCALE = WIDTH / CANVASWIDTH;

		if(HEIGHT > CANVASHEIGHT * SCALE){
		   moveAmt = (HEIGHT - CANVASHEIGHT * SCALE)/2; // devide by 2 for aligning in middle
		}else if(HEIGHT < CANVASHEIGHT * SCALE){
		   downAmt = (HEIGHT - CANVASHEIGHT * SCALE)/2;
		   moveAmt = downAmt;
		}
  }

  ratioToHeight(){
		accordingToWidth = false;
		SCALE = HEIGHT / CANVASHEIGHT;

		if(WIDTH > CANVASWIDTH * SCALE){

		   downAmt = 0;
		   moveAmt = (WIDTH - CANVASWIDTH * SCALE)/2;

		}else if(WIDTH < CANVASWIDTH * SCALE){

		   downAmt = 0;
		   moveAmt = (WIDTH - CANVASWIDTH * SCALE)/2;

		}
  }

  constructor(cwidth, cheight, keepRatio){
    this.canvas = document.createElement("canvas");
	  CANVAS = this.canvas;

    this.canvas.style.width = WIDTH + "px";
    this.canvas.style.height = HEIGHT + "px";
    this.canvas.width = WIDTH * PIXELRATIO;
    this.canvas.height = HEIGHT * PIXELRATIO;

    if(keepRatio){
  		 let requiredRatio = CANVASWIDTH / CANVASHEIGHT;
  		 let realRatio = WIDTH / HEIGHT;

  		 if(realRatio > requiredRatio){
  		    this.ratioToHeight();
  		 }else{
  		    this.ratioToWidth();
  		 }
	  }else{
		  this.ratioToWidth();
	  }

	  this.canvas.setAttribute('id', 'canvas');
	  // this.canvas.setAttribute('screencanvas', 'true');
	  MAINHEIGHT = this.canvas.height;

	  this.ctx = (function(ctx){

    if(accordingToWidth){
       ctx.setTransform(PIXELRATIO, 0, 0, PIXELRATIO, 0, moveAmt*PIXELRATIO);
    }else{
       ctx.setTransform(PIXELRATIO, 0, 0, PIXELRATIO, moveAmt*PIXELRATIO, 0);
    }

    ctx.scale(SCALE, SCALE);

    ctx.imageSmoothingEnabled = true; // true for desktop ... false for mobiles ...

	  ctx.drawPolygons = function(p, x, y, color , strokeColor, strokeWidth){
		    p = p.points;
  			this.save();
  			this.beginPath();
  			this.moveTo(p[0] + x, p[1] + y);
  			for(var i = 2, len = p.length; i < len; i += 2){
  			  this.lineTo(p[i] + x, p[i+1] + y);
  			}
  			this.strokeStyle = strokeColor;
  			this.lineWidth = strokeWidth;
  			this.miterLimit = strokeWidth;
  			this.lineCap = "round";
  			this.lineJoin = "round";
  			this.stroke();
  			this.fillStyle = color;
  			this.fill();
  			this.closePath();
  			this.restore();
	  };

    ctx.drawBackground = function(fill){
        if(fill && typeof(fill) === "object"){
           this.drawImage(fill, -moveAmt, -moveAmt, CANVASWIDTH+2*moveAmt, CANVASHEIGHT+2*moveAmt);

        }else if(fill && typeof(fill) === "string"){
            this.fillStyle = fill;
            this.fillRect(-moveAmt, -moveAmt, CANVASWIDTH+2*moveAmt, CANVASHEIGHT+2*moveAmt);

        }else{
            this.clearRect(-moveAmt, -moveAmt, CANVASWIDTH+2*moveAmt, CANVASHEIGHT+2*moveAmt);
        }
	  };

	  ctx.drawText = function(fillColor, txt_size, align, text, txt_x, txt_y, font, strokeStyle, lw){
			this.fillStyle = fillColor;

			if(font)
         this.font = txt_size+"px "+font+"";
      else
         this.font = txt_size+"px 'SFS'";

      if(strokeStyle && lw){
         this.strokeStyle = strokeStyle;
         this.lineWidth = lw;
         this.miterLimit = Math.round(lw/2);
         this.lineCap = "round";
   			 this.lineJoin = "round";
         this.strokeText(text, txt_x, txt_y);
      }

			this.textAlign = align;
			this.fillText(text, txt_x, txt_y);


	  };

	  ctx.drawAnimatedBlackScreen = function(completionAction){

        this.fillStyle = "rgba(50, 150, 200,"+blackScreenAlpha+")";

        if(blackScreenAlphaDec){
           if(blackScreenAlpha > 0) blackScreenAlpha -= .05;
        }else if(blackScreenAlphaInc){
           if(blackScreenAlpha < 1) blackScreenAlpha += .05;
           if(blackScreenAlpha >= 1){
             if(completionAction){
                GAME.nextState = completionAction;
             }
           }
        }

        if(blackScreenAlpha > 0){
            // if(moveAmt < 0){
      			//    this.fillRect(0, 2*moveAmt, CANVASWIDTH, CANVASHEIGHT-4*moveAmt);
      			// }else{
      			   this.fillRect(-moveAmt, -moveAmt, CANVASWIDTH+2*moveAmt, CANVASHEIGHT+2*moveAmt);
      			// }
        }


    };

    ctx.drawCircle = function(x, y, rad, fill, stroke, lw, start, end){
        if(fill) this.fillStyle = fill;
        if(stroke) this.strokeStyle = stroke;
        if(lw){
          this.lineWidth = lw;
          this.miterLimit = lw;
    			this.lineCap = "round";
    			this.lineJoin = "round";
        }
        let _start = start ? start : 0;
        let _end = end ? end : 2*Math.PI;

        this.beginPath();
        this.arc(x, y, rad, _start, _end);
        if(fill) this.fill();
        if(stroke) this.stroke();
        this.closePath();
    };

	  return ctx;
	})(this.canvas.getContext("2d"));

	document.body.appendChild(this.canvas);
  }

  animate(loop){
    /*
      My old Game Loop
    */
    var rf = (function(){
	  return window.requestAnimationFrame ||
	         window.webkitRequestAnimationFrame ||
  			   window.mozRequestAnimationFrame ||
  			   function(callback, el){
  			      window.setTimeout(callback, 1000/60);
  			   };
  	})();

  	var self = this;
  	var l = function(){
  	  loop();
  	  if(ANIMATION) rf(l, self.canvas);
  	}
  	if(ANIMATION) rf(l, this.canvas);

    /*
      My new Game Loop
    */
    // let timer = new Timer(loop);
    // timer.start();

  }

}

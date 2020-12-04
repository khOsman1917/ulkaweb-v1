var Canvas = Class.extend({

  init: function(cwidth, cheight){
    this.canvas = document.createElement("canvas");
	  canvas = this.canvas;

		s = width / canvasWidth;
		scale = s;

		this.canvas.width = cwidth;
		this.canvas.height = cheight;

		if(height > canvasHeight * s){
		   moveAmt = (height - canvasHeight * s); // devide by 2 for aligning in middle
		}else if(height < canvasHeight * s){
		   downAmt = (height - canvasHeight * s);
		   moveAmt = downAmt;
		}

	  this.canvas.setAttribute('id', 'canvas');
	  this.canvas.setAttribute('screencanvas', 'true');
	  mainHeight = this.canvas.height;

	  this.ctx = (function(ctx){

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
	        if(fill){
			   this.fillStyle = fill;
			}else{
               this.fillStyle = "#2D4466";
            }
		    if(moveAmt < 0){
			   this.fillRect(0, moveAmt, canvasWidth, canvasHeight-2*moveAmt);
			}else{
			   this.fillRect(0, -moveAmt, canvasWidth, canvasHeight+2*moveAmt);
			}
	  };

	  ctx.drawText = function(fillColor, txt_size, align, text, txt_x, txt_y, font){
			this.fillStyle = fillColor;

			this.font = txt_size+"px 'Billo'";

			this.textAlign = align;
			this.fillText(text, txt_x, txt_y);
	  };

	  ctx.drawAnimatedBlackScreen = function(completionAction){

        this.fillStyle = "rgba(45,68,102,"+blackScreenAlpha+")";

        if(blackScreenAlphaDec){
           if(blackScreenAlpha > 0) blackScreenAlpha -= .05;
        }else if(blackScreenAlphaInc){
           if(blackScreenAlpha < 1) blackScreenAlpha += .05;
           if(blackScreenAlpha >= 1){
             if(completionAction){
                _game.nextState = completionAction;
             }
           }
        }

        if(blackScreenAlpha > 0){
           if(moveAmt < 0){
			   this.fillRect(0, moveAmt, canvasWidth, canvasHeight-2*moveAmt);
			}else{
			   this.fillRect(0, -moveAmt, canvasWidth, canvasHeight+2*moveAmt);
			}
        }


    };

	  return ctx;
	})(this.canvas.getContext("2d"));

	document.body.appendChild(this.canvas);
  },

  animate: function(loop){
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
	  if(animation) rf(l, self.canvas);
	}
	if(animation) rf(l, this.canvas);
  }

});

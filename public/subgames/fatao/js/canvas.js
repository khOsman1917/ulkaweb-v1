"use strict";

class Canvas {

  ratioToWidth(){
		accordingToWidth = true;
		scale = width / canvasWidth;

		if(height > canvasHeight * scale){
		   moveAmt = (height - canvasHeight * scale)/2; // devide by 2 for aligning in middle
		}else if(height < canvasHeight * scale){
		   downAmt = (height - canvasHeight * scale)/2;
		   moveAmt = downAmt;
		}
  }

  ratioToHeight(){
		accordingToWidth = false;
		scale = height / canvasHeight;

		if(width > canvasWidth * scale){

		   downAmt = 0;
		   moveAmt = (width - canvasWidth * scale)/2;

		}else if(width < canvasWidth * scale){

		   downAmt = 0;
		   moveAmt = (width - canvasWidth * scale)/2;

		}
  }

  constructor(cwidth, cheight, keepRatio){
    this.canvas = document.createElement("canvas");
	  canvas = this.canvas;

    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.width = width * PIXELRATIO;
    this.canvas.height = height * PIXELRATIO;

    if(keepRatio){
  		 let requiredRatio = canvasWidth / canvasHeight;
  		 let realRatio = width / height;

  		 if(realRatio > requiredRatio){
  		    this.ratioToHeight();
  		 }else{
  		    this.ratioToWidth();
  		 }
	  }else{
		  this.ratioToWidth();
	  }

	  this.canvas.setAttribute('id', 'canvas');
	  mainHeight = this.canvas.height;

	  this.ctx = (function(ctx){

      if(accordingToWidth){
         ctx.setTransform(PIXELRATIO, 0, 0, PIXELRATIO, 0, moveAmt*PIXELRATIO);
      }else{
         ctx.setTransform(PIXELRATIO, 0, 0, PIXELRATIO, moveAmt*PIXELRATIO, 0);
      }

      ctx.scale(scale, scale);

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

	  bgIndex = Math.floor(Math.random()*4);
	  bgIndexPrev = bgIndex > 0 ? bgIndex - 1 : 3;

	  ctx.drawBackground = function(){

		   if(gameBGalpha <= 0.005){
			  gameBGalpha = 1;
			  bgAlphaDec = 1;
			  bgIndexPrev -= bgIndexPrev > 0 ? 1 : -(_bgs.length - 1);
			  bgIndex -= bgIndex > 0 ? 1 : -(_bgs.length - 1);
		   }

		   if(_bgs[bgIndexPrev]) _bgs[bgIndexPrev].draw(this, -2*moveAmt, -2*moveAmt, 0, canvasWidth+4*moveAmt, canvasHeight+4*moveAmt);

		   this.save();
		   this.globalAlpha = gameBGalpha >= 0 ? gameBGalpha : 0;
		   if(_bgs[bgIndex]) _bgs[bgIndex].draw(this, -2*moveAmt, -2*moveAmt, 0, canvasWidth+4*moveAmt, canvasHeight+4*moveAmt);
		   this.restore();
	  };

    ctx.drawBackground2 = function(fill){
			if(fill){
			   this.fillStyle = fill;
			}else{
			   this.fillStyle = "rgba(29,31,45,.7)";
			}

		    this.fillRect(-2*moveAmt, -2*moveAmt, canvasWidth+4*moveAmt, canvasHeight+4*moveAmt);
	  };

	  ctx.clearAll = function(){
			this.clearRect(-2*moveAmt, -2*moveAmt, canvasWidth+4*moveAmt, canvasHeight+4*moveAmt);
  		};

	  ctx.drawText = function(fillColor, txt_size, align, text, txt_x, txt_y, font, strokeColor, lw){
			this.fillStyle = fillColor;
			if(strokeColor) this.strokeStyle = strokeColor;

      this.lineWidth = lw;
			this.miterLimit = lw-2 >= 0 ? lw-2 : 0;
			this.lineCap = "round";
			this.lineJoin = "round";

			this.font = txt_size+"px 'Billo'";

      var yOff = 0; //txt_size/4;

			this.textAlign = align;
			if(strokeColor) this.strokeText(text, txt_x, txt_y-yOff);

      this.fillText(text, txt_x, txt_y-yOff);

      yOff = null;
	  };

    ctx.drawRoundLine = function(x1,y1, x2,y2, color, lw){
      this.strokeStyle = color;
      this.lineWidth = lw;
      this.lineCap = "round";
      this.lineJoin = "round";
      this.beginPath();
      this.moveTo(x1, y1);
      this.lineTo(x2, y2);
      this.stroke();
    };

	  ctx.drawAnimatedBlackScreen = function(completionAction){

        this.fillStyle = "rgba(29,31,45,"+blackScreenAlpha+")";

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
           this.fillRect(-2*moveAmt, -2*moveAmt, canvasWidth+4*moveAmt, canvasHeight+4*moveAmt);
        }


    };

	  return ctx;
	})(this.canvas.getContext("2d"));

	document.body.appendChild(this.canvas);
  }

}

// "use strict";

class AnimateNum{
	constructor(){
	   this.x = null;
	   this.y = null;
	   this.addition = null;
	   this.alphaReduct = null;
	   this.alpha = 1;
     this.size = null;
     this.vy = null;
	   this.active = false;
	}

  set(x, y, addition, alphaReduct, vy, s){
     this.x = x;
     this.y = y;
     this.addition = addition;
     this.alphaReduct = alphaReduct;
     this.vy = vy;
     this.size = s;
     this.alpha = 1;
     this.active = true;
  }

	draw(ctx){

	  ctx.save();

	  ctx.globalAlpha = this.alpha;
	  if(this.alphaReduct && this.vy < .0001) this.alpha -= this.alphaReduct*2;
	  if(this.alpha <= .005){
		   this.active = false;
	  }

	  if(this.addition) ctx.drawText("yellow", this.size, "center", this.addition, this.x, this.y, null, "#8e3e00", 2);

	  ctx.restore();

    if(this.vy) this.y += this.vy;
		this.vy -= this.vy*.25;

	}
}

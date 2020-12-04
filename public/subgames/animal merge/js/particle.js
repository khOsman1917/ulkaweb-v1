// "use strict";

class Particle{

constructor(){
   this.x = null;
   this.y = null;
   this.vx = null;
   this.vy = null;
   this.size = null;
   this.color = null;
   this.lives = null;
   this.reduction = null;
   this.reductionValue = null;
   this.rotation = null;
   this.arc = null;
   this.stroke = null;
   this.strokeStyle = null;
   this.linewidth = null;
   this.alphaReduct = null;
   this.alpha = null;
   this.ang = null;
   this.gravity = 0;

   this.life = null;
   this.maxLife = null;

   this.active = false;
}

set(x, y, vx, vy, size, color, lives, reduction, rotation, reductionValue, arc, stroke, strokeStyle, linewidth, alphaReduct, gravity){
   this.x = x;
   this.y = y;
   this.vx = vx;
   this.vy = vy;
   this.size = size;
   this.color = color;
   this.lives = lives;
   this.reduction = reduction;
   this.reductionValue = reductionValue;
   this.rotation = rotation;
   this.arc = arc;
   this.stroke = stroke;
   this.strokeStyle = strokeStyle;
   this.linewidth = linewidth;
   this.alphaReduct = alphaReduct;
   this.alpha = 1;
   this.ang = 0.9;

   this.life = 0;
   this.maxLife = this.lives;

   this.gravity = Number(gravity);

   this.active = true;
}

update(){
   if(this.active){
		if(this.alphaReduct) this.alpha -= this.alphaReduct;
		if(this.alpha <= .001){
		   // delete particles[this.id];
		   this.active = false;
		}else if(this.alpha >= 1){
		   this.alpha = 1;
		}
		this.x += this.vx;
		this.y += this.vy;
    this.vy += this.gravity;
		this.life++;
		if(this.life >= this.maxLife){
		   // delete particles[this.id];
		   this.active = false;
		}

		if(this.reduction){
		  if(this.reductionValue){
			 this.size -= this.reductionValue;
		  }else{
			 this.size -= .5;
		  }

		  if(this.size <= 0){
			 this.size = 0;
			 // delete particles[this.id];
			 this.active = false;
		  }
		}

	}
}

draw(ctx){
   if(this.active){
	  ctx.save();
	  ctx.globalAlpha = this.alpha >= 0 ? this.alpha : 0;

	  ctx.fillStyle = this.color;
	  if(this.strokeStyle){
		 ctx.strokeStyle = this.strokeStyle;
		 ctx.lineWidth = this.linewidth;
	  }

	  if(!this.arc){
		 ctx.translate(this.x, this.y);
		 if(this.rotation) ctx.rotate(this.ang);
		 ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
		 if(this.stroke) ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
	  }else{

		 ctx.beginPath();
		 ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		   ctx.fill();
		   if(this.stroke) ctx.stroke();
		   ctx.closePath();
	  }

	  ctx.restore();
  }
}

}

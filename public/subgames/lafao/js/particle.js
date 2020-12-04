var particles = {},
    particleIndex = 0;

var Particle = Class.extend({
init: function(x, y, vx, vy, size, color, lives, reduction, rotation, reductionValue, arc, stroke, strokeStyle, linewidth, alphaReduct){
   this.x = x;
   this.y = y;
   this.vx = vx;
   this.vy = vy;
   if(size) this.size = size;
   if(color) this.color = color;
   if(lives) this.lives = lives;
   if(reduction) this.reduction = reduction;
   if(reductionValue) this.reductionValue = reductionValue;
   if(rotation) this.rotation = rotation;
   if(arc) this.arc = arc;
   if(stroke) this.stroke = stroke;
   if(strokeStyle) this.strokeStyle = strokeStyle;
   if(linewidth) this.linewidth = linewidth;
   if(alphaReduct) this.alphaReduct = alphaReduct;
   this.alpha = 1;
   this.ang = 0.9;
   particleIndex++;
   particles[particleIndex] = this;
   this.id = particleIndex;
   this.life = 0;
   this.maxLife = this.lives;
},

update: function(){
    if(this.alphaReduct) this.alpha -= this.alphaReduct;
    if(this.alpha <= .001){
       delete particles[this.id];
    }else if(this.alpha >= 1){
	   this.alpha = 1;
	}
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if(this.life >= this.maxLife){
  	   delete particles[this.id];
    }

    if(this.reduction){
      if(this.reductionValue){
  	     this.size -= this.reductionValue;
  	  }else{
  	     this.size -= .5;
  	  }

  	  if(this.size <= 0){
  	     this.size = 0;
  	     delete particles[this.id];
  	  }
    }
},

draw: function(ctx){
  ctx.save();
  ctx.globalAlpha = this.alpha >= 0 ? this.alpha : 0;

  ctx.fillStyle = this.color;
  if(this.strokeStyle){
     ctx.strokeStyle = this.strokeStyle;
     ctx.lineWidth = this.linewidth;
  }

  if(!this.arc){
    if(this.rotation){
		ctx.translate(this.x+this.size/2, this.y+this.size/2);
		ctx.rotate(this.ang);
		ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
		if(this.stroke) ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
	}else{
	    ctx.fillRect(this.x, this.y, this.size, this.size);
	    if(this.stroke) ctx.strokeRect(this.x, this.y, this.size, this.size);
	}
  }else{

     ctx.beginPath();
     ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	   ctx.fill();
	   if(this.stroke) ctx.stroke();
	   ctx.closePath();
  }

  ctx.restore();
}
});

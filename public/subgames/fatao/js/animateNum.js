"use strict";

class AnimateNum {
constructor(){
   this.x = null;
   this.y = null;
   this.addition = null;
   this.alphaReduct = null;
   this.size = null;
   this.vx = null;
   this.vy = null;
   this.alpha = 0;
   this.active = false;
}

set(x, y, addition, alphaReduct, s, vx, vy){
  this.x = x;
  this.y = y;
  if(addition) this.addition = addition;
  if(alphaReduct) this.alphaReduct = alphaReduct;
  if(s){
     this.size = s;
  }else{
     this.size = 18;
  }

  if(vx) this.vx = vx;
  if(vy) this.vy = vy;

  this.alpha = 1;

  this.active = true;
}

draw(ctx){
  ctx.save();

  ctx.globalAlpha = this.alpha;
  this.alpha -= this.alphaReduct;
  if(this.alpha <= .005){
     this.active = false;
  }

  ctx.drawText("white", this.size, "center", this.addition, this.x, this.y);

  ctx.restore();

  if(this.vx) this.x += this.vx;
  if(this.vy) this.y += this.vy;
}
}

var aniNum = {},
    aniNumIndex = 0;

var AnimateNum = Class.extend({
init: function(x, y, addition, alphaReduct){
   this.x = x;
   this.y = y;
   if(addition) this.addition = addition;
   if(alphaReduct) this.alphaReduct = alphaReduct;
   this.alpha = 1;
   aniNumIndex++;
   aniNum[aniNumIndex] = this;
   this.id = aniNumIndex;
},

draw: function(ctx){
  ctx.save();

  ctx.globalAlpha = this.alpha;
  this.alpha -= this.alphaReduct;
  if(this.alpha <= .005){
     delete aniNum[this.id];
  }

  ctx.drawText("white", 18, "center", this.addition, this.x, this.y);

  ctx.restore();
}
});

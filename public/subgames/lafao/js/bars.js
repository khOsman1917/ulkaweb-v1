var Bar = Class.extend({
   init: function(x, y, unit, updown){
       this.x = x;
	   this.y = y;
	   this.unit = unit;
	   
	   this.updown = updown;
	   
	   this.midPoint = (canvasHeight - moveAmt/scale)/2+25;
	   
	   this.dimension = 17;
	   
	   this.width = this.unit * this.dimension;
	   this.height = this.dimension * 50;
	   
	   this.alpha = 0;
   },
   
   update: function(){
   
   },
   
   draw: function(ctx){
   
       if(this.updown){
	      this.y = animate(60, 5000, this.midPoint, -Math.PI/2);
	   }
       
       this.alpha += this.alpha < 1 ? .05 : 0;
	   
       ctx.save();
	   ctx.globalAlpha = this.alpha;
       ctx.fillStyle = "#747BAA";
	   ctx.fillRect(this.x, this.y, this.width, this.height);
	   ctx.restore();
   }
});
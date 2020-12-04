var Star = Class.extend({
init: function(x, y){
   this.x = x;
   this.y = y;
   
   this.rotation = Math.PI/4;

},

draw: function(ctx){

	ctx.save();

	ctx.translate(this.x, this.y);
	ctx.rotate(this.rotation);
	
	ctx.fillStyle = "rgba(255, 228, 51, .1)";
	ctx.fillRect(-8, -8, 16, 16);
	
	ctx.fillStyle = "yellow";
	ctx.fillRect(-2, -2, 4, 4);

	ctx.restore();

}
});

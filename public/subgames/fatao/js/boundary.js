"use strict";

class Boundary{
   constructor(x, y, w, h, color){
      var options = {
        friction: 0,
        restitution: 1,
        isStatic: true
      };
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      if(color) this.color = color;

      this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, options);
      World.add(_world, this.body);
   }

   draw(ctx){
      var pos = this.body.position;
      var angle = this.body.angle;
      if(this.color){
        ctx.fillStyle = this.color;
      }else{
        ctx.fillStyle = "#ffffff";
      }
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height)
      ctx.restore();
   }

   remove(){
      World.remove(_world, this.body);
   }
}

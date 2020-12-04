"use strict";

class PowerUp {

    constructor(x, y, num, label){

      var options = {
           friction: 0.05,
           restitution: .7,
           isStatic: true
      };

      this.x = x;
      this.y = y;
      this.num = num;
      this.label = label;

      this.img = _circles[5];
      this.fill = "white";

      switch(this.label){

         case 1:
             this.pIcon = pUpIcons[1];
             break;
         case 2:
             this.pIcon = pUpIcons[3];
             break;
         case 3:
             this.pIcon = pUpIcons[4];
             break;
         case 4:
             this.pIcon = pUpIcons[2];
             break;
         // case 5:
         //     this.pIcon = pUpIcons[2];
         //     break;
      }

      this.initialRad = 25;
      this.rad = 5;

      this.life = 2*Math.PI;
      this.lifeDecay = .02;

      // this.body = Bodies.circle(this.x, this.y, this.initialRad, options);
      // this.body.label = "fallingcircle";
      // World.add(_world, this.body);

    }

    draw(ctx){
      if(this.rad < this.initialRad) this.rad += 3;
      if(this.rad >= this.initialRad) this.rad = this.initialRad;

        // var pos = this.body.position;

        // this.x = pos.x;
        // this.y = pos.y;

        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.strokeStyle = this.fill;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
  			ctx.lineJoin = "round";
        if(this.life > 0){
          ctx.save();
          ctx.scale(-1, 1);
          ctx.rotate(-Math.PI/2);
          ctx.beginPath();
          ctx.arc(0,0, this.initialRad + 5, 0, this.life);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
        this.img.draw(ctx, -this.rad, -this.rad, 0, this.rad*2, this.rad*2);

        ctx.drawText("#000000", 15, "center", " "+this.num+" ", 0, -5);
        ctx.drawText("#000000", 15, "center", " "+this.num+" ", 0, -5);

        var _sc = animate(.2, 500, 1, Math.PI/2);
        ctx.translate(0, -7+(this.pIcon.height/5)/2);
        ctx.scale(_sc, _sc);
        this.pIcon.draw(ctx, -(this.pIcon.width/5)/2, -(this.pIcon.height/5)/2, 5);
        _sc = null;
        ctx.restore();

        if(!gamePaused) this.life -= this.lifeDecay;

        // pos = null;
    }

   remove(){
      // World.remove(_world, this.body);
   }

}

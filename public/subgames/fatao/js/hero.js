"use strict";

class Hero {
    constructor(x, y, w, h, yOff){

     var options = {
         friction: 0,
         restitution: 1,
         isStatic: true
     };

	   this.x = x;
	   this.y = y;

     this.reqx = this.x;

	   this.width = w;
	   this.height = h;

     this.ang = 0;
     this.reqAng = 0;
     this.yOff = yOff;

	   this.hasMirror = false;

	   this.particle = [];

	   this.img = _chars[Math.floor(Math.random()*_chars.length)];

	}

	update(){

     // this.iniX = this.x;

     this.x -= (this.x - this.reqx) / 2;
     if(Math.abs(this.x - this.reqx) < .005){
        this.x = this.reqx;
     }

     this.ang += (this.reqAng - this.ang) / 5;

	   if(frames % 5 === 0){
       if(_game.currentState.particlePool.length > 0){
           let __p = _game.currentState.particlePool.pop();
           __p.set(this.x, this.y+5, 0, 2, 10, "rgba(0,0,0,0)", 200, true, false, .35, true, true, "white", 2, null, 0);
           this.particle.push(__p);
       }
	     // if(this.hasMirror) this.particle.push(new Particle(this.x, this.y-5-canvasHeight + 200, 0, -2, 12, "white", 200, true, false, .35, true, null, null, null, null));
     }

     if(this.reqx - this.x < -0.1){
        this.reqAng = -.25;
     }
     else if(this.reqx - this.x > 0.1){
        this.reqAng = .25;
     }
     else{
       this.reqAng = 0;
     }

	}

	draw(ctx){

    for(let i = 0, len = this.particle.length; i < len; i++){
        if(this.particle[i].active){
           this.particle[i].update();
           this.particle[i].draw(ctx);
        }else{
           let __p = this.particle.splice(i, 1);
           _game.currentState.particlePool.push(__p[0]);
           len--;
           i--;
         //  break;
        }
    }

     ctx.save();
     ctx.translate(this.x, this.y);
     ctx.rotate(this.ang);
  	 // ctx.fillStyle = "#92CEE0"; //"#94E092";
  	 // ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);

  	 this.img.draw(ctx, -(this.img.width/6)/2, -(this.img.height/6)/2, 6);
     ctx.restore();

  	 if(this.hasMirror){
  	    ctx.save();
    		ctx.translate(this.x, this.y - canvasHeight + 200-this.yOff);
    		ctx.scale(1, -1);
    		ctx.rotate(this.ang);
    		// ctx.fillStyle = "#92CEE0"; //"#94E092";
    		// ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);

    		this.img.draw(ctx, -(this.img.width/6)/2, -(this.img.height/6)/2, 6);
    		ctx.restore();
  	 }

	}

   remove(){
      // World.remove(_world, this.body);
   }
}

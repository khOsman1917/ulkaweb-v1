"use strict";

class Coin {
  constructor(){
  	  this.x = null;
  		this.y = null;
  		this.xVel = 0;
  		this.yVel = 0;
  		this.gravity = -1.2;
  		this.reqGravity = .25;

  		this.rad = 10;
	}

  set(x, y){
     this.x = x;
     this.y = y;
     this.xVel = 0;
     this.yVel = 0;
     this.gravity = -1.2;
     this.reqGravity = .25;

     this.rad = 10;
  }

	draw(ctx){

	  this.yVel += this.gravity;

		this.x += this.xVel;
		this.y += this.yVel;

		// ctx.fillStyle = "gold";
		// ctx.beginPath();
		// ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
		// ctx.fill();
		// ctx.closePath();

		_coin.draw(ctx, this.x-this.rad, this.y-this.rad, 0, this.rad*2, this.rad*2);

		if(this.gravity < this.reqGravity) this.gravity += .1;

	}
}

"use strict";
let colors = ["#f4d744", "#8cc63f", "#009fde", "#ed1e79", "#993eba"];

class FallingCircle {

    constructor(){
       this.x = 0;
       this.y = 0;
       this.num = 0;
       this.fill = colors[0];
       this.img = _circles[0];
	    this.initialRad = 5;
       this.rad = 5;
       this.xVel = 0;
       this.yVel = 0;
       this.rot = 0;
       this.inc = 0;
       this.bossImg = null;
       this.isBoss = false;
       this.blink = false;
       this.thresholdScore = 0;
    }

    set(x, y, num, spd, irad, bossImg, tscore){
        this.x = x;
        this.y = y;
        this.num = num;

        var rnum = Math.floor(Math.random()*colors.length);

        this.fill = colors[rnum];

        this.img = _circles[rnum];

        rnum = null;

        this.initialRad = irad;
        this.rad = 5;

        this.xVel = 0;
        this.yVel = spd;
        this.rot = 0;
        this.inc = Math.random() > .5 ? .07 : -.07;

        if(bossImg){
           this.bossImg = bossImg;
           this.isBoss = true;
        }
        else{
           this.bossImg = null;
           this.isBoss = false;
        }

        this.blink = false;
        if(tscore){
           this.thresholdScore = tscore;
           this.isBoss = true;
        }
        
    }

    draw(ctx){

	  if(this.rad < this.initialRad) this.rad += 3;
	  if(this.rad >= this.initialRad) this.rad = this.initialRad;

	  if(this.y > canvasHeight/2 && this.yVel > .65) this.yVel -= .02;

    this.xVel -= this.xVel / 3;

    if(this.yVel > 2.25) this.yVel = 2.25;
    if(this.yVel < -2.5) this.yVel = -2.5;
    if(this.yVel <= .65) this.yVel += .01;

    if(this.y < 50 && this.yVel <= 0) this.yVel = this.isBoss ? 1 : 2;


      if(!gamePaused){
         this.x += this.xVel;
         this.y += this.yVel;
      }

      ctx.save();
      if(this.blink) ctx.globalAlpha = animate(.15, 300, .85, -Math.PI/2);
      if(this.blink) ctx.drawText(this.fill, 20, "center", " . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ", canvasWidth/2, _game.currentState.hero.y);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);

      if(this.img.width > 0) this.img.draw(ctx, -this.rad, -this.rad, 0, this.rad*2, this.rad*2);

      if(this.isBoss){
         if(this.bossImg) drawRoundImage(ctx, this.bossImg, Math.round(this.rad*1.7), 0, 0);
         // ctx.drawText(this.fill, 16, "center", " "+this.num+" ", 0, 5, null, "#FFFFFF", 4);
      }else{
         ctx.drawText("#ffffff", 16, "center", " "+this.num+" ", 0, 5);
      }

      ctx.restore();

      this.rot += this.isBoss ? this.inc*.5 : this.inc;
      if(Math.abs(this.rot) >= 2*Math.PI) this.rot = 0;

      // pos = null;

      if(this.x < this.rad){
         this.x = this.rad;
         this.xVel += .5;
      }
      if(this.x > canvasWidth-this.rad){
         this.x = canvasWidth-this.rad;
         this.xVel -= .5;
      }

      if(this.y > canvasHeight/2 + 60) this.blink = true;

    }

}

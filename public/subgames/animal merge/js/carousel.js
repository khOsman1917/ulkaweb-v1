// "use strict";

class Carousel {

   constructor(elements){
        this.fl = 300;
    		this.cards = [];
    		this.numCards = elements.length;
    		this.centerZ = 300;
    		this.radius = 350;
    		this.baseAngle = -Math.PI/2;
    		this.temp_baseAngle = this.baseAngle; // - selectedIndex*Math.PI/(this.numCards/2);
    		this.rotate = true;
    		this.rotationSpeed = 0.01;

    		for(var i = 0; i < this.numCards; i++){
      			var card = {
        				y: 0,
        				angle: Math.PI * 2 / this.numCards * i,
        				img: elements[i]
      			};

      			card.x = Math.cos(card.angle + this.baseAngle) * this.radius;
      			card.z = this.centerZ + Math.sin(card.angle + this.baseAngle) * this.radius;

      			// console.log(card.z);

      			this.cards.push(card);

      			card = undefined;
    		}
   }

   zSort(a, b){
        return b.z - a.z;
   }

   rotateRight(){
        this.temp_baseAngle += Math.PI/(this.numCards/2);
		    this.rotate = true;
   }

   rotateLeft(){
        this.temp_baseAngle -= Math.PI/(this.numCards/2);
		    this.rotate = true;
   }

   update(){
        if(this.rotate){
  			   this.baseAngle -= (this.baseAngle - (this.temp_baseAngle))/10;
  			   if(Math.abs(this.baseAngle - this.temp_baseAngle) < .001){
    			    this.baseAngle = this.temp_baseAngle;
    			    this.rotate = false;

    			    // console.log(this.baseAngle);
  			   }
		    }
   }

   draw(ctx){
      ctx.save();

		  ctx.translate(canvasWidth/2, (canvasHeight - moveAmt/scale)/2 - 80);

  		this.cards.sort(this.zsort);

  		for(var i = 0; i < this.numCards; i++){
    			var card = this.cards[i],
    				  perspective = this.fl / (this.fl + card.z);

    			ctx.save();
    			ctx.scale(perspective/1.7, perspective/1.7);
    			ctx.translate(card.x, card.y);

    			ctx.translate(-(card.img.width/.5)/2, -(card.img.height/.5)/2);

    			var __a = map(card.z, -100, 500, 0, 1);

    			if(__a <= 0) __a = 0;
    			if(__a >= 1) __a = 1;

    			ctx.globalAlpha = 1 - __a;

    			__a = undefined;

    			card.img.draw(ctx, 0 , 0, .5);

    			if(!this.rotate && i === 4){
    			   // ctx.fillStyle = "rgba(70,70,70,1)";
    			   // ctx.fillRect(0, card.img.height - 33, card.img.width, 33);
    			   // if(stageLocked[stageIndex].stage === 1){
    				  // ctx.drawText("rgba(255, 255, 255, 1)", 16.5, "center", stageNames[stageIndex], card.img.width/2 - 2, card.img.height - 10, true);
    			   // }else{
    				  // ctx.drawText("rgba(255, 255, 255, 1)", 16.5, "center", "LOCKED", card.img.width/2 - 2, card.img.height - 10, true);
    			  // }
    			}



    			ctx.restore();

    			card.x = Math.cos(card.angle + this.baseAngle) * this.radius;
    			card.z = this.centerZ + Math.sin(card.angle + this.baseAngle) * this.radius;

    			card = undefined; perspective = undefined;
  		}

  		ctx.restore();
   }
}

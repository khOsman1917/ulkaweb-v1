// "use strict";

class _Window{
     constructor(img, btnz, txtz){
         this.windowImage = img;
         this.width = 320;
         this.imgScale = this.windowImage.width / this.width;
         this.height = this.windowImage.height / this.imgScale;

         this.x = (CANVASWIDTH - this.width)/2;
         this.y = (CANVASHEIGHT - this.height)/2;

         this.buttons = btnz;
         this.texts = txtz;

         this.bounceY = {"val": -100};
         this.alpha = {"val": 0};

         this.alphaTween = new TWEEN.Tween(this.alpha);

         this.yTween = new TWEEN.Tween(this.bounceY);

         this.active = false;

         this.iniTime = (new Date()).getTime();
         this.startTime = null;

         this.responsive = false;
     }

     fadeIn(){
        this.startTime = (new Date()).getTime();

        this.active = true;
        this.alphaTween.to({"val": 1}, 300).interpolation( TWEEN.Interpolation.Bezier ).start();

        this.yTween.to({"val": 0}, 700).easing(TWEEN.Easing.Bounce.Out).start();
     }

     fadeOut(){
        this.alphaTween.to({"val": 0}, 250).start();

        this.yTween.to({"val": -100}, 700).start();

        // setTimeout(()=>{
          this.startTime = this.iniTime;
        // }, 700);
     }

     draw(ctx){
         if(this.alpha.val > 0){
             ctx.save();
             ctx.globalAlpha = this.alpha.val;
             ctx.drawBackground("rgba(50, 150, 200, .90)");
             ctx.translate(0, this.bounceY.val);
             this.windowImage.draw(ctx, this.x, this.y, this.imgScale);

             for(let i = 0; i < this.buttons.length; i++){
                 if(this.responsive) this.buttons[i].update();
                 this.buttons[i].draw(ctx);
             }

             for(let i = 0; i < this.texts.length; i++){
                 let txt = this.texts[i];
                 let stroke = txt.stroke ? txt.stroke : null, lw = txt.lw ? txt.lw : null;
                 ctx.drawText(txt.color, txt.size, txt.align, txt.text, txt.x, txt.y, null, stroke, lw);
             }

             ctx.restore();

             this.active = !GAME.currentState.mascot.active;
         }else{
             this.active = false;
         }

     }
}

class SpecialWindow extends _Window {
   constructor(img, srPos, btnz, txtz){
      // let img = uiElem.rewardWindow;
      super(img, btnz, txtz);

      this.spcImg = null;
      this.sr1 = uiElem.sunRay_1;
      this.sr2 = uiElem.sunRay_2;

      this.srRotation = 0;
      this.srPos = srPos;

      this.nbScale = 2.2 * assetsScale[assetsIndex];

   }

   set(img){
      this.spcImg = img;
   }

   draw(ctx){
       super.draw(ctx);

       if(this.alpha.val > 0){
           ctx.save();
           ctx.globalAlpha = this.alpha.val;
           ctx.translate(0, this.bounceY.val);

           ctx.translate(this.srPos.x, this.srPos.y);
           ctx.save();
           ctx.rotate(this.srRotation);
           this.sr1.draw(ctx, -312/2, -312/2, null, 312, 312);
           ctx.restore();

           ctx.save();
           ctx.rotate(-this.srRotation);
           this.sr1.draw(ctx, -260/2, -260/2, null, 260, 260);
           ctx.restore();



           if(this.spcImg){
              if(this.spcImg.height/(2*this.nbScale) > 80) this.nbScale = this.spcImg.height/(2*150);
              if(this.spcImg.width/(2*this.nbScale) > 65) this.nbScale = this.spcImg.width/(2*90);
              this.spcImg.draw(ctx, -this.spcImg.width/(this.nbScale*2), -this.spcImg.height/(this.nbScale*2), this.nbScale);
           }

           ctx.restore();

           this.srRotation += .02;
       }
   }
}

class GiftWindow extends _Window {
   constructor(btnz, txtz, isGift){
      let img = uiElem.rewardWindow;
      super(img, btnz, txtz);

      this.spcImg = null;
      this.sr1 = uiElem.sunRay_1;
      this.sr2 = uiElem.sunRay_2;

      this.srRotation = 0;

      this.blurBuildingY = this.y+191;
      this.spinCount = 0;

      this.s = 2.2 * assetsScale[assetsIndex];
      this.maxH = 70;
      this.maxW = 50;

      this.func = null;

      this.endCall = 0;

      this.blurImg = null;

      this.isGift = isGift;

      this.spcTxt = null;

      // if(this.buttons[1]) this.buttons[1].active = false;
      // if(this.buttons[2]) this.buttons[2].active = false;

   }

   set(img){
      this.spcImg = img;
      this.blurImg = blurImg;

   }

   fadeIn(){
      super.fadeIn();
      if(this.isGift && GAME_DATA[3].sound) circleMidle.play();
   }

   fadeOut(){
      if(this.isGift){
          this.blurBuildingY = this.y+191;
          this.spinCount = -4;
          this.func = null;
          this.texts[1].text = "";
          this.texts[2].text = "";

          switch (this.endCall) {
            case 1:
              GAME.currentState.hexprogress.set();
              break;
            case 2:
              GAME.currentState.generateEarnedCoins(CANVASWIDTH/2, CANVASHEIGHT/2 - 45, (GAME.currentState.moneyPerSec * 300)/10);
              break;
          }

          this.endCall = 0;
          if(GAME_DATA[3].sound) addGiftSound.play();
      }
      super.fadeOut();

   }

   draw(ctx){
       super.draw(ctx);

       if(this.alpha.val > 0){
           ctx.save();
           ctx.globalAlpha = this.alpha.val;
           ctx.translate(0, this.bounceY.val);
           ctx.save();

           ctx.beginPath();
           ctx.rect(CANVASWIDTH/2-62, this.y+112+this.bounceY.val, 124, 160);
           ctx.fillStyle = "rgba(255, 255, 255, "+this.alpha.val+")";
           ctx.fill();
           ctx.closePath();
           ctx.clip();

          // ctx.translate(0, this.bounceY.val);

           if(this.spinCount >= 10){

               if(typeof this.func === "function") this.func();

               ctx.translate(CANVASWIDTH/2, CANVASHEIGHT/2 - 45);
               ctx.save();
               ctx.rotate(this.srRotation);
               this.sr1.draw(ctx, -312/2, -312/2, null, 312, 312);
               ctx.restore();

               ctx.save();
               ctx.rotate(-this.srRotation);
               this.sr1.draw(ctx, -250/2, -250/2, null, 250, 250);
               ctx.restore();

               if(this.maxH && this.spcImg.height/(2*this.s) > this.maxH) this.s = this.spcImg.height/(2*this.maxH);
               if(this.maxW && this.spcImg.width/(2*this.s) > this.maxW) this.s = this.spcImg.width/(2*this.maxW);

               if(this.spcImg) this.spcImg.draw(ctx, -this.spcImg.width/(this.s*2), -this.spcImg.height/(this.s*2), this.s);

           }else{
               // if(this.blurImg) this.blurImg.draw(ctx, (CANVASWIDTH-99)/2, this.blurBuildingY+this.bounceY.val-66, null, 99);
               if(this.blurImg) ctx.drawImage(this.blurImg, (CANVASWIDTH-99)/2, this.blurBuildingY+this.bounceY.val-66, 100, 125);

               this.blurBuildingY -= 30;

               if(this.blurBuildingY < this.y + 90){
                  this.blurBuildingY = this.y + 292;
                  this.spinCount++;
                  if(this.spinCount === 9){
                      if(this.isGift && GAME_DATA[3].sound) winSound.play();
                      circleMidle.pause();
                  }
               }

               this.buttons[0].active = false;
               if(this.buttons[1]) this.buttons[1].active = false;
               if(this.buttons[2]) this.buttons[2].active = false;
           }

           ctx.restore();

           if(this.spcTxt) ctx.drawText(this.spcTxt.color, this.spcTxt.size, this.spcTxt.align, this.spcTxt.text, this.spcTxt.x, this.spcTxt.y, null, this.spcTxtstroke, this.spcTxt.lw);

           uiElem.rewardWindowOver.draw(ctx, (CANVASWIDTH-134)/2, this.y+108+this.bounceY.val, null, 134);

           ctx.restore();
           this.srRotation += .02;
      }
   }
}

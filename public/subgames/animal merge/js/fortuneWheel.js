// "use strict";

class FortuneWheel {
   constructor(){
      this.x = CANVASWIDTH/2;
      this.y = CANVASHEIGHT/2+30;

      let rand = Math.random(),
      ang = (rand < .3) ? 0 : ((rand >= .3 && rand < .7) ? Math.PI/2 : -Math.PI/2);

      this.rotation = {"val": ang};
      this.rotTween = new TWEEN.Tween(this.rotation);

      this.alpha = {"val": 0};
      this.alphaTween = new TWEEN.Tween(this.alpha);

      this.exitY = {"val": CANVASHEIGHT/2 + 150};
      this.tokens = 3;

      this.spinBtn = new Button(this.x, this.y-10, 90, 113, uiElem.spin, null, true, ()=>{
          this.rotateWheel();
      }, false);

      this.exitYtween = new TWEEN.Tween(this.exitY);

      this.inviteButton = new Button(CANVASWIDTH/2 - 45, this.exitY.val, 170, 51, uiElem.inviteBtntemp, uiElem.inviteBtntemp, true, ()=>{
          // inviteFriend(()=>{
             this.tokens = 2;
          // });
      }, false);
      this.inviteButton.setText("Token Left : 05", 0, 5, 20, "center", "#FFFFFF");

      let action = () => {
          this.fadeOut();
      };

      this.exitButton = new Button(CANVASWIDTH/2 + 100, this.exitY.val, 61, 49, uiElem.exitBtn_1, null, true, action, false);

      this.earnedCoins = [];

      this.active = false;

      // 0 - Math.PI/2 -> 1,
      // Math.PI/2 - Math.PI/2 -> 1,
   }

   generateEarnedCoins(x, y, inc){
       for(let i = 0; i < 10; i++){
         let ec = new EarnedCoin(x, y, inc);
         this.earnedCoins.push(ec);
       }
   }

   fadeIn(){
      this.tokens = 3;
      this.active = true;
      this.alphaTween.to({"val": 1}, 300).interpolation( TWEEN.Interpolation.Bezier ).start();

      this.exitYtween.to({"val": CANVASHEIGHT/2 + 250}, 700).easing(TWEEN.Easing.Bounce.Out).delay(200).start();
   }

   fadeOut(){
      this.alphaTween.to({"val": 0}, 250).start();

      this.exitYtween.to({"val": CANVASHEIGHT/2 + 150}, 1200).easing(TWEEN.Easing.Bounce.Out).delay(200).start();
   }

   rotateWheel(){
      if(this.tokens > 0){
          if(GAME_DATA[3].sound) circleMidle.play();
          this.tokens--;
          this.spinBtn.responsive = false;
          let rVal = 14 + Math.floor(Math.random()*5), ang = this.rotation.val + rVal*(Math.PI/2);
          this.rotTween.to({"val": ang}, 4000).easing( TWEEN.Easing.Cubic.Out ).start().onComplete(()=>{
            this.spinBtn.responsive = true;
            let money = 0;
            if(Math.floor(this.rotation.val % (2*Math.PI)) == 0 || Math.floor((2*Math.PI))) money = 0;
            if(Math.floor(this.rotation.val % (2*Math.PI)) == Math.floor(Math.PI/2)) money = 100;
            if(Math.floor(this.rotation.val % (2*Math.PI)) == Math.floor(Math.PI)) money = 200;
            if(Math.floor(this.rotation.val % (2*Math.PI)) == Math.floor((3*Math.PI)/2)) money = 500;

            for(let i = 0; i < Math.floor(money/100); i++) this.generateEarnedCoins(CANVASWIDTH/2 - 40, CANVASHEIGHT/2 - 70, (GAME.currentState.moneyPerSec * 100)/10);

            // if(this.tokens === 0) this.fadeOut();
            circleMidle.stop();
            if(money > 0){
              if(GAME_DATA[3].sound) winSound.play();
              if(GAME_DATA[3].sound) addGiftSound.play();
            }else{
              if(GAME_DATA[3].sound) landLessSound.play();
            }


            console.log("Done "+Math.floor(this.rotation.val % (2*Math.PI))+" "+money);
          });
      }
   }

   draw(ctx){
      if(this.alpha.val > 0){
          ctx.save();

          ctx.globalAlpha = this.alpha.val;
          ctx.drawBackground("rgba(0, 0, 0, .75)");

          uiElem.wheel_bg.draw(ctx, this.x-(uiElem.wheel_bg.width/uiElem.wheel_bg.scale)/2-2, this.y-(uiElem.wheel_bg.height/uiElem.wheel_bg.scale)-42, null, 300);

          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation.val);
          uiElem.wheel.draw(ctx, -(uiElem.wheel.width/uiElem.wheel.scale)/2, -(uiElem.wheel.height/uiElem.wheel.scale)/2, null, 320);
          ctx.restore();

          this.spinBtn.update();
          this.spinBtn.draw(ctx);

          this.inviteButton.update();
          this.inviteButton.y = this.exitY.val;
          if(this.tokens > 0){
             this.inviteButton.responsive = false;
             this.inviteButton.setText("Token Left : 0"+this.tokens, 0, 5, 20, "center", "#FFFFFF");
          }else{
            this.inviteButton.responsive = true;
            this.inviteButton.setText("Invite for more", 0, 5, 20, "center", "#FFFFFF");
          }
          this.inviteButton.draw(ctx);

          this.exitButton.update();
          this.exitButton.y = this.exitY.val;
          this.exitButton.draw(ctx);

          if(this.spinBtn.responsive && this.tokens > 0){
            ctx.save();
            ctx.translate(this.spinBtn.x+5, this.spinBtn.y+20);
            let _s = animate(.1, 700, 1, Math.PI/2, 0);
            ctx.scale(_s, _s);
            uiElem.arm.draw(ctx, 0,0, 2);
            ctx.restore();
          }
          if(this.tokens <= 0){
              ctx.save();
              ctx.translate(this.inviteButton.x+25, this.inviteButton.y+15);
              let _s = animate(.1, 700, 1, Math.PI/2, 0);
              ctx.scale(_s, _s);
              uiElem.arm.draw(ctx, 0,0, 2);
              ctx.restore();
          }

          uiElem.moneyBack.draw(ctx, CANVASWIDTH / 2 - 150, 20 -GAME.currentState.btnYOffset, null, 145);

          uiElem.moneyPerMinBack.draw(ctx, CANVASWIDTH / 2 + 5, 20 -GAME.currentState.btnYOffset, null, 145);

          ctx.drawText("#555555", 22, "center", numToString(GAME.currentState.money, 2), CANVASWIDTH / 2 - 67, 42 -GAME.currentState.btnYOffset);
          ctx.drawText("#555555", 22, "center", numToString(GAME.currentState.moneyPerSec * GAME.currentState.incomeFactor, 2), CANVASWIDTH / 2 + 89, 42 -GAME.currentState.btnYOffset);

          ctx.restore();
      }

      for(let i = 0; i < this.earnedCoins.length; i++){
          let ec = this.earnedCoins[i];
          ec.draw(ctx);

          if(ec.done){
             TWEEN.remove(ec.posTween);
             this.earnedCoins.splice(i, 1);
          }
      }

      if(this.alpha.val > 0 && !GAME.currentState.msgWindowActive){
         this.active = true;
      }else{
         this.active = false;
      }
   }
}

// "use strict";

class Mascot{
    constructor(){
        this.initX = -500;
        this.x = {"val": this.initX};
        this.y = accordingToWidth == true ? CANVASHEIGHT + moveAmt : CANVASHEIGHT;

        this.s = 1;
        this.imgScale = 6;

        this.alpha = {"val": 0};

        this.alphaTween = new TWEEN.Tween(this.alpha);
        this.xTween = new TWEEN.Tween(this.x);

        this.msgBoxAlpha = {"val": 0};
        this.msgBoxTween = new TWEEN.Tween(this.msgBoxAlpha);
        this.msgBoxScale = 1.8;

        this.tapToSkipAplha = {"val": 0};
        this.tapToSkipTween = new TWEEN.Tween(this.tapToSkipAplha);

        this.msgBoxPos = {"x": 40, "y": this.y - 130};

        this.msgAlpha = {"val": 0};
        this.msgAlphaTween = new TWEEN.Tween(this.msgAlpha);

        this.msgTxtz = ["","",""];

        this.proceed = true;
        this.active = false;

        this.reqMsg = {
           "nullTxt": ["", "", ""],
           "welcomeTxt": ["Hi, I\'m bibi ...", "welcome to my", "jungle. let\'s explore !"],
           "giftTxt": ["surprise !!", "i have a gift for you.", "collect it ..."],
           "x2Txt": ["Amazing !", "Time to earn double.", "let\'s do it."],
           "shopTxt": ["Hey "+PLAYER.name+", great job !", "you have enough coins to", "buy pets from shop"],
           "spinTxt": [""+PLAYER.name+", spin", "the fortune wheel and", "try your luck"]
        };

        // this.fadeIn();
    }

    getRidOf(){
      this.setMsg(this.reqMsg.nullTxt);
      this.fadeOut(()=>{});
    }

    greetUser(){
       // this.setMsg(this.reqMsg.welcomeTxt);
       this.fadeIn(()=>{
         this.setMsg(this.reqMsg.welcomeTxt);
         // setTimeout(()=>{
         //    if(this.proceed) this.setMsg(this.reqMsg.introTxt);
         // }, 2000);
         // setTimeout(()=>{
         //    if(this.proceed) this.getRidOf();
         // }, 4750);
       });

    }

    announceShop(){
        this.fadeIn(()=>{
          this.setMsg(this.reqMsg.shopTxt);
          // setTimeout(()=>{
          //    if(this.proceed) this.getRidOf();
          // }, 3000);
        });
    }

    announceGift(){
        this.fadeIn(()=>{
          this.setMsg(this.reqMsg.giftTxt);
          // setTimeout(()=>{
          //    if(this.proceed) this.getRidOf();
          // }, 3000);
        });
    }

    announceX2(){
        this.fadeIn(()=>{
          this.setMsg(this.reqMsg.x2Txt);
          // setTimeout(()=>{
          //    if(this.proceed) this.getRidOf();
          // }, 3000);
        });
    }

    announceSpin(){
        this.fadeIn(()=>{
          this.setMsg(this.reqMsg.spinTxt);
          // setTimeout(()=>{
          //    if(this.proceed) this.getRidOf();
          // }, 3000);
        });
    }

    announceCity(){
        this.fadeIn(()=>{
          this.setMsg(this.reqMsg.newcityTxt);
          // setTimeout(()=>{
          //    if(this.proceed) this.getRidOf();
          // }, 3000);
        });
    }

    fadeIn(func){
       this.xTween.to({"val": 220}, 600).interpolation(TWEEN.Interpolation.Bezier).start().onComplete(()=>{
           if(this.x.val > 0){
              this.msgBoxTween.to({"val": 1}, 300).interpolation(TWEEN.Interpolation.Bezier).start();
              this.tapToSkipTween.to({"val": 1}, 1000).interpolation(TWEEN.Interpolation.Bezier).start();
              if(func) func();
           }
       });
       this.alphaTween.to({"val": 1}, 500).interpolation(TWEEN.Interpolation.Bezier).start();
       this.active = true;
    }

    fadeOut(func){
       this.msgBoxTween.to({"val": 0}, 250).interpolation(TWEEN.Interpolation.Bezier).start().onComplete(()=>{
            if(this.msgBoxAlpha.val < .5){
                this.xTween.to({"val": this.initX}, 1000).interpolation(TWEEN.Interpolation.Bezier).start();
                this.alphaTween.to({"val": 0}, 500).interpolation(TWEEN.Interpolation.Bezier).start();
                this.active = false;
                if(func) func();
            }
       });
       this.tapToSkipAplha.val = 0;
    }

    setMsg(txtArr){

       this.msgAlphaTween.to({"val": 0}, 200).interpolation(TWEEN.Interpolation.Bezier).start().onComplete(()=>{
           if(this.msgAlpha.val === 0){
               this.msgTxtz[0] = txtArr[0];
               this.msgTxtz[1] = txtArr[1];
               this.msgTxtz[2] = txtArr[2];

               this.msgAlphaTween.to({"val": 1}, 200).interpolation(TWEEN.Interpolation.Bezier).start();
           }
       });

    }

    draw(ctx){
        ctx.save();
        ctx.globalAlpha = this.alpha.val;
        ctx.drawBackground("rgba(50, 150, 200, .90)");
        ctx.translate(this.x.val, this.y);
        ctx.scale(this.s, 1);
        // uiElem.mascot.draw(ctx, 0, -uiElem.mascot.height/this.imgScale, this.imgScale);
        ctx.drawImage(mascotImg, -1.5*(mascotImg.width/this.imgScale), -.75*(mascotImg.height/this.imgScale), mascotImg.width/this.imgScale, mascotImg.height/this.imgScale);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = this.tapToSkipAplha.val;
        ctx.drawText("#FFFFFF", 30, "center", "tap to skip", CANVASWIDTH/2, CANVASHEIGHT/2 - 150);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = this.msgBoxAlpha.val;
        ctx.translate(this.msgBoxPos.x, this.msgBoxPos.y);
        uiElem.txtbox.draw(ctx, 0, 0, this.msgBoxScale);

          ctx.save();
          ctx.globalAlpha = this.msgAlpha.val;
          ctx.drawText("#9c1e48", 20, "center", this.msgTxtz[0], uiElem.txtbox.width/(2*this.msgBoxScale), 35);
          ctx.drawText("#9c1e48", 20, "center", this.msgTxtz[1], uiElem.txtbox.width/(2*this.msgBoxScale), 60);
          ctx.drawText("#9c1e48", 20, "center", this.msgTxtz[2], uiElem.txtbox.width/(2*this.msgBoxScale), 85);
          ctx.restore();

        ctx.restore();
    }
}

// "use strict";

class Building {
   constructor(x,y){
       this.reqY = y-5;
       this.x = x;
       this.y = {"val": y-100};

       this.yTween = new TWEEN.Tween(this.y);
       this.yTweenDone = false;

       this.alpha = {"val": 0};
       this.alphaTween = new TWEEN.Tween(this.alpha);

       this.img = null;
       this.imgSprite = new SpriteAnim(animalList[0],0,0,0,1,-.5,-1);
       this.imgSprite.speed = 2; // the less the faster
       this.s = 1;
       this.val = -2;

       // this.imglist = [greenIslandsBuildings, nightLondonBuildings, chinaTownBuildings];
       this.imgUilist = newWorldElem;

       this.rotation = Math.random() > .5 ? {"val": .5} : {"val": -.5};
       this.rotTween = new TWEEN.Tween(this.rotation);
       this.rotTween2 = new TWEEN.Tween(this.rotation);

       this.scale = {"val": 1};
       this.mergeScale = {"val": 0};
       this.scaleTween = new TWEEN.Tween(this.scale);
       this.mscaleTween = new TWEEN.Tween(this.mergeScale);

       this.maxW = null;
       this.maxH = null;
       this.hasScaled = false;
       this.hasRotated = false;

       this.fadeIn();
   }

   createSprites(){

   }

   fadeIn(){
      this.alphaTween.to({"val": 1}, 200).interpolation(TWEEN.Interpolation.Bezier).start();

      if(this.val >= 0) this.scaleUp();
      if(this.val < 0) this.rotateAnim();

      this.yTween.to({"val": this.reqY}, 500).easing(TWEEN.Easing.Bounce.Out).start().onComplete(() => {this.yTweenDone = true;});
   }

   scaleUp(){
      this.hasScaled = true;
      this.scaleTween.to({"val": [1, 1.1, .9, 1]}, 1500).easing(TWEEN.Easing.Cubic.In).start().delay(700).onComplete(()=>{
            this.scaleUp();
            this.showEconomy();
      });
   }

   showEconomy(){
       if(GAME.currentState.aniNumPool.length > 0 && GAME.currentState.playGround.tiles[0].img){
         let a = GAME.currentState.aniNumPool.pop(), income = MoneyIncomes[GAME.currentState.city][this.val+1],
             s = GAME.currentState.playGround.tiles[0].img.scale / assetsScale[assetsIndex];
         a.set(this.x, this.y.val - this.img.height/(2.5*this.s), numToString(income, 0, 1), .01, -12/s, 55/s);
         GAME.currentState.aniNum.push(a);
       }
   }

   rotateAnim(){
      this.hasRotated = true;
      this.rotTween.to({"val": 0}, 500).interpolation(TWEEN.Interpolation.Bezier).start().onComplete(() => {
          this.rotAnimC();
      });
   }

   rotAnimC(){
     this.rotTween2.to({"val": [0, -.1, .1, -.1, .1, -.1, .1, 0]}, 1000).easing(TWEEN.Easing.Linear.None).start().repeat(Infinity).delay(1500);
   }

   mergeAnim(){
       let mp = new MagicStar(this.x, this.y.val, this.val+2);
       GAME.currentState.magicParticles.push(mp);

       this.mscaleTween.to({"val": [0, .8, 0]}, 500).interpolation(TWEEN.Interpolation.Bezier).start();
       // this.sunRayAlphaTween.to({"val": [1, 0]}, 500).interpolation(TWEEN.Interpolation.Bezier).start();
       // this.sunRayRotTween.to({"val": [0, 2*Math.PI, 0]}, 500).interpolation(TWEEN.Interpolation.Bezier).start();
   }

   set(x, y, s, val, mw, mh){
       this.x = Math.round(x);
       this.reqY = Math.round(y-5); // for the drop effect ...
       this.s = s * assetsScale[assetsIndex];
       this.val = val;
       this.maxW = mw;
       this.maxH = mh;

       if(Math.abs(this.y.val - this.reqY) > 0 && this.yTweenDone){
          this.y.val = this.reqY;
       }

       if(this.val >= 0 && !this.hasScaled){
          this.scaleUp();
          if(this.hasRotated){
             TWEEN.remove(this.rotTween);
             TWEEN.remove(this.rotTween2);
             this.rotation.val = 0;
          }
       }

       this.setImg();
   }

   removeTweens(){
        TWEEN.remove(this.yTween);
        TWEEN.remove(this.scaleTween);
        TWEEN.remove(this.alphaTween);
        TWEEN.remove(this.rotTween);
        TWEEN.remove(this.rotTween2);
        TWEEN.remove(this.sunRayRotTween);
        TWEEN.remove(this.sunRayRotTween);
        // this.clearTimeOuts();
        // console.log("Tweens Removed");
   }

   setImg(){
       // Set Building Image according to current value ...
       switch (this.val) {
         case -2.5:
           this.img = this.imgUilist.box2;
           break;
         case -2:
           this.img = this.imgUilist.box;
           break;
         case -1:
           this.img = this.imgUilist.gift;
           break;
         default:
           // this.img = this.imglist[GAME.currentState.city][this.val];
           this.img = animalList[this.val][0];
           this.imgSprite.imgData = animalList[this.val];
           break;
       }
   }

   draw(ctx){

       if(this.x && this.y && this.img){
           if(this.maxH && this.img.height/(2*this.s) > this.maxH) this.s = this.img.height/(2*this.maxH);
           if(this.maxW && this.img.width/(2*this.s) > this.maxW) this.s = this.img.width/(2*this.maxW);

           ctx.save();
           ctx.globalAlpha = this.alpha.val;



           if(this.val >= 0){
               ctx.translate(this.x, this.y.val + this.img.height/(2*this.s));
               ctx.scale(this.scale.val + this.mergeScale.val, (1/this.scale.val) + this.mergeScale.val);
               this.imgSprite.update(0,0);
               this.imgSprite.draw(ctx, this.s);
           }else{
               ctx.translate(this.x, this.y.val + this.img.height/(2*this.s));
               ctx.rotate(this.rotation.val);
               let scale = this.s;
               if(this.val === -1) scale = this.s*1.1;
               this.img.draw(ctx, -this.img.width/(2*scale), -this.img.height/(scale), scale);
           }
           ctx.restore();
       }
   }

   drawDrag(ctx, x, y){
      if(this.maxH && this.img.height/(2*this.s) > this.maxH) this.s = this.img.height/(2*this.maxH);
      this.img.draw(ctx, x-this.img.width/(2*this.s), y-this.img.height/(2*this.s), this.s);
      // this.imgSprite.update(x,y);
      // this.imgSprite.draw(ctx, this.s);
   }
}

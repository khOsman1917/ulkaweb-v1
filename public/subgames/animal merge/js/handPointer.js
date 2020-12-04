// "use strict";

class HandPointer{
   constructor(){
       this.x = {"val": CANVASWIDTH/2};
       this.y = {"val": -CANVASHEIGHT/2};

       this.a = {"val": 0};
       this.s = {"val": 1};

       this.orientScl = 1;
       this.imgScale = 1.7;

       this.xTween = new TWEEN.Tween(this.x);
       this.yTween = new TWEEN.Tween(this.y);
       this.aTween = new TWEEN.Tween(this.a);
       this.sTween = new TWEEN.Tween(this.s);

       this.stopSwipe = false;

   }

   fadeIn(func){
       this.aTween.to({"val": 1}, 200).easing(TWEEN.Easing.Linear.None).start().onComplete(()=>{
           if(this.a.val === 1){
              if(func) func();
           }
       });
   }

   fadeOut(func){
       this.sTween.stop();
       this.aTween.to({"val": 0}, 200).easing(TWEEN.Easing.Linear.None).start().onComplete(()=>{
           if(this.a.val === 0){
              if(func) func();
           }
       });
   }

   swipe(start, end, y){
    if(y) this.y.val = y;
    this.s.val = 1;
     this.xTween.to({"val": [start, end]}, 700).easing(TWEEN.Easing.Linear.None).start().onComplete(()=>{
        if(!this.stopSwipe){
            this.fadeOut(()=>{
              if(!this.stopSwipe){

                    this.x.val = start;
                    this.fadeIn(()=>{
                      if(!this.stopSwipe) this.swipe(start, end);
                    });
              };
            });
        }
     }).onStop(()=>{
        TWEEN.remove(this.xTween);
     });
   }

   showTapIndicator(x, y){
       this.xTween.stop();
       this.s.val = 1;

       this.sTween.to({"val": [1, .7, 1]}, 800).easing(TWEEN.Easing.Linear.None).start().repeat(Infinity).delay(50).onStart(()=>{
           this.x.val = x;
           this.y.val = y;
       }).onUpdate(()=>{
          if(this.x.val !== x) this.x.val = x;
          if(this.y.val !== y) this.y.val = y;
       });
   }

   draw(ctx){
      if(this.x.val > CANVASWIDTH - 100){
         this.orientScl = -1;
      }
      else {
        this.orientScl = 1;
      }
      ctx.save();
      ctx.globalAlpha = this.a.val;
      ctx.translate(this.x.val, this.y.val);
      ctx.scale(this.s.val*this.orientScl, this.s.val);
      uiElem.arm.draw(ctx, 0,0, this.imgScale);
      ctx.restore();
   }
}

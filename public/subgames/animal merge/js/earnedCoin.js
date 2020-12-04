// "use strict";

class EarnedCoin {
    constructor(x, y, inc){
       this.pos = {"x": x, "y": y};

       this.reqX = CANVASWIDTH / 2 - 134;
       this.reqY = 34 - GAME.currentState.btnYOffset;

       this.time = Math.round(Math.random() * 900) + 300;

       this.inc = inc;

       this.posTween = new TWEEN.Tween(this.pos);
       this.done = false;

       this.s = 5 * assetsScale[assetsIndex];

       this.animate();

    }

    animate(){
      let _this = this;
       this.posTween.to({"x": _this.reqX, "y": _this.reqY}, this.time).easing(TWEEN.Easing.Cubic.In).start().onComplete(()=>{
           GAME.currentState.money += this.inc;
           this.done = true;
           if(GAME_DATA[3].sound) coinSound.play();
       });
    }

    draw(ctx){
        uiElem.giftCoinBonus.draw(ctx, this.pos.x-uiElem.giftCoinBonus.width/(2*this.s), this.pos.y-uiElem.giftCoinBonus.height/(2*this.s), this.s);
    }
}

// "use strict";

class MagicStar {
    constructor(x, y, inc){
       this.pos = {"x": x, "y": y};

       this.reqX = CANVASWIDTH/2 - 100+20;
       this.reqY = 55 - GAME.currentState.btnYOffset+20;

       this.inc = inc;

       this.posTween = new TWEEN.Tween(this.pos);
       this.done = false;

       this.s = 5 * assetsScale[assetsIndex];

       this.animate();

    }

    animate(){
      let _this = this;
       this.posTween.to({"x": _this.reqX, "y": _this.reqY}, 900).easing(TWEEN.Easing.Cubic.In).start().onComplete(()=>{
           GAME.currentState.currentExp += this.inc;
           GAME.currentState.starTween.to({"val": [1, 2, 1]}, 500).interpolation(TWEEN.Interpolation.Bezier).start();
           if(GAME_DATA[3].sound) starSound.play();
           this.done = true;
       });
    }

    draw(ctx){
        if(GAME.currentState.particlePool){
            let __p = GAME.currentState.particlePool.pop(), w = 3, c = Math.random() > .5 ? "gold" : "yellow";
            __p.set(this.pos.x, this.pos.y, Math.random()*4 - 2, Math.random()*4 - 2, w, c, 200, true, false, .15, true, true, "rgba(255,255,255,.05)", 10, .02, 0);
            GAME.currentState.particle.push(__p);
        }

        uiElem.expStar.draw(ctx, this.pos.x-uiElem.expStar.width/(2*this.s), this.pos.y-uiElem.expStar.height/(2*this.s), this.s);
    }
}

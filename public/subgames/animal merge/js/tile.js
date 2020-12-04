// "use strict";

class Tile {
    constructor(val){
        this.x = null;
        this.y = null;
        this.w = null;

        this.img = null;
        this.simg = null;
        this.nimg = null;

        this.val = val;

        this.selected = false;
        this.next = false;
        this.isSame = false;

        this.building = null;

        this.indicatorColor = ["#01c6a3", "#8e51c8", "#62dc26"];

        this.particleFrame = 0;
    }

    set(x, y, w){
       this.x = Math.round(x);
       this.y = Math.round(y);
       this.w = Math.round(w);
    }

    isClicked(){
       if(xDown >= this.x-this.w/2 && xDown <= this.x+this.w/2 &&
          yDown >= this.y-this.w/2 && yDown <= this.y+this.w/2){
          return true;
       }
       return false;
    }

    draw(ctx){

        this.img = newWorldElem.base;

        if(this.w && this.img){

           // if(GAME.currentState.city < 2){
              this.img.draw(ctx, this.x - (this.w)/2, this.y + (this.w)/6, null, (this.w));
           // }else{
              // this.img.draw(ctx, this.x - (this.w + this.w/10)/2, this.y - (this.w + this.w/15)/2, null, (this.w + this.w/10), (this.w + this.w/15));
           // }


           /*
           NOTE : INDICATOR PARTICLES ....
           */


           if(/*(!this.selected && this.next) ||*/ this.isSame){
               if(this.particleFrame >= 10) this.particleFrame = 0;
               if(GAME.currentState.particlePool.length > 0 && this.particleFrame === 0){
                   let state = GAME.currentState, __p = state.particlePool.pop(), w = (this.w/1.5), c = "#FFFFFF";
                   __p.set(this.x, this.y-w/20, 0, 0, w, "rgba(0,0,0,0)", 200, true, false, -.3, false, true, c, Math.round(w/10), .01, 0);
                   state.playGround.particle.push(__p);
               }
               this.particleFrame += .2;
           }else{
              this.particleFrame = 0;
           }

           if(this.building){
              this.building.val = this.val;
              let scale = 277 / (this.w*1.2); // 277
              this.building.set(this.x, this.y, scale, this.val, this.w/2.5, this.w/2.5);
           }
        }

    }
}

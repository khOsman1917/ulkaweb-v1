"use strict";

class Button {
    constructor(x, y, w, h, active, action, color){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        if(color){
           this.color = color;
        }else{
           this.color = "rgba(255, 255, 255, .3)";
        }

        this.active = active;
        this.action = action;

        this.responsive = true;

        this.s = 1;

        this.text = "";
        this.txtX = 0;
        this.txtY = 0;
        this.txtSize = 20;
        this.txtAlign = "center";
        this.txtColor = "#FFFFFF";

        this.correspondingY = 0;
        this.buttonSoundPlay = true;

        this.keepPressed = false;

        // if(GAME.currentstate.buttonz) GAME.currentstate.buttonz.push(this);
    }

    actAction(){
       if(this.action) this.action();
    }

    setText(txt, x, y, s, a, c){
      this.text = txt;
      if(x) this.txtX = x;
      if(y) this.txtY = y;
      if(s) this.txtSize = s;
      if(a) this.txtAlign = a;
      if(c) this.txtColor = c;
    }

    isClicked(){
       if(xDown && yDown &&
          xDown >= this.x-this.width/2 && xDown <= this.x+this.width/2 &&
          yDown >= this.y-this.height/2 && yDown <= this.y+this.height/2){

          if(this.active && !this.animation) this.s = .92;
          return true;
       }
       if(!this.animation) this.s = 1;
       return false;
    }

    update(x, y){

        if(x) this.x = x;
        if(y) this.y = y;

        if(this.animation) this.s = animate(.1, 1000, 1, Math.PI/2, 0);

        switch (this.active) {
          case true:
            // this.img = this.activeImage;
            break;
          case false:
            // this.img = this.notActiveImage;
            this.responsive = false;
            break;
        }

        if(this.active && this.responsive && this.isClicked()){
           if(!this.keepPressed){
              if(_game.currentState.screenPressed) this.actAction();
           }else{
              this.actAction();
           }
        }

    }

    draw(ctx){
        if(this.active){
            ctx.save();
            ctx.translate(this.x, this.y);

            ctx.scale(this.s, this.s);
            // if(this.img){
            //    if(this.img.draw){
            //       this.img.draw(ctx, -this.width/2, -this.height/2, null, this.width, this.height);
            //    }else{
            //       ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
            //    }
            // }

            ctx.drawRoundLine(-this.width/2, 0, this.width/2, 0, this.color, this.height);

            if(this.text) ctx.drawText(this.txtColor, this.txtSize, this.txtAlign, this.text, this.txtX, this.txtY);
            ctx.restore();
        }
    }
}

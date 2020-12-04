// "use strict";

class Button {
    constructor(x, y, w, h, acimg, nacimg, active, action, animate, glare){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.activeImage = acimg;
        this.notActiveImage = nacimg;

        this.img = acimg;

        this.active = active;
        this.action = action;

        this.responsive = true;

        if(animate) this.animation = animate;

        this.s = 1;

        this.text = "";
        this.txtX = 0;
        this.txtY = 0;
        this.txtSize = 20;
        this.txtAlign = "center";
        this.txtColor = "#FFFFFF";

        this.correspondingY = 0;
        this.buttonSoundPlay = true;

        this.rot = {"val": 0};

        this.rotTween = new TWEEN.Tween(this.rot);

        if(glare) this.showGlare = glare;
        this.glareRot = 0;

        this.keepPressed = false;

        // if(GAME.currentstate.buttonz) GAME.currentstate.buttonz.push(this);
    }

    actAction(){
       if(this.action) this.action();
       if(GAME_DATA[3].sound && this.buttonSoundPlay) buttonSound.play();
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

    rotAnim(){
      this.rotTween.to({"val": [0, -.15, .15, -.15, .15, -.15, .15, 0]}, 500).easing(TWEEN.Easing.Linear.None).start();
    }

    update(x, y){

        if(x) this.x = x;
        if(y) this.y = y;

        if(this.animation) this.s = animate(.1, 1000, 1, Math.PI/2, 0);

        switch (this.active) {
          case true:
            this.img = this.activeImage;
            break;
          case false:
            this.img = this.notActiveImage;
            this.responsive = false;
            break;
        }

        if(this.active && this.responsive && this.isClicked()){
           if(!this.keepPressed){
              if(GAME.currentState.screenPressed) this.actAction();
           }else{
              this.actAction();
           }
        }

    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        if(this.showGlare && this.active){
           if(this.glareRot >= 2*Math.PI) this.glareRot = 0;
           ctx.save();
           ctx.rotate(-this.glareRot);
           uiElem.sunRay_1.draw(ctx, -(this.width*2/2), -(this.width*2/2), null, this.width*2, this.width*2);
           uiElem.sunRay_2.draw(ctx, -(this.width*2/2), -(this.width*2/2), null, this.width*2, this.width*2);
           ctx.restore();

           this.glareRot += .025;
        }
        ctx.rotate(this.rot.val);
        ctx.scale(this.s, this.s);
        if(this.img){
           if(this.img.draw){
              this.img.draw(ctx, -this.width/2, -this.height/2, null, this.width, this.height);
           }else{
              ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
           }
        }

        if(this.img && this.text) ctx.drawText(this.txtColor, this.txtSize, this.txtAlign, this.text, this.txtX, this.txtY);
        ctx.restore();
    }
}

// "use strict";

class Leader_Board {
    constructor(){

         this.people = [];

         this.initY = 170;
         this.lbScrollY = this.initY;
         this.giftBtns = [];
         this.bounceY = {val: -100};

         this.scrollW = {"x": (CANVASWIDTH - 330)/2, "y": CANVASHEIGHT/2 - 170, "w": 330, "h": 372};

         this.active = false;

         this.alpha = {"val": 0};

         this.alphaTween = new TWEEN.Tween(this.alpha);

         this.yTween = new TWEEN.Tween(this.bounceY);

        this.scrollVel = 0;

        this.elHeight = 82 + 10;

        this.listHeight = (this.people.length - 4)*this.elHeight;

        this.maxY = this.initY + this.listHeight;

        let action = () => {
            this.fadeOut();
        };

        this.exitY = {"val": CANVASHEIGHT/2 + 100};

        this.exitButton = new Button(CANVASWIDTH/2 + 105, this.exitY.val, 61, 49, uiElem.exitBtn_1, null, true, action, false);

        this.exitYtween = new TWEEN.Tween(this.exitY);

        action = () => {
             GAME.currentState.giftCount = 4000;
             GAME.currentState.hasInvited.texts[0].text = "Firend Invited !";
             GAME.currentState.hasInvited.fadeIn();
        };

        this.inviteButton = new Button(CANVASWIDTH/2 - 50, this.exitY.val, 170, 51, uiElem.inviteBtntemp, null, true, action, false);
        this.inviteButton.setText("Invite for gift", 0, 5, 21, "center", "#FFFFFF");
    }

    set(people){
       this.people = people.slice(0);

       this.listHeight = this.people.length >= 4 ? (this.people.length - 4)*this.elHeight : this.elHeight;

       this.maxY = this.initY + this.listHeight;

       for(let i = 0; i < this.people.length; i++){
           let midy = CANVASHEIGHT/2 - this.lbScrollY + i*(82 + 10) + 41;

           let x = CANVASWIDTH/2 + 70 + uiElem.gift.width/4.4, y = midy;

           let action = () => {

               };

           let _state = true;

           let button = new Button(x, y, 54, 59, uiElem.gift, null, _state, action, false);
           this.giftBtns.push(button);
       }

    }

    handleInputs(input){
         if(input.isDown("enter")){
            if(xDown > this.scrollW.x && xDown < this.scrollW.x + this.scrollW.w &&
               yDown > this.scrollW.y && yDown < this.scrollW.y + this.scrollW.h){
                  this.scrollVel = yDiff/2;
               }
         }
    }

    fadeIn(){
       this.active = true;
       this.alphaTween.to({"val": 1}, 300).interpolation( TWEEN.Interpolation.Bezier ).start();

       this.yTween.to({"val": 0}, 700).easing(TWEEN.Easing.Bounce.Out).start();

       this.exitYtween.to({"val": CANVASHEIGHT/2 + 260}, 700).easing(TWEEN.Easing.Bounce.Out).delay(200).start();
    }

    fadeOut(){
       this.alphaTween.to({"val": 0}, 250).start();

       this.yTween.to({"val": -100}, 700).start();
       this.exitYtween.to({"val": CANVASHEIGHT/2 + 100}, 1200).easing(TWEEN.Easing.Bounce.Out).delay(200).start();
    }

    update(){
         if(this.active){
             this.lbScrollY += this.scrollVel;
             this.scrollVel -= this.scrollVel/10;

             if(Math.abs(this.scrollVel) < .001) this.scrollVel = 0;

             if(this.lbScrollY <= this.initY && Math.abs(this.scrollVel) < 1) this.scrollVel = (this.initY - this.lbScrollY)/10; //this.lbScrollY = this.initY;
             if(this.lbScrollY >= this.maxY && Math.abs(this.scrollVel) < 1) this.scrollVel = (this.maxY - this.lbScrollY)/10;

             if(this.lbScrollY <= this.initY - 70) this.lbScrollY = this.initY - 70;
             if(this.lbScrollY >= this.maxY + 70) this.lbScrollY = this.maxY + 70;
         }

         if(this.alpha.val > 0 && !GAME.currentState.msgWindowActive){
            this.active = true;
         }else{
            this.active = false;
         }
    }

    draw(ctx){
         if(this.alpha.val > 0){
            ctx.save();

            ctx.globalAlpha = this.alpha.val;
            ctx.drawBackground("rgba(50, 150, 200, .97)");

            ctx.translate(0, this.bounceY.val);

            // this.inviteButton.update();
            // this.inviteButton.y = this.exitY.val;
            // this.inviteButton.draw(ctx);

            this.exitButton.update();
            this.exitButton.y = this.exitY.val;
            this.exitButton.draw(ctx);

            uiElem.bgStore.draw(ctx, (CANVASWIDTH - uiElem.bgStore.width/uiElem.bgStore.scale)/2, (CANVASHEIGHT - uiElem.bgStore.height/uiElem.bgStore.scale)/2 - 20, null, 340);

            ctx.fillStyle = "#cb3c6c";
            ctx.fillRect((CANVASWIDTH - 100)/2, CANVASHEIGHT/2 - 250, 100, 50);

            ctx.drawText("#FFFFFF", 30, "center", "Leaderboard", CANVASWIDTH/2, CANVASHEIGHT/2 - 210);

            ctx.save();
            ctx.beginPath();
            ctx.rect(this.scrollW.x, this.scrollW.y, this.scrollW.w, this.scrollW.h);
            ctx.closePath();
            ctx.clip();

            for(let i = 0; i < this.people.length; i++){
                let midy = CANVASHEIGHT/2 - this.lbScrollY + i*this.elHeight + uiElem.bgSelect.height/4.6;

                uiElem.bgSelect.draw(ctx, (CANVASWIDTH - 310)/2, midy - 82/2, null, 310, 82);

                let pimg = this.people[i].image;

                drawRoundImage(ctx, pimg, 50, 70, midy);

                ctx.drawText("#777777", 16, "center", this.people[i].name, CANVASWIDTH/2, midy-6);
                ctx.drawText("#555555", 22, "center", numToString(this.people[i].score, 0, 2), CANVASWIDTH/2, midy+22);

                let lbBtn = this.giftBtns[i];

                if(lbBtn.y < this.scrollW.y || lbBtn.y > this.scrollW.y + this.scrollW.h){
                   lbBtn.responsive = false;
                }else{
                   lbBtn.responsive = this.active;
                }

                // lbBtn.update(null, midy);
                // lbBtn.draw(ctx);
            }

            ctx.restore();
            ctx.restore();

        }
    }
}

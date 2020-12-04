// "use strict";

class ShopWindow {
    constructor(level){
         this.level = level;

         this.totalBuildingNum = animalList.length;
         this.startBuildingNum = 1;

         this._buildings = {"Images": animalList, "Names": AnimalNames};

         this.btnTxtz = GAME_DATA[this.level].storePrice;

         this.initY = 170;
         this.shopScrollY = this.initY;
         this.shopButtons = [];
         this.adButtons = [];
         this.bounceY = {val: -100};

         this.scrollW = {"x": (CANVASWIDTH - 330)/2, "y": CANVASHEIGHT/2 - 170, "w": 330, "h": 372};

         this.active = false;

         this.alpha = {"val": 0};

         this.alphaTween = new TWEEN.Tween(this.alpha);

         this.yTween = new TWEEN.Tween(this.bounceY);

         this.lastUnlockedNum = 1;
         this.adForBuildShown = false;

        for(let i = this.startBuildingNum; i < this.totalBuildingNum; i++){

            let midy = CANVASHEIGHT/2 - this.shopScrollY + (i-1)*92 + 41;

            let x = CANVASWIDTH/2 + 70 + 40, y = midy;

            let action = () => {
                if(GAME.currentState.money >= Number(this.btnTxtz[i]) && GAME.currentState.shopB_Unlocked[i]){
                   if(GAME.currentState.playGround.tiles.length > GAME.currentState.playGBuildings){
                       GAME.currentState.money -= this.btnTxtz[i];
                       GAME.currentState.generateNewBuilding(i);
                       this.btnTxtz[i] *= 1.15;

                       this.saveStoreData();
                   }else{
                       GAME.currentState.sorry.fadeIn();
                       if(GAME_DATA[3].sound) landLessSound.play();
                   }
                }
            };

            let button = new Button(x, y, 79, 57, uiElem.buyStoreBtn_1, uiElem.buyStoreBtn_2, false, action, false);

            let priceTxt = Number(this.btnTxtz[i]);

            priceTxt = numToString(priceTxt, 2);

            button.setText(priceTxt, 11, 16, 12, "center", "#FFFFFF");
            this.shopButtons.push(button);


            let adbutton = new Button(x, y, 79, 57, uiElem.adsforbuilding, null, false, ()=>{
                // if(GAME.currentState.playGround.tiles.length > GAME.currentState.playGBuildings){
                   GAME.currentState.dueBNum = i;
                   GAME.currentState.watchAd.fadeIn();
                // }else{
                //   GAME.currentState.sorry.fadeIn();
                //   if(GAME_DATA[3].sound) landLessSound.play();
                // }
            }, false);
            adbutton.setText("", 11, 16, 12, "center", "#FFFFFF");
            this.adButtons.push(adbutton);
        }

        this.scrollVel = 0;

        this.elHeight = 92; // 82 + 10 padding

        this.listHeight = (this.totalBuildingNum - this.startBuildingNum - 4)*this.elHeight;

        this.maxY = this.initY + this.listHeight;

        let action = () => {
            this.fadeOut();
        };

        this.exitY = {"val": CANVASHEIGHT/2 + 100};

        this.exitButton = new Button(CANVASWIDTH/2 + 105, this.exitY.val, 61, 49, uiElem.exitBtn_1, null, true, action, false);

        this.exitYtween = new TWEEN.Tween(this.exitY);

        this.sDiff = 0;

    }

    testScroll(n){
       this.scrollVel = (n * this.elHeight)/10;
    }

    setScrollval(){
      for(let i = this.startBuildingNum; i < this.totalBuildingNum; i++){
          if(GAME.currentState.shopB_Unlocked[i]){ this.lastUnlockedNum = i};
      }
      // this.shopScrollY = this.lastUnlockedNum * this.elHeight;
      if(this.lastUnlockedNum >= 4) this.scrollVel = ((this.lastUnlockedNum-3) * this.elHeight)/10;

      return this.lastUnlockedNum;
    }

    saveStoreData(){
        GAME_DATA[this.level].storePrice = this.btnTxtz.slice(0);
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
       this.alphaTween.to({"val": 0}, 250).start().onComplete(()=>{
          if(this.alpha.val === 0) this.shopScrollY = 1 * this.elHeight;
       });

       this.yTween.to({"val": -100}, 700).start();
       this.exitYtween.to({"val": CANVASHEIGHT/2 + 100}, 1200).easing(TWEEN.Easing.Bounce.Out).delay(200).start();

    }

    update(){
         if(this.active){
           this.shopScrollY += this.scrollVel;
           this.scrollVel -= this.scrollVel/10;

           if(Math.abs(this.scrollVel) < .001) this.scrollVel = 0;

           if(this.shopScrollY <= this.initY && Math.abs(this.scrollVel) < 1) this.scrollVel = (this.initY - this.shopScrollY)/10; //this.shopScrollY = this.initY;
           if(this.shopScrollY >= this.maxY && Math.abs(this.scrollVel) < 1) this.scrollVel = (this.maxY - this.shopScrollY)/10;

           if(this.shopScrollY <= this.initY - 70) this.shopScrollY = this.initY - 70;
           if(this.shopScrollY >= this.maxY + 70) this.shopScrollY = this.maxY + 70;
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

            this.exitButton.update();
            this.exitButton.y = this.exitY.val;
            this.exitButton.draw(ctx);

            uiElem.bgStore.draw(ctx, (CANVASWIDTH - uiElem.bgStore.width/uiElem.bgStore.scale)/2, (CANVASHEIGHT - uiElem.bgStore.height/uiElem.bgStore.scale)/2 - 20, null, 340);

            ctx.save();
            ctx.beginPath();
            ctx.rect(this.scrollW.x, this.scrollW.y, this.scrollW.w, this.scrollW.h);
            ctx.closePath();
            ctx.clip();

            for(let i = this.startBuildingNum; i < this.totalBuildingNum; i++){
                let midy = CANVASHEIGHT/2 - this.shopScrollY + (i-1)*this.elHeight + 55;

                uiElem.bgSelect.draw(ctx, (CANVASWIDTH - 310)/2, midy - 82/2, null, 310, 82);

                let bimg = GAME.currentState.shopB_Unlocked[i] === true ? this._buildings.Images[i][0] : uiElem.closeHomeIcon, _s = 3,
                    bname = GAME.currentState.shopB_Unlocked[i] === true ? this._buildings.Names[i] : "????";               // * .75 for sd, 1 for md, 1.25 for hd

                if(bimg.height/_s > 90) _s = bimg.height/90;
                if(bimg.width/_s > 60) _s = bimg.width/60;

                bimg.draw(ctx, 60 - bimg.width/(_s*2), midy - bimg.height/(_s*2), _s);

                ctx.drawText("grey", 16, "left", bname, 100, midy+5);

                let shopBtn = this.shopButtons[i-1], adBtn = this.adButtons[i-1];

                if(shopBtn.y < this.scrollW.y || shopBtn.y > this.scrollW.y + this.scrollW.h){
                   shopBtn.responsive = false;
                   adBtn.responsive = false;
                }else{
                   shopBtn.responsive = this.active;
                   adBtn.responsive = this.active;
                }

                let priceTxt = Number(this.btnTxtz[i]);

                if(GAME.currentState.money >= Number(this.btnTxtz[i]) && GAME.currentState.shopB_Unlocked[i]){
                   shopBtn.active = true;
                   adBtn.active = false;
                }else{
                   if(GAME.currentState.money < Number(this.btnTxtz[i])){
                      shopBtn.active = false;
                      if(GAME.currentState.shopB_Unlocked[i] && this.lastUnlockedNum === i && !this.adForBuildShown){
                         adBtn.active = true;
                      } else {
                         adBtn.active = false;
                      }
                   }
                }

                priceTxt = numToString(priceTxt, 2);

                shopBtn.text = priceTxt;
                adBtn.text = priceTxt;

                shopBtn.update(null, midy);
                shopBtn.draw(ctx);

                adBtn.update(null, midy);
                adBtn.draw(ctx);

                if(!GAME.currentState.shopB_Unlocked[i]){
                    shopBtn.active = false;
                    adBtn.active = false;
                    uiElem.buyStoreBtn_3.draw(ctx, shopBtn.x-shopBtn.width/2, shopBtn.y-shopBtn.height/2, null, shopBtn.width, shopBtn.height);
                }

            }

            // if(this.level === 0 && Number(this.btnTxtz[1]) === 1000 && GAME.currentState.money >= 1000){
            //     ctx.save();
            //     ctx.translate(this.shopButtons[0].x, this.shopButtons[0].y);
            //     let _s = animate(.1, 700, 1, Math.PI/2, 0);
            //     ctx.scale(_s, _s);
            //     uiElem.arm.draw(ctx, 0,0, 2);
            //     ctx.restore();
            // }

            ctx.restore();

            ctx.restore();

        }
    }
}

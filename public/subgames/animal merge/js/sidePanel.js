// "use strict";

class Sidepanel {
    constructor(x, y){
        this.x = {"val": x};
        this.y = y;

        this.s = 1.2;

        this.alpha = {"val": 0};
        this.aTween = new TWEEN.Tween(this.alpha);

        this.openX = this.x.val - .52*uiElem.sidePanel.width/this.s;
        this.closeX = this.x.val;

        this.active = false;
        this.responsive = true;

        this.xTween = new TWEEN.Tween(this.x);

        this.slideBtn = new Button(this.x.val - uiElem.sideBtn.width/(2*this.s), this.y + uiElem.sideBtn.height/(2*this.s), uiElem.sideBtn.width/this.s, uiElem.sideBtn.height/this.s, uiElem.sideBtn,
                            null, true, () => {
                              if(this.active){
                                 this.sidePanelClose();
                              }else{
                                 this.sidePanelOpen();
                              }
                              if(GAME.currentState.handPointer.x.val >= CANVASWIDTH - 100 && GAME.currentState.handPointer.y.val == this.slideBtn.y &&
                                 GAME.currentState.handPointer.a.val == 1){
                                  GAME.currentState.handPointer.fadeOut(()=>{
                                      GAME.currentState.handPointer.x.val = CANVASWIDTH/2;
                                      GAME.currentState.handPointer.y.val = -CANVASHEIGHT/2;
                                  });
                              }

                            }, false, false);

        this.citySlider1Btn = new Button(this.x.val+uiElem.sidePanel.width/(2.25*this.s), this.y + 84, uiElem.citySlider1.width/2.2, uiElem.citySlider1.height/2.2,
                                    uiElem.citySlider1, null, true, () => { GAME_DATA[3].currentCity = 0; if(GAME.currentState.dataSaved){
                                      GAME.currentState.saveData(); } GAME.currentState.reload(); logFbEvent("Visiting_Manilla_city"); }, false);

        let btnState1 = GAME_DATA[0].level >= 5 ? true : false;

        this.citySlider2Btn = new Button(this.x.val+uiElem.sidePanel.width/(2.25*this.s), this.y + 136, uiElem.citySlider1.width/2.2, uiElem.citySlider1.height/2.2,
                                    uiElem.citySlider2, null, btnState1, () => { GAME_DATA[3].currentCity = 1; if(GAME.currentState.dataSaved){
                                      GAME.currentState.saveData(); } GAME.currentState.reload(); logFbEvent("Visiting_Night_London"); }, false);

        let btnState2 = GAME_DATA[1].level >= 5 ? true : false;

        this.citySlider3Btn = new Button(this.x.val+uiElem.sidePanel.width/(2.25*this.s), this.y + 187, uiElem.citySlider1.width/2.2, uiElem.citySlider1.height/2.2,
                                    uiElem.citySlider3, null, btnState2, () => { GAME_DATA[3].currentCity = 2; if(GAME.currentState.dataSaved){
                                      GAME.currentState.saveData(); } GAME.currentState.reload(); logFbEvent("Visiting_Small_Japan"); }, false);

        this.csx1 = 0; this.csx2 = 0; this.csx3 = 0;

        this.handAnimX = this.citySlider2Btn.x - 20;
        this.handAnimY = this.citySlider2Btn.y;
        this.showHand = false;

    }

    sidePanelOpen(){
       this.xTween.to({"val": this.openX}, 500).easing(TWEEN.Easing.Bounce.Out).start().onComplete(() => {
              this.active = true;
       });

       this.aTween.to({"val": 1}, 200).start();
    }

    sidePanelClose(){
       this.xTween.to({"val": this.closeX}, 500).easing(TWEEN.Easing.Bounce.Out).start().onComplete(() => {
              this.active = false;
       });

       this.aTween.to({"val": 0}, 200).start();
    }

    draw(ctx){

        if(this.active && GAME.currentState.screenPressed){
           if(xDown < this.x.val || yDown < this.y || yDown > this.y + uiElem.sidePanel.height/this.s){
              this.sidePanelClose();
           }
        }

      if(this.active){
          ctx.save();
          ctx.globalAlpha = this.alpha.val;

          ctx.drawBackground("rgba(50, 150, 200, .80)");

          ctx.drawText("#FFFFFF", 35, "center", "PAUSED", CANVASWIDTH/2, CANVASHEIGHT/2);

          ctx.restore();
      }

    }
}

// "use strict";

class MenuState extends State{

constructor(game){
    super(game);

    onBlackScreenCompletion = null;
    blackScreenAlphaDec = true;
    blackScreenAlphaInc = false;

    frames = 0;
    loadImagesNeeded(false, true);
    TWEEN.removeAll();

    this.yVal = {"val": (CANVASHEIGHT - 400)/2};

    this.yTween = new TWEEN.Tween(this.yVal);
    this.yTween.to({"val":  (CANVASHEIGHT - 250)/2}, 600).easing(TWEEN.Easing.Bounce.Out).start();

    this.alpha = {"val": 0};

    this.alphaTween = new TWEEN.Tween(this.alpha);
    this.txtI = Math.floor(Math.random()*LoadingText.length);

    // setLeaderboard();

    // loadAd();

    this.fadeInOut();

    AnimalNames = [];
    for(let i = 0; i < animalSpriteList.length; i++){
        let str = animalSpriteList[i].frames[0].filename.split("_")[0];
        AnimalNames.push(str);
    }

}

fadeInOut(){
    this.alphaTween.to({"val": [0, 1, 1, 1, 1, 1, 1, 0]}, 2000).easing(TWEEN.Easing.Linear.None).start().onComplete(()=>{
          this.fadeInOut();
          if(this.txtI < (LoadingText.length - 1))
             this.txtI++;
          else
             this.txtI = 0;
    });
}

changeState(){

    onBlackScreenCompletion = States.GAME;
    blackScreenAlphaDec = false;
    blackScreenAlphaInc = true;

}


handleInputs(input){
    if(input.isPressed("enter")){

    }
}

update(){

}

render(ctx){
  ctx.drawBackground("#3296c9");

  ctx.drawText("gold", 50, "center", "Jungle merge !", (CANVASWIDTH)/2, this.yVal.val+25, null, "white", 10);

  ctx.save();
  ctx.globalAlpha = this.alpha.val;
  ctx.drawText("#FFFFFF", 25, "center", LoadingText[this.txtI], CANVASWIDTH/2, CANVASHEIGHT/2 - 20);
  ctx.restore();

  ctx.drawCircle(CANVASWIDTH/2 - 30, animate(3, 1000, CANVASHEIGHT/2 + 30, Math.PI/2, 0), 5, "white");
  ctx.drawCircle(CANVASWIDTH/2, animate(3, 1000, CANVASHEIGHT/2 + 30, Math.PI, 0), 5, "white");
  ctx.drawCircle(CANVASWIDTH/2 + 30, animate(3, 1000, CANVASHEIGHT/2 + 30, -Math.PI/2, 0), 5, "white");

  ctx.drawAnimatedBlackScreen(onBlackScreenCompletion);

}

}

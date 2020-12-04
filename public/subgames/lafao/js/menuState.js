var MenuState = State.extend({

playGameMusic: function(){
   gameMusic1.pause();
   gameMusic1.currentTime = 0;
   gameMusic2.pause();
   gameMusic2.currentTime = 0;
   gameMusic3.pause();
   gameMusic3.currentTime = 0;
   this.initGameMusic();
},

initGameMusic: function(){
  gameMusic = (gameMode === "LIGHT") ? gameMusic1 : ((gameMode === "DARK") ? gameMusic2 : gameMusic3);
  gameMusic.volume = gameMode === "MIX" ? .8 : (gameMode === "DARK" ? .2 : .3);
  gameMusic.loop = true;
  gameMusic.play();
},

init: function(game){
    this._super(game);

    onBlackScreenCompletion = null;
    blackScreenAlphaDec = true;
    blackScreenAlphaInc = false;

    frames = 0;
	  particles = {};
    particleIndex = 0;
    stars = {};
    sstarIndex = 0;
    saws = {};
    sawIndex = 0;
    tripples = {};
    tripplesIndex = 0;
    aniNum = {};
    aniNumIndex = 0;

    gameScore = 0;

    this.starCount = 0;

    ballIndex = 24;

    this.color = ["#f75384", "#bb45d4", "#20ae98"];

    startTime = (new Date()).getTime();

    for(var i = 0; i < _balls.length; i++){
       _balls[i].remove();
    }
    for(var i = 0; i < _boxes.length; i++){
       _boxes[i].remove();
    }
    for(var i = 0; i < _bounds.length; i++){
       _bounds[i].remove();
    }

    _bars = [];
    _balls = [];
    _boxes = [];
    _plinkos = [];
    _bounds = [];

    var boundWidth = accordingToWidth === true ? 10 : moveAmt;
    var boundHeight = accordingToWidth === true ? moveAmt : 10;

    if(boundWidth < 10) boundWidth = 10;
    if(boundHeight < 10) boundHeight = 10;

    var bound1 = new Boundary(canvasWidth/2, canvasHeight + (boundHeight*1.5)/2, canvasWidth, boundHeight*1.5, "#000000");
    _bounds.push(bound1); // Bottom Boundary

    var bound2 = new Boundary(-(boundWidth*1.5)/2, canvasHeight/2, boundWidth*1.5, canvasHeight, "#000000");
    _bounds.push(bound2); // Left Boundary

    var bound3 = new Boundary(canvasWidth+(boundWidth*1.5)/2, canvasHeight/2, boundWidth*1.5, canvasHeight, "#000000");
    _bounds.push(bound3); // Right Boundary

    var bound4 = new Boundary(canvasWidth/2, -(boundHeight*1.5)/2, canvasWidth, boundHeight*1.5, "#000000");
    _bounds.push(bound4); // Top Boundary

    var bPattern = ["r", "g", "b"];

    for(var i = 0; i < 3; i++){

       if(bPattern[i] === "r"){

          var _bar = new Bar(120 * i, canvasHeight, 120, 20, "#f75384", "red");
          _bars.push(_bar);

       }else if(bPattern[i] === "g"){

          var _bar = new Bar(120 * i, canvasHeight, 120, 20, "#20ae98", "green");
          _bars.push(_bar);

       }else if(bPattern[i] === "b"){

          var _bar = new Bar(120 * i, canvasHeight, 120, 20, "#bb45d4", "blue");
          _bars.push(_bar);

       }
    }

    this.initAllMusic();
    this.initGameMusic();

},

initAllMusic: function(){
   playBarIncMusic = function(){
      barIncrease.currentTime = 0;
      barIncrease.loop = false;
      barIncrease.volume = 1;
      barIncrease.play();
   };
   playBarBurnMusic = function(){
      barBurn.currentTime = 0;
      barBurn.loop = false;
      barBurn.volume = 1;
      barBurn.play();
   };
   playBarResetMusic = function(){
      barReset.currentTime = 0;
      barReset.loop = false;
      barReset.volume = 1;
      barReset.play();
   };
   playStarMusic = function(){
      starCollect.currentTime = 0;
      starCollect.loop = false;
      starCollect.volume = 1;
      starCollect.play();
   };
   playTrippleBallMusic = function(){
      trippleBallCollect.currentTime = 0;
      trippleBallCollect.loop = false;
      trippleBallCollect.volume = 1;
      trippleBallCollect.play();
   };
   playTapBounceMusic = function(){
      tapBounce.currentTime = 0;
      tapBounce.loop = false;
      tapBounce.volume = 1;
      tapBounce.play();
   };
   playSwipeMusic = function(){
      swipe.currentTime = 0;
      swipe.loop = false;
      swipe.volume = 1;
      swipe.play();
   };
   playExplodeMusic = function(){
      explode.currentTime = 0;
      explode.loop = false;
      explode.volume = 1;
      explode.play();
   };
   playAppearMusic = function(){
      appear.currentTime = 0;
      appear.loop = false;
      appear.volume = 1;
      appear.play();
   };
},

handleInputs: function(input){
    if(input.isPressed("enter")){

           if(xDown >= canvasWidth - fbInvite.width/3.7 - 12 && xDown <= canvasWidth &&
              yDown >= 0 && yDown <= fbInvite.height/3.7 + 10){

              xDown = null;
              yDown = null;
              playTapBounceMusic();
              console.log("INVITE FB FRIENDS");

           }

           if(xDown >= canvasWidth/2 - 105 && xDown <= canvasWidth/2 - 55 &&
              yDown >= canvasHeight - 335 && yDown < canvasHeight - 285){

              xDown = null;
              yDown = null;
              playTapBounceMusic();

              gameMode = "LIGHT";
              window.localStorage.setItem("ColorBars_GameMode", gameMode);

              this.playGameMusic();

           }

           if(xDown >= canvasWidth/2 - 25 && xDown <= canvasWidth/2 + 25 &&
              yDown >= canvasHeight - 375 && yDown < canvasHeight - 325){

              xDown = null;
              yDown = null;
              playTapBounceMusic();

              gameMode = "DARK";
              window.localStorage.setItem("ColorBars_GameMode", gameMode);

              this.playGameMusic();

           }

           if(xDown >= canvasWidth/2 + 55 && xDown <= canvasWidth/2 + 105 &&
              yDown >= canvasHeight - 335 && yDown < canvasHeight - 285){

              xDown = null;
              yDown = null;
              playTapBounceMusic();

              gameMode = "MIX";
              window.localStorage.setItem("ColorBars_GameMode", gameMode);

              this.playGameMusic();

           }

           var d_X_shop = 60 - xDown, d_Y_shop = (canvasHeight - 245) - yDown;
           var dist_shop = Math.sqrt( d_X_shop*d_X_shop + d_Y_shop*d_Y_shop ), rad_shop = 30;

           if(dist_shop <= rad_shop){
              xDown = null;
              yDown = null;
              playTapBounceMusic();

              onBlackScreenCompletion = States.BALLZ;
              blackScreenAlphaDec = false;
              blackScreenAlphaInc = true;
           }

           var d_X_play = canvasWidth/2 - xDown, d_Y_play = (canvasHeight - 245) - yDown;
           var dist_play = Math.sqrt( d_X_play*d_X_play + d_Y_play*d_Y_play ), rad_play = 60;

           if(dist_play <= rad_play){
              xDown = null;
              yDown = null;
              playTapBounceMusic();

              onBlackScreenCompletion = tutorialShown === 1 ? States.GAME : States.TUTS;
              blackScreenAlphaDec = false;
              blackScreenAlphaInc = true;
           }

           var d_X_dev = (canvasWidth - 60) - xDown, d_Y_dev = (canvasHeight - 245) - yDown;
           var dist_dev = Math.sqrt( d_X_dev*d_X_dev + d_Y_dev*d_Y_dev ), rad_dev = 30;

           if(dist_dev <= rad_dev){
              xDown = null;
              yDown = null;
              playTapBounceMusic();

              onBlackScreenCompletion = States.DEV;
              blackScreenAlphaDec = false;
              blackScreenAlphaInc = true;
           }

    }
},

update: function(){
  frames++;
  // if(Math.random() > .95) new Particle(Math.random()*canvasWidth, -10, 0, (Math.random())+ 1, 3, Common.choose(this.color), 100, false, false, null, true, false, null, null, .01);

},

render: function(ctx){
  ctx.drawBackground();

  for(var p in particles){
      particles[p].update();
      if(particles[p]) particles[p].draw(ctx);
  }

  ctx.drawImage(gameLogo, (canvasWidth - gameLogo.width/1.1)/2 + 4, -10, gameLogo.width/1.1, gameLogo.height/1.1);

  ctx.save();
  ctx.globalAlpha = .6 + animate(.3, 1500, 0, -Math.PI/2);
  ctx.drawImage(fbInvite, canvasWidth - fbInvite.width/3.7 - 12, 10, fbInvite.width/3.7, fbInvite.height/3.7);
  ctx.restore();

  if(gameMode === "LIGHT") ctx.drawImage(modeSel, canvasWidth/2 - 105, canvasHeight - 335, 50, 50);
  ctx.drawImage(modeLight, canvasWidth/2 - 100, canvasHeight - 330, 40, 40);

  if(gameMode === "DARK") ctx.drawImage(modeSel, canvasWidth/2 - 25, canvasHeight - 375, 50, 50);
  ctx.drawImage(modeDark, canvasWidth/2 - 20, canvasHeight - 370, 40, 40);

  if(gameMode === "MIX") ctx.drawImage(modeSel, canvasWidth/2 + 55, canvasHeight - 335, 50, 50);
  ctx.drawImage(modeMix, canvasWidth/2 + 60, canvasHeight - 330, 40, 40);

  for(var i = 0; i < _bars.length; i++){
      _bars[i].update();
      _bars[i].draw(ctx);

      if(_bars[i].label === "green"){
         new Particle(_bars[i].x + Math.random()*_bars[i].width, _bars[i]._y + 10, 0, -3, 5+Math.random()*5, _bars[i].fill, 100, true, false, .18, true, false, null, null);
      }else{
         new Particle(_bars[i].x + Math.random()*_bars[i].width, _bars[i]._y + 10, 0, -3, 5+Math.random()*5, _bars[i].fill, 100, true, false, .3, true, false, null, null);
      }

  }

  ctx.save();
  ctx.translate(30 + 30, canvasHeight - 275 + 30);
  ctx.rotate(animate(5, 1000, 0, Math.PI/2)/20);
  ctx.drawImage(btnShop, -30, -30, 60, 60);
  ctx.restore();

  ctx.save();
  ctx.translate((canvasWidth - 120)/2 + 60, canvasHeight - 305 + 60);
  ctx.scale(1 - Math.abs(animate(5, 3000, 0, -Math.PI/2)/50), 1 - Math.abs(animate(5, 3000, 0, Math.PI/2)/50));
  ctx.drawImage(btnPlay, -60, -60, 120, 120);
  ctx.restore();

  ctx.save();
  ctx.translate(canvasWidth - 90 + 30, canvasHeight - 275 + 30);
  ctx.rotate(animate(5, 1000, 0, -Math.PI/2)/20);
  ctx.drawImage(btnDev, -30, -30, 60, 60);
  ctx.restore();

  for(var star in stars){
      stars[star].draw(ctx);
  }

  for(var tripple in tripples){
      tripples[tripple].draw(ctx);
      if(_balls.length === 0 || (tripples[tripple] && _balls[0].label !== tripples[tripple].label && tripples[tripple].label !== "multi")) tripples[tripple].delete();
  }

  for(var i = 0; i < _bounds.length; i++){
      _bounds[i].draw(ctx);
  }

  ctx.drawAnimatedBlackScreen(onBlackScreenCompletion);

}

});

"use strict";

class GameState extends State {

  initQuake() {
    this.quakeTime = 50;
    this.quakeVal = 0;

    this.quakeX = false;
    this.quakeY = false;

    this.quakedX = false;
    this.quakedY = false;
  }

  constructor(game) {
    super(game);

    onBlackScreenCompletion = null;
    blackScreenAlphaDec = true;
    blackScreenAlphaInc = false;

    frames = 0;
    this.particlePool = [];
    this.bulletPool = [];
    this.aniNumPool = [];
    this.coinPool = [];
    this.circlePool = [];

    this.particle = [];
    this.aninums = [];

    translateX = 0;
    translateY = 0;

    this.showTut = true;

    this.tutAlpha = 1;
    this.continueAlpha = 0;
    this.continue_ = false;

    this.toastAlpha = 0;
    this.showToast = false;
    this.toastMsg = "";

    this.btnY_To = canvasHeight / 2 + 50;
    this.btnY_From = canvasHeight / 2 + 400;

    this.btnRetryY = this.btnY_From;

    this.btnLeadY = this.btnY_From;

    this.btnShareY = this.btnY_From;

    this.showMenu = false;
    this.screenPressed = false;

    this.initQuake();

    this.starCount = totalCoins;
    this.pause = false;

    this.circles = [];
    this.star = [];
    this.bullets = [];
    this._bounds = [];
    this.coins = [];
    this.pups = [];

    this.complements = ["Great", "Perfect", "Brilliant", "Awesome", "Superb"];

    this.shootInterval = 3;
    this.shoot = false;

    this.transitionLimit = 75;
    this.hDiff = 0;

    this.nextTargetX = canvasWidth + 100;
    this.nextTargetreqX = canvasWidth + 100;
    this.nextTargetSet = false;

    var yOff = 0;
    if (accordingToWidth) yOff = moveAmt / 2;

    this.hero = new Hero(canvasWidth / 2, canvasHeight - 120 + yOff, 55, 55, yOff);

    yOff = null;

    this.waitCount = 0;

    this.score = 0;
    this.scored = false;

    this.powerNum = 0;
    this.powerIndex = 0;
    this.powerUpSeq = [1, 2, 4, 3];

    this.hasMultiShoot = false;
    this.hasMirror = false;
    this.hasSpeed = false;
    this.hasMultiScore = false;

    this.showNextTarget = false;
    this.prevTargetImg = new Image();
    this.prevTargetName = null;

    this.multiShootTime = 10;
    this.mirrorTime = 10;
    this.speedTime = 10;
    this.multiScoreTime = 10;

    this.multiScore = false;

    this.decval = .05;

    this.multiShoot = false;

    this.circlePower = 5;
    this.circleFall = 1;
    this.bulletPower = 1;

    this.gameStart = false;
    this.gameOver = false;
    this.endCount = 0;

    this.invert = 0;
    this.scoreQuake = 0;
    this.newBest = false;

    this.spendAmt = 0;

    this.hasPressed = true;
    this.canContinue = true;
    this.removeBoss = false;
    this.hasBoss = false;

    this.thresholdScore = 3000;
    this.colorIndex = -1;

    this.rankedPlayers = [];
    this.playerPosition = 0;

    this.invert = 0;
    this.invertness = 100;

    this.rankBtn = null;
    this.rankBtn2 = null;
    this.shareBtn = null;
    this.retryBtn = null;
    this.playBtn = null;
    this.inviteBtn = null;
    this.coinBtn = null;
    this.musicBtn = null;
    this.backBtn = null;

    this.sideScroller = new SideScroller(0, canvasHeight / 2 - 210);
    this.sideScroller.set(ENTRIES);

    this.generateBtns();

    this.generateBulletPool(200);
    this.generateParticlePool(300);
    this.generateAniNumPool(50);
    this.generateCirclePool(50);
    this.generateCoinPool(20);

    this.challangeScore = null;

    NEXTTARGET.id = null;


    if (newChallange) {
      xDown = null;
      yDown = null;
      this.startGame();
      gamePaused = true;
    }

    console.log("WELCOME TO GAME DEVELOPMENT ....");


  }

  generateBtns() {
    this.rankBtn = new Button(canvasWidth / 2 - 79, canvasHeight / 2 + 90, 78, 40, true, () => {
      // getLeaderboard(true);
    }, "#009fde");
    this.rankBtn.setText("Ranks", 0, 5, 18, "center", "white");

    this.rankBtn2 = new Button(canvasWidth / 2 - 100, canvasHeight / 2 + 200, 75, 40, true, () => {
      // getLeaderboard(true);
    }, "#009fde");
    this.rankBtn2.setText("Ranks", 0, 5, 18, "center", "white");

    this.musicBtn = new Button(canvasWidth / 2, canvasHeight / 2 + 200, 75, 40, true, () => {
      sfxValue = (sfxValue === 1) ? 2 : 1;
      setSFXvalue(sfxValue);
      if (sfxValue === 1) this.musicBtn.setText("SFX : On", 0, 5, 16, "center", "white");
      if (sfxValue === 2) this.musicBtn.setText("SFX : Off", 0, 5, 16, "center", "white");

    }, "#8cc63f");
    if (sfxValue === 1) this.musicBtn.setText("SFX : On", 0, 5, 16, "center", "white");
    if (sfxValue === 2) this.musicBtn.setText("SFX : Off", 0, 5, 16, "center", "white");

    this.inviteBtn = new Button(canvasWidth / 2 - 79, canvasHeight / 2 + 85, 78, 40, true, () => {

      inviteFriend(() => {
        hideLoad();
        this.continuePlay();
        this.hasPressed = true;
      });
    }, "#ed1e79");
    this.inviteBtn.setText("Invite", 0, 5, 18, "center", "white");

    this.shareBtn = new Button(canvasWidth / 2 + 79, canvasHeight / 2 + 90, 78, 40, true, () => {
      facebookShare("ulka.games");
    }, "#993eba");
    this.shareBtn.setText("Share", 0, 5, 18, "center", "white");

    this.coinBtn = new Button(canvasWidth / 2, canvasHeight / 2 + 85, 78, 40, true, () => {
      if (this.starCount >= Math.floor(this.score / 10)) {
        this.starCount -= Math.floor(this.score / 10);
        totalCoins = this.starCount;

        window.localStorage.setItem("fatao_coins", totalCoins);

        this.continuePlay();
        this.hasPressed = true;
      } else {
        showToast("Not Enough Coins !", 3000);
      }
    }, "#993eba");

    this.retryBtn = new Button(canvasWidth / 2, canvasHeight / 2 + 155, 78, 40, true, () => {
      this.hasPressed = true;
      this.restart();
      totalCoins = this.starCount;
      window.localStorage.setItem("fatao_coins", totalCoins);
      if (underChallange) {
        if (this.score >= this.challangeScore) {
          challangeForward(this.score);
        } else {
          underChallange = false;
        }
      } else if (newChallange) {
        challangeFriend(this.score);
      }
    }, "#8cc63f");
    this.retryBtn.setText("Retry", 0, 5, 18, "center", "white");

    this.playBtn = new Button(canvasWidth / 2, canvasHeight / 2 + 114, 78, 40, true, () => {
      gamePaused = false;
      this.showNextTarget = false;
      this.hDiff = this.hero.x - xDown;
    }, "#009fde");
    this.playBtn.setText("Play", 0, 5, 18, "center", "white");
    this.playBtn.animation = true;

    this.backBtn = new Button(canvasWidth / 2, canvasHeight / 2 + 190, 78, 40, true, () => {
      newChallange = false;
      this.restart();
      gamePaused = false;
    }, "#ed1e79");
    this.backBtn.setText("Back", 0, 5, 18, "center", "white");


  }

  generateAniNumPool(n) {
    for (let i = 0; i < n; i++) {
      this.aniNumPool.push(new AnimateNum());
    }

  }

  generateCirclePool(n) {
    for (let i = 0; i < n; i++) {
      this.circlePool.push(new FallingCircle());
    }

  }

  generateCoinPool(n) {
    for (let i = 0; i < n; i++) {
      this.coinPool.push(new Coin());
    }

  }

  generateBulletPool(n) {
    for (let i = 0; i < n; i++) {
      this.bulletPool.push(new Bullet());
    }

  }

  generateParticlePool(n) {
    for (let i = 0; i < n; i++) {
      this.particlePool.push(new Particle());
    }

  }

  generateFallingCircles(num, x, y, spd, r, img) {

    if (x && y) {
      let _c = this.circlePool.pop();
      _c.set(x, y, num, spd, 25);
      this.circles.push(_c);
    } else {
      let _c = this.circlePool.pop();
      _c.set(canvasWidth / 2, 100, num, spd, r, img);
      this.circles.push(_c);
    }
  }

  generateBullets(num) {
    let _b = this.bulletPool.pop(),
      showSPBullets = this.hasMultiShoot || this.hasMirror || this.hasSpeed; // || this.hasMultiScore;

    _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - this.hero.height / 2.5, -Math.PI / 2 + this.hero.ang, num, showSPBullets);
    if (!showSPBullets && this.hasMultiScore) _b.w = 22;
    this.bullets.push(_b);

    if (this.hero.hasMirror) { //this.y - canvasHeight + 200
      _b = this.bulletPool.pop();
      _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - canvasHeight + 200 + this.hero.height / 2.5 - this.hero.yOff, -1 * (-Math.PI / 2 + this.hero.ang), num, showSPBullets);
      if (!showSPBullets && this.hasMultiScore) _b.w = 22;
      this.bullets.push(_b);
    }

    if (showSPBullets) this.makeQuakeY(2);
    else this.makeQuakeY(1.25);

  }

  generateThreeBullets(num) {

    let ang1 = -Math.PI / 2 - .2 + this.hero.ang,
      ang2 = -Math.PI / 2 + this.hero.ang,
      ang3 = -Math.PI / 2 + .2 + this.hero.ang,
      showSPBullets = true;

    let _b = this.bulletPool.pop();
    _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - this.hero.height / 2.5, ang1, num, showSPBullets);
    this.bullets.push(_b);

    _b = this.bulletPool.pop();
    _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - this.hero.height / 2.5, ang2, num, showSPBullets);
    this.bullets.push(_b);

    _b = this.bulletPool.pop();
    _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - this.hero.height / 2.5, ang3, num, showSPBullets);
    this.bullets.push(_b);

    if (this.hero.hasMirror) {

      let _b = this.bulletPool.pop();
      _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - canvasHeight + 200 + this.hero.height / 2.5 - this.hero.yOff, -1 * ang1, num, showSPBullets);
      this.bullets.push(_b);

      _b = this.bulletPool.pop();
      _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - canvasHeight + 200 + this.hero.height / 2.5 - this.hero.yOff, -1 * ang2, num, showSPBullets);
      this.bullets.push(_b);

      _b = this.bulletPool.pop();
      _b.set(this.hero.x + Math.sin(this.hero.ang) * 10, this.hero.y - canvasHeight + 200 + this.hero.height / 2.5 - this.hero.yOff, -1 * ang3, num, showSPBullets);
      this.bullets.push(_b);

    }

    ang1 = null;
    ang2 = null;
    ang3 = null;

    if (showSPBullets) this.makeQuakeY(3);

  }

  generatePowerUp() {

    let x = Math.round(Math.random() * 240 + 60),
      extraY = this.score < 50000 ? map(this.score, 0, 50000, 0, 90) : (this.score < 100000 ? 50 : 30),
      y = canvasHeight / 2 - Math.round(Math.random() * 80) - 50 - extraY, //Math.round(Math.random()*100 + 200),
      n = Math.round(this.circlePower * 1.5);
    //  console.log("Extra", extraY);
    this.pups.push(new PowerUp(x, y, n, this.powerNum));
    x = null;
    y = null;
    n = null;
  }

  shootSound() {
    if (sfxValue === 1) {
      if (this.hasMultiShoot || this.hasMirror || this.hasSpeed) shootM2.play();
      else shootM.play();
    }
  }

  multiSound() {
    if (sfxValue === 1) multi.play();
  }

  bossEndSound() {
    if (sfxValue === 1) bossEnd.play('actual');
  }

  popSound() {
    if (sfxValue === 1) hitM.play();
  }

  coinSound() {
    if (sfxValue === 1) coinM.play();
  }

  continuePlay() {
    this.removeAllCircles();
    for (var i = 0; i < this.pups.length; i++) {
      this.pups[i].remove();
    }
    this.pups = [];

    // this.particlePool = [];

    this.circlePower -= 1;
    if (this.circleFall > 2) this.circleFall = 1.5;

    this.gameOver = false;
    this.continue_ = false;
    this.canContinue = false;

    this.removeBoss = false;
    this.hasBoss = false;
    this.showNextTarget = false;

    gamePaused = true;
    this.shoot = false;
    hideLoad();

  }

  startGame() {
    this.generateFallingCircles(this.circlePower, null, null, this.circleFall / 2, 25, null);
    this.gameStart = true;
  }

  handleInputs(input) {
    this.screenPressed = input.isPressed("enter");
    this.sideScroller.handleInputs(input);

    if (!this.gameOver && !this.continue_ && !gamePaused) {
      if (this.screenPressed) {
        this.hasPressed = false;
        // if(xDown > 0 && xDown < canvasWidth){
        this.hDiff = this.hero.x - xDown;
        // }

        if (!this.gameStart && !this.rankBtn2.isClicked() && !this.musicBtn.isClicked() &&
          !this.sideScroller.isInUse) {

          this.startGame();

        } else {
          this.shootSound();

          if (!this.multiShoot) {
            this.generateBullets(Math.floor(this.bulletPower));
          } else {
            this.generateThreeBullets(Math.floor(this.bulletPower));
          }
        }

      }

      if (input.isDown("enter")) {

        if (this.gameStart && !gamePaused) this.shoot = true;

        if (xDown + this.hDiff >= 0 && xDown + this.hDiff <= canvasWidth) {

          if (this.gameStart && !this.hasPressed && !gamePaused) this.hero.reqx = xDown + this.hDiff;
          // if(this.gameStart && !this.hasPressed && !gamePaused) Body.setPosition(this.hero.body, {x: xDown + this.hDiff, y: this.hero.y});

        }

      } else {
        this.shoot = false;
      }
    }

  }

  createSplash(num, x, y, speed, size, color, life, reduct) {
    for (var p = 0; p < num; p++) {
      if (this.particlePool.length > 0 && FPS >= 45) {
        let __p = this.particlePool.pop();
        __p.set(x, y, Math.random() * speed - speed / 2, Math.random() * speed - speed / 2, size, color, life, true, false, reduct, true, null, null, null, null, 0);
        this.particle.push(__p);
      }
    }
  }

  update() {

    let now = performance.now();
    while (TIMES.length > 0 && TIMES[0] <= now - 1000) {
      TIMES.shift();
    }
    TIMES.push(now);
    if (frames % 10 === 0) FPS = TIMES.length;

    gameBGalpha -= (gameBGalpha - bgAlphaDec) / 50;

    if (frames % 1000 === 0) bgAlphaDec = 0;

    frames++;

    if (frames >= 1000) frames = 0;

    this.hero.update();

    if (this.circles.length <= 0 && this.gameStart && !this.gameOver && !this.continue_) {
      this.circlePower++;
      this.circleFall += this.circleFall < 3.5 ? .07 : 0;

      if (!this.hasBoss && this.score > 1000) {
        if (NEXTTARGET.id !== null && (NEXTTARGET.score - this.score) <= this.circlePower * 250 && (NEXTTARGET.score - this.score) >= this.circlePower * 100) {
          this.hasBoss = true;
          this.generateFallingCircles(this.circlePower, null, null, this.circleFall, 50, NEXTTARGET.img);
        } else {
          if (this.score % 5000 < 1000 && NEXTTARGET.id === null) {
            NEXTTARGET.score = this.score + this.circlePower * 250;
            this.nextTargetSet = true;
            this.hasBoss = true;
            this.generateFallingCircles(this.circlePower, null, null, this.circleFall, 50, null, 1);
          } else {
            this.generateFallingCircles(this.circlePower, null, null, this.circleFall, 25, null);
          }
        }
      } else {
        this.generateFallingCircles(this.circlePower, null, null, this.circleFall, 25, null);
      }

      // this.generateFallingCircles(this.circlePower, null, null, this.circleFall, 25, null);

      this.powerNum = this.powerUpSeq[this.powerIndex];
      if (this.pups.length === 0) this.generatePowerUp();

      this.powerIndex += this.powerIndex < 3 ? 1 : -3;
    }

    if (frames % this.shootInterval === 0 && this.shoot && !this.gameOver && !this.continue_ && !gamePaused) {
      if (!this.multiShoot) {
        this.generateBullets(Math.floor(this.bulletPower));
      } else {
        this.generateThreeBullets(Math.floor(this.bulletPower));
      }
      this.shootSound();
    }

    if (this.score >= this.thresholdScore && this.thresholdScore <= 160000) {
      this.thresholdScore += 3000;
      if (this.score % 20000 <= 2500 && this.colorIndex < 4) this.colorIndex++;

      this.circleFall = 1 + (this.colorIndex + 1) / 5;
      if (this.score < 15000 && this.bulletPower < this.circlePower - 5) this.bulletPower = this.circlePower - 5;
      else if (this.score >= 15000 && this.score < 30000 && this.bulletPower < this.circlePower - 6) this.bulletPower = this.circlePower - 6;

      // if (FPS >= 45) {
      //    let _a = this.aniNumPool.pop();
      //    _a.set(canvasWidth / 2, canvasHeight / 2, " " + this.complements[this.colorIndex] + " ", .01, 40, 0, -.3);
      //    this.aninums.push(_a);
      // }

    }

    if (!gamePaused) {
      if (this.hasMultiShoot) {
        this.multiShootTime -= this.decval;
      }
      if (this.multiShootTime <= 0) {
        this.hasMultiShoot = false;
        this.multiShootTime = 10;
        this.multiShoot = false;
      }

      if (this.hasMirror) {
        this.mirrorTime -= this.decval;
      }
      if (this.mirrorTime <= 0) {
        this.hasMirror = false;
        this.mirrorTime = 10;
        this.hero.hasMirror = false;
      }

      if (this.hasSpeed) {
        this.speedTime -= this.decval;
      }
      if (this.speedTime <= 0) {
        this.hasSpeed = false;
        this.speedTime = 10;
        this.shootInterval = 3;
      }

      if (this.hasMultiScore) {
        this.multiScoreTime -= this.decval;
      }
      if (this.multiScoreTime <= 0) {
        this.hasMultiScore = false;
        this.multiScoreTime = 10;
        this.multiScore = false;
      }
    }

    if (this.gameOver || this.continue_) {
      if (this.endCount < 3) this.endCount += .2;
      // if(this.endCount >= 3) this.restart();

      if (this.score > bestScore) {
        bestScore = this.score;
        this.newBest = true;
        window.localStorage.setItem("fatao_best", bestScore);

        // setLeaderboard(bestScore);
      }
    }
    // else{
    //   if(this.score > bestScore){
    //      bestScore = this.score;
    //   }
    PLAYER.score = this.score;
    // }

    if (this.score >= NEXTTARGET.score && this.nextTargetSet) {
      this.removeBoss = true;
      this.nextTargetreqX = canvasWidth + 100;
      NEXTTARGET.id = null;
      // this.prevTargetImg.src = NEXTTARGET.img.src;
      // this.prevTargetName = NEXTTARGET.name+" Defeated";
      // setNextTarget();
    }

    this.nextTargetX -= (this.nextTargetX - this.nextTargetreqX) / 10;

  }

  removeAllCircles() {

    for (let i = 0; i < this.circles.length; i++) {
      let _c = this.circles.splice(i, 1);
      this.circlePool.push(_c[0]);
      i--;
    }
    this.hasBoss = false;

    console.log("All Removed");
  }

  restart() {

    this.hero.remove();
    for (var i = 0; i < this.pups.length; i++) {
      this.pups[i].remove();
    }

    // getLeaderboard(false);

    onBlackScreenCompletion = States.GAME;
    blackScreenAlphaDec = false;
    blackScreenAlphaInc = true;
  }

  makeQuakeX(val) {
    // if(!this.quakedX){
    this.quakeVal = val;
    this.quakeX = true;
    this.quakedX = true;
    // }
  }

  makeQuakeY(val) {
    // if(!this.quakedY){
    this.quakeVal = val;
    this.quakeY = true;
    this.quakedY = true;
    // }
  }

  render(ctx1, ctx2, ctx3, ctx4) {
    ctx1.drawBackground();
    ///////////////////////////////////////////////////////////////////////////////////

    var yOff = 0;
    if (accordingToWidth) yOff = moveAmt / 3;

    let _scr = numToString(this.score);

    let xOff = animate(this.scoreQuake, 100, canvasWidth / 2, -Math.PI / 2);

    if (this.scoreQuake > 0) this.scoreQuake -= .25;

    // ctx1.drawText("#FFFFFF", 36, "center", " "+_scr+" ", xOff, 40-yOff);

    let _clr = this.colorIndex >= 0 ? colors[this.colorIndex] : "#FFFFFF";

    ctx1.drawText(_clr, 36, "center", " " + _scr + " ", xOff, 40 - yOff);

    _coin.draw(ctx1, 10, 15 - yOff, 0, 20, 20);

    let _sscr = numToString(this.starCount);

    ctx1.drawText("#FFFFFF", 16, "left", " " + _sscr + " ", 8, 55 - yOff);

    // if (NEXTTARGET.img) drawRoundImage(ctx1, NEXTTARGET.img, 40, this.nextTargetX, 28 - yOff);
    //
    // _sscr = numToString(NEXTTARGET.score);
    //
    // ctx1.drawText("#FFFFFF", 16, "center", " " + _sscr + " ", this.nextTargetX, 67 - yOff);

    // _btnPause.draw(ctx1, canvasWidth - _btnPause.width/8.5 - 10, 14-yOff, 8.5);

    _sscr = null;

    ///////////////////////////////////////////////////////////////////////////////////
    ctx2.clearAll();
    ctx2.save();

    if (this.quakeVal > .05) {
      this.quakeVal -= .5;
    } else {
      this.quakeVal = 0;
    }

    let xQ = 0,
      yQ = 0;

    if (this.quakeX) xQ = animate(Math.round(this.quakeVal), this.quakeTime, 0, Math.PI / 2);
    if (this.quakeY) yQ = animate(Math.round(this.quakeVal), this.quakeTime, 0, Math.PI / 2);

    ctx2.translate(translateX + xQ, translateY + yQ);

    for (let i = 0, len = this.bullets.length; i < len; i++) {
      this.bullets[i].draw(ctx2);

      if (this.bullets[i].y < -200 || this.bullets[i].y > canvasHeight + 200) {
        let _b = this.bullets.splice(i, 1);
        // _b.reset();
        this.bulletPool.unshift(_b[0]);
        len--;
        i--;
      }
    }

    // this.hero.draw(ctx2);

    for (var i = 0; i < this.coins.length; i++) {
      if (this.coins[i]) this.coins[i].draw(ctx2);

      var xD = this.coins[i].x - this.hero.x,
        yD = this.coins[i].y - this.hero.y,
        dist = Math.sqrt(xD * xD + yD * yD),
        rad = this.coins[i].rad + this.hero.width / 2;

      if (dist <= rad) {
        if (FPS >= 45) {
          let _a = this.aniNumPool.pop();
          _a.set(this.coins[i].x, this.coins[i].y - 20, "+1", .01, null, 0, -.25);
          this.aninums.push(_a);
        }
        if (this.particle.length < 15) this.createSplash(4, this.coins[i].x, this.coins[i].y, 6, 12, "gold", 100, .5);
        this.starCount += 1;
        let _c = this.coins.splice(i, 1);
        this.coinPool.unshift(_c[0]);
        i--;

        this.coinSound();
      } else if (this.coins[i].y >= canvasHeight + this.coins[i].rad) {
        let _c = this.coins.splice(i, 1);
        this.coinPool.unshift(_c[0]);
        i--;
      }

      xD = null;
      yD = null;
      dist = null;
      rad = null;
    }

    for (let i = 0, len = this.particle.length; i < len; i++) {
      if (this.particle[i].active) {
        this.particle[i].update();
        this.particle[i].draw(ctx2);
      } else {
        let __p = this.particle.splice(i, 1);
        this.particlePool.push(__p[0]);
        len--;
        i--;
        //  break;
      }
    }

    ctx2.restore();

    ///////////////////////////////////////////////////////////////////////////////////

    ctx3.clearAll();
    ctx3.save();
    ctx3.translate(translateX + xQ, translateY + yQ);

    for (var i = 0, len = this.circles.length; i < len; i++) {
      if (this.circles[i]) {
        this.circles[i].draw(ctx3);

        for (var j = 0, len2 = this.circles.length; j < len2; j++) {
          if (i !== j) {
            let c = this.circles[i],
              c1 = this.circles[j],
              rad = c.rad + c1.rad;

            if (distance(c.x, c1.x, c.y, c1.y) < rad && !gamePaused) {
              if (c.x <= c1.x) {
                c.xVel -= !c.isBoss ? 1 : 2.5;
                c1.xVel += !c1.isBoss ? 1 : 2.5;
              } else {
                c.xVel += !c.isBoss ? 1 : 2.5;
                c1.xVel -= !c1.isBoss ? 1 : 2.5;
              }

              if (c.y <= c1.y) {
                c.yVel -= !c.isBoss ? .025 : 0;
                c1.yVel += !c1.isBoss ? .025 : 0;
              } else {
                c.yVel += !c.isBoss ? .025 : 0;
                c1.yVel -= !c1.isBoss ? .025 : 0;
              }
            }

          }
        }

        for (var j = 0; j < this.pups.length; j++) {
          let c = this.circles[i],
            p = this.pups[j],
            rad = c.rad + p.rad;

          if (distance(c.x, p.x, c.y, p.y) < rad && !gamePaused) {
            if (c.x <= p.x) {
              c.xVel -= .75;
            } else {
              c.xVel += .75;
            }

            if (c.y <= p.y) {
              c.yVel -= .075;
            } else {
              c.yVel += !c.isBoss ? .05 : 0;
            }

          }
        }


        if (this.circles[i].y >= this.hero.y + this.circles[i].rad) {
          if (this.score >= 1000 && this.canContinue &&
            !underChallange && !newChallange) {
            this.continue_ = true;
          } else {
            this.gameOver = true;

            if (underChallange) {
              if (this.score >= this.challangeScore) {
                challangeForward(this.score);
              } else {
                underChallange = false;
              }
            } else if (newChallange) {
              challangeFriend(this.score);
            }
          }
          if (this.particlePool.length > 0 && FPS >= 45) {
            let __p = this.particlePool.pop();
            __p.set(this.circles[i].x, this.circles[i].y, 0, 0, 30, this.circles[i].fill, 400, true, false, -40, true, null, null, null, .009, 0);
            this.particle.push(__p);
          }

          let _c = this.circles.splice(i, 1);
          this.circlePool.push(_c[0]);
          i--;
          len--;

          if (this.gameOver && !this.scored) {
            totalCoins = this.starCount;
            window.localStorage.setItem("fatao_coins", totalCoins);
            this.scored = true;
          }
        } else {
          let dX = this.hero.x - this.circles[i].x,
            dY = this.hero.y - this.circles[i].y,
            dist = Math.sqrt(dX * dX + dY * dY),
            rad = this.hero.width / 1.5 + this.circles[i].initialRad;

          if (dist <= rad) {
            this.circles[i].yVel -= 2;
            // if(_game.currentState.particlePool.length > 0 && FPS >= 45){
            //     let __p = _game.currentState.particlePool.pop();
            //     __p.set(this.hero.x, this.hero.y, 0, 0, 10, "rgba(0,0,0,0)", 200, true, false, -2, true, true, "white", 2, null, .05);
            //     this.hero.particle.push(__p);
            // }

          }
        }
      }

      for (var j = 0, bLen = this.bullets.length; j < bLen; j++) {
        if (this.circles[i]) {
          var xD = this.circles[i].x - this.bullets[j].x,
            yD = this.circles[i].y - this.bullets[j].y,
            dist = Math.sqrt(xD * xD + yD * yD),
            rad = this.circles[i].rad + this.bullets[j].w;

          if (dist <= rad) {

            if (this.circles[i].num > this.bullets[j].num) {
              var offset = Math.random() > .5 ? this.circles[i].initialRad - 1 : -(this.circles[i].initialRad - 1);
              if (!this.circles[i].isBoss) {
                this.generateFallingCircles(this.circles[i].num - 1, this.circles[i].x + offset, this.circles[i].y, this.circleFall - (Math.random() * 2) / 20, 25, null);
                this.generateFallingCircles(this.circles[i].num - 1, this.circles[i].x - offset, this.circles[i].y + offset, this.circleFall + Math.random() * 2, 25, null);
              } else {
                if (this.circles[i].y > canvasHeight / 2) this.circles[i].yVel -= .5;
                if (this.circles[i].y < canvasHeight / 2) this.circles[i].yVel -= .075;

                if (this.bullets[j].x < this.circles[i].x) this.circles[i].xVel -= 3;
                if (this.bullets[j].x > this.circles[i].x) this.circles[i].xVel += 3;

                // if(this.circles[i].yVel <= -2 || this.circles[i].y <= 100) this.circles[i].yVel = 0;
                let cNum = this.circles[i].y >= (canvasHeight / 2 - 100) ? (frames % 5 == 0 ? this.bullets[j].num - 1 : this.bullets[j].num) : (frames % 5 == 0 ? this.bullets[j].num + 1 : (frames % 2 == 0 ? this.bullets[j].num - 1 : this.bullets[j].num));

                if (this.circles.length < 20) this.generateFallingCircles(cNum, this.circles[i].x + offset, this.circles[i].y, this.circleFall - (Math.random() * 2) / 20, 25, null);
                // this.generateFallingCircles(this.bullets[j].num, this.circles[i].x - offset, this.circles[i].y+offset, this.circleFall+Math.random()*2, 25, null);
              }
            } else {

              if ((FPS < 40 && this.coins.length < 6) || (FPS >= 45 && this.coins.length < 12)) {
                let _c = this.coinPool.pop();
                _c.set(this.circles[i].x, this.circles[i].y);
                this.coins.push(_c);
              }
            }

            this.createSplash(3, this.bullets[j].x, this.bullets[j].y, 4, 10, "#ffffff", 100, .5);
            let _b = this.bullets.splice(j, 1);
            this.bulletPool.push(_b[0]);
            j--;
            bLen--;

            this.createSplash(4, this.circles[i].x, this.circles[i].y, 8, 14, this.circles[i].fill, 100, .5);


            if (!this.circles[i].isBoss) {

              if (!this.multiScore) {
                this.score += this.circles[i].num;
              } else {
                this.score += this.circles[i].num * 2;
              }

              this.scoreQuake = 3;

              let _c = this.circles.splice(i, 1);
              this.circlePool.push(_c[0]);
              i--;
              len--;

              this.popSound();

            } else {
              this.score += Math.floor(this.circles[i].num / 3);
              this.circles[i].initialRad = map(this.score, NEXTTARGET.score - this.circlePower * 250, NEXTTARGET.score, 50, 25);
            }


          }

          xD = null;
          yD = null;
          dist = null;
          rad = null;
        }
      }

      if (this.circles[i] && this.circles[i].isBoss && this.removeBoss) {
        this.removeBoss = false;
        let isB = this.circles[i].isBoss,
          x = this.circles[i].x,
          y = this.circles[i].y,
          fill = this.circles[i].fill;

        let _c = this.circles.splice(i, 1);
        this.circlePool.push(_c[0]);
        i--;
        len--;

        if (this.particlePool.length > 0 && FPS >= 45) {

          let __p = this.particlePool.pop();
          __p.set(x, y, 0, 0, 30, fill, 400, true, false, -40, true, null, null, null, .02, 0);
          this.particle.push(__p);

        }
        this.removeAllCircles();
        this.bossEndSound();
        this.makeQuakeX(20);

        this.popSound();
      }

    }

    this.hero.draw(ctx3);

    for (var i = 0; i < this.pups.length; i++) {
      this.pups[i].draw(ctx3);

      if (this.pups[i].life <= 0) {
        this.removePup(i);
        this.pups.splice(i, 1);
        i--;
      }

      for (var j = 0, bLen = this.bullets.length; j < bLen; j++) {
        if (this.pups[i]) {
          var xD = this.pups[i].x - this.bullets[j].x,
            yD = this.pups[i].y - this.bullets[j].y,
            dist = Math.sqrt(xD * xD + yD * yD),
            rad = this.pups[i].rad + this.bullets[j].w;

          if (dist <= rad) {

            if (this.pups[i].num > this.bullets[j].num) {
              this.pups[i].num--;
            } else {
              if (this.pups[i].label === 1) {
                this.shootInterval = 2;
                this.hasSpeed = true;
                this.speedTime = 10;

                let _a = this.aniNumPool.pop();
                _a.set(canvasWidth / 2, 170, " Double Speed ! ", .01, 40, 0, -.3);
                this.aninums.push(_a);

              } else if (this.pups[i].label === 2) {
                this.hero.hasMirror = true;
                this.hasMirror = true;
                this.mirrorTime = 10;

                let _a = this.aniNumPool.pop();
                _a.set(canvasWidth / 2, 170, " Reflection ! ", .01, 40, 0, -.3);
                this.aninums.push(_a);

              } else if (this.pups[i].label === 3) {
                this.multiShoot = true;
                this.hasMultiShoot = true;
                this.multiShootTime = 10;

                let _a = this.aniNumPool.pop();
                _a.set(canvasWidth / 2, 170, " Tripple Bullets ! ", .01, 40, 0, -.3);
                this.aninums.push(_a);

              } else if (this.pups[i].label === 4) {
                this.multiScore = true;
                this.hasMultiScore = true;
                this.multiScoreTime = 10;

                let _a = this.aniNumPool.pop();
                _a.set(canvasWidth / 2, 170, " 2 x Score ", .01, 60, 0, -.3);
                this.aninums.push(_a);

              }

              this.removePup(i);
              this.makeQuakeX(15);
              this.multiSound();
              this.pups.splice(i, 1);
              i--;
              this.bulletPower++;

            }

            this.createSplash(3, this.bullets[j].x, this.bullets[j].y, 4, 10, "#ffffff", 100, .5);
            let _b = this.bullets.splice(j, 1);
            this.bulletPool.push(_b[0]);
            j--;
            bLen--;

            this.popSound();

          }

          xD = null;
          yD = null;
          dist = null;
          rad = null;
        }
      }
    }

    ctx3.restore();

    //////////////////////////////////////////////////////////////////////////////////

    ctx4.clearAll();

    var bsTxt = numToString(bestScore);

    if (!this.gameStart) {

      this.drawGameName(ctx4, _scr, xOff, yOff);

      this.sideScroller.update();
      this.sideScroller.draw(ctx4);

      // ctx4.drawText("#ffffff", 18, "center", " Best Score ", canvasWidth/2, canvasHeight/2 - 55);
      ctx4.drawText("#f4d744", 30, "center", "Best : " + bsTxt, canvasWidth / 2, canvasHeight / 2 + 15); // - 15

      ctx4.drawText("#ffffff", 35, "center", " Slide To Play ", canvasWidth / 2, canvasHeight / 2 + 80);

      ctx4.drawRoundLine(canvasWidth / 2 - 130, canvasHeight / 2 + 110, canvasWidth / 2 + 130, canvasHeight / 2 + 110, "rgba(255, 255, 255, .3)", 10);

      _tutHand.draw(ctx4, animate(130, 2500, canvasWidth / 2, -Math.PI / 2) - _tutHand.width / 6, canvasHeight / 2 + 92, 3);

      // this.rankBtn2.update();
      // this.rankBtn2.draw(ctx4);
      this.musicBtn.update();
      this.musicBtn.draw(ctx4);

    }

    for (let i = 0; i < this.aninums.length; i++) {
      this.aninums[i].draw(ctx4);

      if (!this.aninums[i].active) {
        let _a = this.aninums.splice(i, 1);
        this.aniNumPool.unshift(_a[0]);
        i--;
      }
    }

    if (this.continue_ && this.endCount >= 3 && !this.gameOver) {
      ctx4.drawBackground2();

      this.drawGameName(ctx4, _scr, xOff, yOff);

      ctx4.drawText("#ffffff", 35, "center", " Continue Playing ? ", canvasWidth / 2, canvasHeight / 2);

      // this.inviteBtn.update();
      // this.inviteBtn.draw(ctx4);

      this.coinBtn.update();
      this.coinBtn.draw(ctx4);

      this.retryBtn.update();
      this.retryBtn.draw(ctx4);

      // ctx4.drawText("#ffffff", 18, "center", " Invite ", canvasWidth/2 - 80, canvasHeight/2+50);
      ctx4.drawText("#ffffff", 18, "center", " or ", canvasWidth / 2, canvasHeight / 2 + 91);

      _coin.draw(ctx4, canvasWidth / 2  -30, canvasHeight / 2 + 110, 0, 20, 20);

      this.spendAmt = Math.floor(this.score / 10);
      ctx4.drawText("#ffffff", 18, "center", " " + this.spendAmt + " ", canvasWidth / 2 +20, canvasHeight / 2 + 125);

      // ctx4.drawText("#ffffff", 18, "center", " Restart ", canvasWidth/2, canvasHeight/2+120);
    }

    if (gamePaused) {
      ctx4.drawBackground2();

      this.drawGameName(ctx4, _scr, xOff, yOff);

      if (!this.showNextTarget) {
        ctx4.drawText("#ffffff", 18, "center", " Best Score ", canvasWidth / 2, canvasHeight / 2 - 35);
        ctx4.drawText("#f4d744", 35, "center", " " + bsTxt + " ", canvasWidth / 2, canvasHeight / 2 + 5);
      } else {
        _circles[2].draw(ctx4, canvasWidth / 2 - 28.8, canvasHeight / 2 - 100 - 28.1, 0, 56, 56);
        drawRoundImage(ctx4, this.prevTargetImg, 50, canvasWidth / 2, canvasHeight / 2 - 100);

        ctx4.drawText("#FFFFFF", 20, "center", this.prevTargetName, canvasWidth / 2, canvasHeight / 2 - 45, null, "#009fde", 2);

        _circles[3].draw(ctx4, canvasWidth / 2 - 28, canvasHeight / 2 - 28.1, 0, 56, 56);
        drawRoundImage(ctx4, NEXTTARGET.img, 50, canvasWidth / 2, canvasHeight / 2);

        ctx4.drawText("#FFFFFF", 20, "center", " Next Fight : " + NEXTTARGET.name, canvasWidth / 2, canvasHeight / 2 + 55, null, "#ed1e79", 2);
      }

      this.playBtn.update();
      this.playBtn.draw(ctx4);

      this.backBtn.update();
      this.backBtn.draw(ctx4);

    }

    if (this.gameOver && this.endCount >= 3) {

      ctx4.drawBackground2();

      this.drawGameName(ctx4, _scr, xOff, yOff);

      this.sideScroller.update();
      this.sideScroller.draw(ctx4);

      ctx4.drawText("#009fde", 35, "center", " " + _scr + " ", canvasWidth / 2, canvasHeight / 2);
      ctx4.drawText("#ffffff", 25, "center", " Best : " + bsTxt + " ", canvasWidth / 2, canvasHeight / 2 + 35);

      if (this.newBest) {
        ctx4.save();
        ctx4.globalAlpha = animate(.4, 500, .6, Math.PI / 2);
        ctx4.drawText("#f4d744", 15, "center", " New Best !!! ", canvasWidth / 2, canvasHeight / 2 + 56);
        ctx4.restore();
      }

      // this.rankBtn.update();
      // this.rankBtn.draw(ctx4);

      // this.shareBtn.update();
      // this.shareBtn.draw(ctx4);

      this.retryBtn.update();
      this.retryBtn.draw(ctx4);

    }

    // ctx4.drawText("#FFFFFF", 16, "left", "FPS : "+FPS, 10, canvasHeight-20);

    // ctx4.restore();

    ctx4.drawAnimatedBlackScreen(onBlackScreenCompletion);

    _scr = null;
    bsTxt = null;
    xOff = null;
    yOff = null;

    ///////////////////////////////////////////////////////////////////////////////////

  }

  drawGameName(ctx, _scr, xOff, yOff) {

    var _clr = this.colorIndex >= 0 ? colors[this.colorIndex] : "#FFFFFF";

    ctx.drawText(_clr, 36, "center", " " + _scr + " ", xOff, 40 - yOff);

    _clr = null;

    ctx.fillStyle = "#993eba";
    ctx.beginPath();
    ctx.arc(xOff + 53, canvasHeight / 2 - 196.5, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.drawText("#f4d744", 45, "center", " FATAO ", xOff, canvasHeight / 2 - 180);
    ctx.drawText("#ffffff", 45, "center", " FATAO ", canvasWidth / 2, canvasHeight / 2 - 180);

    if (frames % 100 === 0) this.scoreQuake = 5;
  }

  removePup(i) {
    this.createSplash(7, this.pups[i].x, this.pups[i].y, 10, 15, this.pups[i].fill, 150, .5);

    if (this.particlePool.length > 0 && FPS >= 45) {
      let __p = this.particlePool.pop();
      __p.set(this.pups[i].x, this.pups[i].y, 0, 0, 30, this.pups[i].fill, 150, true, false, -1.5, true, null, null, null, .035, 0);
      this.particle.push(__p);
    }

    // this.powerNum = 0;

  }

}
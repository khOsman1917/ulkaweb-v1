var preloadedRewardedVideo = null;

var GameState = State.extend({

  initQuake: function() {
    this.quakeTime = 50;
    this.quakeVal = 0;

    this.quakeX = false;
    this.quakeY = false;

    this.quakedX = false;
    this.quakedY = false;
  },

  init: function(game) {
    this._super(game);

    onBlackScreenCompletion = null;
    blackScreenAlphaDec = true;
    blackScreenAlphaInc = false;

    frames = 0;
    particles = {};
    particleIndex = 0;
    aniNum = {};
    aniNumIndex = 0;

    this.particle = [];

    translateX = 0;
    translateY = 0;

    if (bestScore > 3 && tutorialShown === 0) {
      tutorialShown = 1;
      // FBInstant.player.setDataAsync({
      // 	lafaoTutorial: tutorialShown
      // });
    }

    this.showTut = true;

    this.tutAlpha = 1;
    this.continueAlpha = 0;
    this.continue_ = false;

    this.toastAlpha = 0;
    this.showToast = false;
    this.toastMsg = "";

    this.btnY_To = (canvasHeight - moveAmt / scale) / 2 + 50;
    this.btnY_From = (canvasHeight - moveAmt / scale) / 2 + 400;

    this.btnRetryY = this.btnY_From;

    this.btnLeadY = this.btnY_From;

    this.btnShareY = this.btnY_From;

    this.showMenu = false;

    this.initQuake();

    this.starCount = 0;
    this.pause = false;

    this.bars = [];
    this.star = [];

    this.transitionLimit = 75;

    this.hero = new Hero(this.transitionLimit, (canvasHeight - moveAmt / scale) / 2 - 300, 17, 17);

    this.goBack = false;
    this.canJump = false;
    this.jumpLimit = 0;

    this.waitCount = 0;

    this.score = 0;
    this.scored = false;

    this.platform = new Bar(this.transitionLimit - 30 * 17 + this.hero.height, (canvasHeight - moveAmt / scale) / 2 + 20, 30);

    this.generateBar();

  },

  generateBar: function() {
    var __w = Math.round(map(this.score, 0, 4, 6, 2));
    if (__w >= 6) __w = 6;
    if (this.score > 4) __w = Math.floor(Math.random() * 4) + 1;

    var __xrange = Math.round(map(this.score, 0, 7, 200, 145));
    if (__xrange <= 145) __xrange = 145;
    if (__xrange >= 200) __xrange = 200;
    var __x = Math.round(Math.random() * (canvasWidth - __xrange - __w * 17)) + 140;

    var __yrange = Math.round(map(this.score, 0, 7, 0, 120));
    if (__yrange >= 120) __yrange = 120;
    var __y = (canvasHeight - moveAmt / scale) / 2 + 20 + Math.round(Math.random() * __yrange - __yrange / 2.2);

    if (__w === 1) __x = (Math.random() * (canvasWidth - 240 - __w * 17)) + 175;

    if (__y >= (canvasHeight - moveAmt / scale) / 2 + 20 + 40 &&
      __w < 4 && __x <= 170) {
      __x = 170;
    } else if (__y <= (canvasHeight - moveAmt / scale) / 2 + 20 - 50 && __x <= 155) {
      __x = 155;
    } else if (__y <= (canvasHeight - moveAmt / scale) / 2 + 20 - 40 && __x >= canvasWidth - 90) {
      __x = canvasWidth - 90;
    }

    var __uRfactor = this.score < 30 ? .7 : .5;
    if (this.score > 15 && this.score < 50 && __w > 1 && Math.random() > __uRfactor) {
      var __u = true;
    } else if (this.score >= 50 && Math.random() > __uRfactor) {
      var __u = true;
    } else {
      var __u = false;
    }

    var __bar = new Bar(__x, __y, __w, __u);
    this.bars.push(__bar);

    if ((Math.random() > .7 && this.score > 5 && this.score < 30) || (Math.random() > .5 && this.score >= 30)) {
      var ___s = new Star(__x + Math.floor(__w * 17) / 2, __y - 15);
      this.star.push(___s);
      ___s = null;
    }

    __w = null;
    __x = null;
    __y = null;
    __xrange = null;
    __yrange = null;
    __bar = null;
    __u = null;
    __uRfactor = null;

    this.scored = false;
  },

  handleInputs: function(input) {

    if (input.isDown("enter")) {

      if (xDown >= canvasWidth - 60 && xDown <= canvasWidth &&
        yDown >= -moveAmt / scale && yDown <= 60 - moveAmt / scale) {

        xDown = null;
        yDown = null;
        this.showMenu = !this.showMenu;
        if (!this.continue_) this.showTut = this.showMenu;
        input.down[input.keys[13]] = false;
      } else {

        if (this.showMenu) {

          if (this.btnShareY === this.btnY_To) {

           if (xDown >= (canvasWidth - _btnMenu.width / 1.6) / 2 && xDown <= (canvasWidth + _btnMenu.width / 1.6) / 2 &&
              yDown >= this.btnRetryY && yDown <= this.btnRetryY + _btnMenu.height / 1.6) {

                xDown = null;
                yDown = null;
                input.down[input.keys[13]] = false;
                this.restart();
            } 

          }

          if (this.continue_) {
            if (xDown >= (canvasWidth - _btnVideoAd.width / 1.6) / 2 && xDown <= (canvasWidth + _btnVideoAd.width / 1.6) / 2 &&
              yDown >= (canvasHeight - moveAmt / scale) / 2 - 75 && yDown <= (canvasHeight - moveAmt / scale) / 2 - 75 + _btnVideoAd.height / 1.6) {

              xDown = null;
              yDown = null;



              input.down[input.keys[13]] = false;
            }
          }

        } else if (this.hero.x <= this.transitionLimit) {
          this.canJump = true;
          this.goBack = true;

          if (tutorialShown === 0 && this.score === 3) this.showTut = false;
        }
      }

    } else {
      this.goBack = false;
    }

    if (input.isPressed("spaceBar") && !this.showMenu) {
      if (this.canJump) this.jumpLimit = this.transitionLimit - this.hero.x;

      if (this.jumpLimit >= 200) this.jumpLimit = 200;
      if (this.jumpLimit <= 10) this.jumpLimit = 10;
    }

  },


  initLeaderboard: function() {
    var _this = this;
    if (this.score > bestScore) bestScore = this.score;

  },

  show_Leaderboard: function() {

  },


  makeQuakeX: function() {
    if (!this.quakedX) {
      this.quakeVal = 5;
      this.quakeX = true;
      this.quakedX = true;
    }
  },

  makeQuakeY: function() {
    if (!this.quakedY) {
      this.quakeVal = 7;
      this.quakeY = true;
      this.quakedY = true;
    }
  },

  update: function() {

    // frames++;

    // if(frames >= 1000) frames = 0;

    this.hero.update();

    var __h = {
        x: this.hero.x,
        y: this.hero.y,
        w: this.hero.width,
        h: this.hero.height
      },
      __p = {
        x: this.platform.x,
        y: this.platform.y,
        w: this.platform.width,
        h: this.platform.height
      },
      __b = this.bars[0] ? {
        x: this.bars[0].x,
        y: this.bars[0].y - 2,
        w: this.bars[0].width,
        h: this.bars[0].height
      } : null;

    if (rectIntersect(__h, __p)) {
      if (this.hero.y <= this.platform.y - this.hero.height + 20) {
        this.hero.y = this.platform.y - this.hero.height;
        this.hero.y_vel = 0;
      } else {
        this.hero.x_vel += 2;
      }

      if (this.goBack) {
        this.hero.x_vel = -1.5;
        this.hero.skewAmt = .07;
        this.hero.wabbleScale = .1;
      } else {
        if (this.canJump) {
          this.hero.x_vel = 8;
          this.hero.skewAmt = -.2;
          this.hero.wabbleScale = .3;
        } else {
          if (this.hero.x <= this.transitionLimit) this.hero.x = this.transitionLimit;
        }
      }

    }

    __h = {
      x: this.hero.x,
      y: this.hero.y,
      w: this.hero.width,
      h: this.hero.height
    };
    __p = {
      x: this.platform.x,
      y: this.platform.y,
      w: this.platform.width,
      h: this.platform.height
    };
    __b = this.bars[0] ? {
      x: this.bars[0].x,
      y: this.bars[0].y - 2,
      w: this.bars[0].width,
      h: this.bars[0].height
    } : null;

    if (__b && rectIntersect(__h, __b)) {
      this.bars[0].updown = false;
      if (this.hero.y + this.hero.height <= this.bars[0].y + 5) {
        this.hero.y = this.bars[0].y - this.hero.height;
        this.hero.y_vel = 0;

        if (this.hero.x <= this.transitionLimit) this.hero.x = this.transitionLimit;

        if (this.hero.x > this.transitionLimit) {
          if (this.waitCount >= 5) {
            this.waitCount = 5;

            if (this.bars[0].y === this.platform.y) {
              this.hero.x_vel = -12;
              this.bars[0].x -= 12;
            } else {
              this.bars[0].y -= (this.bars[0].y - this.platform.y) / 5;
              this.hero.y = this.bars[0].y - this.hero.height;

              if (Math.abs(this.bars[0].y - this.platform.y) <= .2) this.bars[0].y = this.platform.y;
            }

          } else {
            this.waitCount += .2;
            this.hero.x_vel = 0;
          }
        } else {
          this.hero.x_vel = 0;
          this.waitCount = 0;
          this.bars[0].x -= 12;

          this.hero.x = this.transitionLimit;
        }

        if (!this.scored) {
          this.score++;
          this.scored = true;
        }

      } else {
        this.hero.x_vel = 0;
        this.hero.y_vel = 0;
        if (this.hero.x + this.hero.width < this.bars[0].x + 7) {
          this.hero.x_vel -= 2;
          this.makeQuakeX();
        } else if (this.hero.x > this.bars[0].x + this.bars[0].width - 7) {
          this.hero.x_vel += 2;
          this.makeQuakeX();
        } else {
          if (this.hero.y + this.hero.height <= this.bars[0].y + 25) {
            this.hero.y = this.bars[0].y - this.hero.height;
            if (!this.scored) {
              this.score++;
              this.scored = true;
            }
          } else {
            if (this.hero.x + this.hero.width < this.bars[0].x + this.bars[0].width / 2) {
              this.hero.x_vel -= 2;
              this.makeQuakeX();
            } else if (this.hero.x >= this.bars[0].x + this.bars[0].width / 2) {
              this.hero.x_vel += 2;
              this.makeQuakeX();
            }
          }
        }
      }
    } else if (this.waitCount >= 5) {
      this.hero.y_vel = 0;
      this.waitCount = 0;
      this.hero.x = this.transitionLimit;
    }

    __h = {
      x: this.hero.x,
      y: this.hero.y,
      w: this.hero.width,
      h: this.hero.height
    };
    var __s = this.star[0] ? {
      x: this.star[0].x - 2,
      y: this.star[0].y - 2,
      w: 4,
      h: 4
    } : null;

    if (__s && rectIntersect(__h, __s)) {
      this.score++;
      new AnimateNum(this.star[0].x, this.star[0].y - 20, "+1", .01);
      this.star.splice(0, 1);
    }

    if (this.score > bestScore) bestScore = this.score;

    if (this.hero.y >= (canvasHeight - moveAmt / scale) / 2 + 350) {

      this.makeQuakeY();

      this.hero.y = (canvasHeight - moveAmt / scale) / 2 + 350;
      this.hero.y_vel = 0;
      this.hero.x_vel = 0;
      this.goBack = false;
      this.canJump = false;

      // FBInstant.player.setDataAsync({
      //   lafaoScore: bestScore
      // });

      if (this.score <= 10) {
        this.restart();
      } else {
        this.continueAlpha += this.continueAlpha < 1 ? .05 : 0;
        this.continue_ = true;
        this.showMenu = true;
      }

    } else if (this.hero.x >= this.transitionLimit - 8 && this.canJump && !this.goBack) {

      this.hero.y_vel -= map(this.jumpLimit, 10, 200, 2.5, 12.25);

      if (!rectIntersect(__h, __p) && !rectIntersect(__h, __b)) {
        this.canJump = false;
        this.hero.skewAmt = 0;
      }

      this.particle.push(new Particle(this.hero.x, this.hero.y + this.hero.height, 0, -.2, 2, "#E4DDFB", 100, true, true, -.2, null, null, null, null, .03));
    }


    if (this.hero.x <= 10) {
      translateX = -this.hero.x + 10;
    }

    __h = null;
    __p = null;
    __b = null;
    __s = null;

    if (tutorialShown === 0 && this.score === 3) this.showTut = true;

    if (this.showTut) {
      this.tutAlpha += this.tutAlpha < 1 ? .05 : 0;
    } else {
      this.tutAlpha -= this.tutAlpha > 0 ? .05 : 0;
    }

    if (this.score > 0 && !this.showMenu) this.showTut = false;
    if (this.score === 0) this.showTut = true;

    if (this.continue_) {
      this.continueAlpha += this.continueAlpha < 1 ? .05 : 0;
    } else {
      this.continueAlpha -= this.continueAlpha > 0 ? .05 : 0;
    }

    if (this.showToast) {
      this.toastAlpha += this.toastAlpha < 1 ? .05 : 0;
    } else {
      this.toastAlpha -= this.toastAlpha > 0 ? .05 : 0;
    }

    if (this.showMenu) {
      this.btnRetryY += (this.btnY_To - this.btnRetryY) / 4;
      if (Math.abs(this.btnY_To - this.btnRetryY) < .1) this.btnRetryY = this.btnY_To;

      this.btnLeadY += (this.btnY_To - this.btnLeadY) / 6;
      if (Math.abs(this.btnY_To - this.btnLeadY) < .1) this.btnLeadY = this.btnY_To;

      this.btnShareY += (this.btnY_To - this.btnShareY) / 8;
      if (Math.abs(this.btnY_To - this.btnShareY) < .1) this.btnShareY = this.btnY_To;
    } else {

      if (Math.abs(this.btnY_From - this.btnRetryY) < 50) {
        this.btnRetryY = this.btnY_From;
      } else {
        this.btnRetryY += 80 / (this.btnY_From - this.btnRetryY) * 80;
      }

      if (Math.abs(this.btnY_From - this.btnLeadY) < 50) {
        this.btnLeadY = this.btnY_From;
      } else {
        this.btnLeadY += 60 / (this.btnY_From - this.btnLeadY) * 80;
      }

      if (Math.abs(this.btnY_From - this.btnShareY) < 50) {
        this.btnShareY = this.btnY_From;
      } else {
        this.btnShareY += 40 / (this.btnY_From - this.btnShareY) * 80;
      }
    }

  },

  restart: function() {
    // FBInstant.player.setDataAsync({
    //   lafaoScore: bestScore
    // });
    onBlackScreenCompletion = States.GAME;
    blackScreenAlphaDec = false;
    blackScreenAlphaInc = true;
  },

  revive: function() {
    this.hero.x = this.transitionLimit;
    this.hero.y = (canvasHeight - moveAmt / scale) / 2 - 300;
    this.hero.history = [];
    this.continue_ = false;
    this.showMenu = false;
    this.showToast = false;

    this.initQuake();
  },

  render: function(ctx) {
    ctx.drawBackground();

    _cloudTop.draw(ctx, (canvasWidth - _cloudTop.width / .65) / 2, -moveAmt / scale, .65);

    ctx.drawText("#FFFFFF", 16, "left", " Best ", 8, 22 - moveAmt / scale);

    var __bscore = (bestScore < 10 && bestScore > 0) ? "0" + bestScore : bestScore;
    ctx.drawText("#FFFFFF", 16, "left", " " + __bscore + " ", 8, 42 - moveAmt / scale);
    __bscore = null;

    _btnMenu.draw(ctx, canvasWidth - 10 - _btnMenu.width / 1.6, 10 - moveAmt / scale, 1.6);

    var __score = (this.score < 10 && this.score > 0) ? "0" + this.score : this.score;
    var __scoreY = ((canvasHeight - moveAmt / scale) / 2 - 195 <= (30 - moveAmt / scale)) ? (30 - moveAmt / scale) : ((canvasHeight - moveAmt / scale) / 2 - 195);

    ctx.drawText("#E4DDFB", 30, "center", " " + __score + " ", canvasWidth / 2, __scoreY);
    __score = null;
    __scoreY = null;

    ctx.save();

    if (this.quakeVal > .05) {
      this.quakeVal -= .5;
    } else {
      this.quakeVal = 0;
    }

    var xQ = 0,
      yQ = 0;

    if (this.quakeX) xQ = animate(Math.round(this.quakeVal), this.quakeTime, 0, Math.PI / 2);
    if (this.quakeY) yQ = animate(Math.round(this.quakeVal), this.quakeTime, 0, Math.PI / 2);

    ctx.translate(translateX + xQ, translateY + yQ);

    xQ = null;
    yQ = null;

    for (var a in aniNum) {
      aniNum[a].draw(ctx);
    }

    for (var s = 0; s < this.star.length; s++) {
      this.star[s].draw(ctx);
    }

    for (var i = 0, len = this.particle.length; i < len; i++) {
      if (particles[this.particle[i].id]) {
        this.particle[i].update();
        this.particle[i].draw(ctx);
      } else {
        this.particle.splice(i, 1);
        len--;
        i--;
        //  break;
      }
    }

    this.hero.draw(ctx);

    for (var i = 0; i < this.bars.length; i++) {
      this.bars[i].draw(ctx);
      if (this.star[0]) {
        this.star[0].x = this.bars[i].x + Math.floor(this.bars[i].width / 2);
        this.star[0].y = this.bars[i].y - 15;
      }
      if (this.bars[i].x < this.transitionLimit - this.bars[i].width) {
        this.bars.splice(i, 1);
        if (this.star[0]) this.star.splice(0, 1);
        this.generateBar();
      }
    }

    this.platform.draw(ctx);

    ctx.restore();

    if (this.tutAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = this.tutAlpha;
      if (this.score < 3) {
        ctx.drawText("#E4DDFB", 37, "center", " L A F A O ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 115);
        ctx.drawText("#E4DDFB", 20, "center", " Tap & Hold to Jump ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 75);
        // ctx.drawText("#E4DDFB", 20, "center", " Let Go to Run & Jump ", canvasWidth/2, (canvasHeight - moveAmt/scale)/2 - 90);
      } else if (this.score >= 3 && this.score < 8) {
        ctx.drawText("#E4DDFB", 20, "center", " To Jump on Heigher Platforms, ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 115);
        ctx.drawText("#E4DDFB", 20, "center", " Go Back More Than Usual. ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 90);
        ctx.drawText("#E4DDFB", 20, "center", " For Lower Ones, Do Opposite. ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 65);
      } else {
        // ctx.drawText("#FFFFFF", 16, "center", " Published By ", canvasWidth/2, (canvasHeight - moveAmt/scale)/2 - 120);
        // ctx.drawText("#E4DDFB", 20, "center", " Ulka Games ", canvasWidth/2, (canvasHeight - moveAmt/scale)/2 - 95);
        ctx.drawText("#FFFFFF", 16, "center", " Developed By ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 95);
        ctx.drawText("#E4DDFB", 30, "center", " Ulka Games ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 60);
      }
      ctx.restore();
    }

    if (this.continueAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = this.continueAlpha;
      ctx.drawText("#E4DDFB", 25, "center", " Continue Playing? ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 - 115);
      ctx.drawText("#E4DDFB", 18, "center", " Watch an Ad. ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2);

      _btnVideoAd.draw(ctx, (canvasWidth - _btnVideoAd.width / 1.6) / 2, (canvasHeight - moveAmt / scale) / 2 - 75, 1.6);
      ctx.restore();
    }

    _btnRetry.draw(ctx, (canvasWidth - _btnMenu.width / 1.6) / 2, this.btnRetryY, 1.6);
    // _btnLeaderB.draw(ctx, (canvasWidth - _btnMenu.width / 1.6) / 2, this.btnLeadY, 1.6);
    // _btnShare.draw(ctx, (canvasWidth - _btnMenu.width / 1.6) / 2 + 80, this.btnShareY, 1.6);

    _cloud.draw(ctx, (canvasWidth - _cloud.width / .65) / 2, (canvasHeight - moveAmt / scale) / 2 + 30, .65);

    if (this.toastAlpha > 0) {
      ctx.save();

      if (this.toastAlpha < 1) {
        ctx.globalAlpha = this.toastAlpha;
      } else {
        ctx.globalAlpha = animate(.5, 1500, .5, Math.PI / 2);
      }

      ctx.drawText("white", 19, "center", " " + this.toastMsg + " ", canvasWidth / 2, (canvasHeight - moveAmt / scale) / 2 + 120);
      ctx.restore();
    }

    ctx.drawAnimatedBlackScreen(onBlackScreenCompletion);

  }

});
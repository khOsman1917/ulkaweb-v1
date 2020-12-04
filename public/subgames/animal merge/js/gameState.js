// "use strict";

class GameState extends State {

  constructor(game) {
    super(game);

    onBlackScreenCompletion = null;
    blackScreenAlphaDec = true;
    blackScreenAlphaInc = false;

    frames = 0;

    TWEEN.removeAll();

    this.removeTimeout();

    this.particlePool = [];
    this.particle = [];
    this.aniNumPool = [];
    this.aniNum = [];
    this.BASE_TILE = [];
    this.ADD_TILE_PATH = [];
    this.shopB_Unlocked = [];
    this.newB_Unlocked = [];
    this.playGBuildings = [];
    this.levelExpArray = [];
    this.waterRipple = [];
    this.ships = [];
    this.fxStuffs = [];
    this.sakura = [];
    this.magicParticles = [];
    this.earnedCoins = [];
    this.themes = [];
    this.cityBGs = [];
    this.messageWindows = [];
    this.slidePanel = null;
    this.shopWindow = null;
    this.leaderboard = null;
    this.playGround = null;
    this.hexprogress = null;
    this.welcomeBack = null;
    this.earnedDbl = null;
    this.settings = null;
    this.sorry = null;
    this.hasInvited = null;
    this.hasGifted = null;
    this.levelUp = null;
    this.gifted = null;
    this.giftWindow = null;
    this.newBuilding = null;
    this.botwindow = null;
    this.sureWindow = null;
    this.watchAd = null;
    this.buildAdSuccess = null;
    this.rainOfCoin = null;
    this.mascot = null;
    this.handPointer = null;
    this.entypointdata = null;
    this.fortuneWheel = null;
    this.buildings = {};
    this.gameButtonz = {};
    this.extraTutText1 = "";
    this.extraTutText2 = "";

    this.subscribeAnimShow = false;
    this.wasGifted = false;
    this.botReq = false;
    this.showResell = false;

    this.offlineMoney = 0;
    this.dueBNum = 0;

    this.extraGiftIndex = -1; // -1 => nothing, 0 => 2x Income, 1 => ad for gift

    translateX = 0;
    translateY = 0;

    this.paused = false;

    this.gameOver = false;

    this.unlockLandVal = 1;
    this.newBuildingVal = 75;
    this.maxLevel = 32;

    this.sideBtnOffset = accordingToWidth ? 0 : moveAmt / SCALE;
    this.btnYOffset = accordingToWidth ? (moveAmt / SCALE) / 2 : 0;

    this.screenPressed = false;
    this.screenLeft = false;

    this.city = GAME_DATA[3].currentCity;

    this.cityName = "Jungle Merge";

    this.BASE_TILE = GAME_DATA[this.city].bTile;

    this.ADD_TILE_PATH = GAME_DATA[this.city].aTile;

    this.level = GAME_DATA[this.city].level;
    this.levelExpArray = [40, 46, 74];
    this.currentExp = GAME_DATA[this.city].currentExp;
    this.money = GAME_DATA[this.city].money;
    this.moneyPerSec = GAME_DATA[this.city].moneyPerSec;

    for (let i = 0; i < this.ADD_TILE_PATH.length; i++) {
      if (this.ADD_TILE_PATH[i] === undefined || this.ADD_TILE_PATH[i] === null) {
        this.ADD_TILE_PATH[i] = [2, 3];
        this.ADD_TILE_PATH.splice(i + 1, 0, [0, -3]);

        if (this.level >= 25) {
          this.level = 24;
          this.currentExp = 0;
        }

        break;
      }
    }

    // console.log(this.ADD_TILE_PATH);

    this.lasttimeOfPlay = GAME_DATA[this.city].lastPlay;

    this.buildings = {
      "Images": animalList,
      "Names": AnimalNames
    };

    this.shopB_Unlocked = GAME_DATA[this.city].shopB_Unlocked;
    this.newB_Unlocked = GAME_DATA[this.city].newB_Unlocked;

    this.shopWindow = new ShopWindow(this.city);
    this.leaderboard = new Leader_Board();
    this.slidePanel = new Sidepanel(CANVASWIDTH - 12 + this.sideBtnOffset, 57 - this.btnYOffset);

    this.leaderboard.set([]);

    this.generateMsgWindows();

    this.disableButtons = false;
    this.msgWindowActive = false;

    this.playGround = new Grid(this.city, this.BASE_TILE, this.ADD_TILE_PATH);
    this.playGBuildings = GAME_DATA[this.city].buildingnum;

    this.starScale = {
      "val": 1
    };
    this.starTween = new TWEEN.Tween(this.starScale);

    this.money2xtimerReq = 90;
    this.money2xtimer = this.money2xtimerReq;
    this.incomeFactor = 1;

    this.themes = [theme_1];

    this.giftCount = GAME_DATA[this.city].giftCount >= 2000 ? GAME_DATA[this.city].giftCount : ((this.city === 0 && this.moneyPerSec === 0) ? 0 : 2000);
    this.rainOfCoin = new CoinRain();

    this.hexprogress = new Hex(0, 0, 46);
    this.dataSaved = true;

    this.mascot = new Mascot();
    this.handPointer = new HandPointer();

    this.fortuneWheel = new FortuneWheel();

    this.generateExpArray();
    this.generateGameButtons();

    this.generateAniNumPool(100);
    this.generateParticlePool(500);

    this.playMusic();

    // if(this.entypointdata && this.entypointdata.gift && this.money > 1000){
    // if(this.entypointdata.id !== PLAYER.id){
    //     this.giftCount = 4000;
    //     this.hasGifted.texts[2].text = this.entypointdata.name;
    //     this.hasGifted.fadeIn();
    //     // sayThanksForGift(this.entypointdata.name);
    // }
    // }else if(this.entypointdata && !this.entypointdata.gift){
    // if(this.entypointdata.id !== PLAYER.id){
    //     sayThanksForInvite(this.entypointdata.name);
    // }
    // }
  }

  playMusic() {
    if (GAME_DATA[3].music) this.themes[this.city].play();
  }

  tSort(mwA, mwB) {
    return mwA.startTime - mwB.startTime;
  }
  ySort(sA, sB) {
    let y1 = sA.img ? sA.y : sA.y + 60,
      y2 = sB.img ? sB.y : sB.y + 60;
    return y1 - y2;
  }

  generateEarnedCoins(x, y, inc) {
    for (let i = 0; i < 10; i++) {
      let ec = new EarnedCoin(x, y, inc);
      this.earnedCoins.push(ec);
    }
  }

  generateExpArray() {
    for (let n = 0; n < 29; n++) {
      let newN = (8 + n) + (this.levelExpArray[n + 2] - this.levelExpArray[n + 1]) + this.levelExpArray[n + 2];
      this.levelExpArray.push(newN);
    }
  }

  generateMsgWindows() {

    let _this = this;

    this.welcomeBack = new GiftWindow([
      new Button(CANVASWIDTH / 2 - 38, CANVASHEIGHT / 2 + 170, 170, 51, uiElem.inviteBtntemp, null, true, () => {

        this.money += this.offlineMoney;
        this.earnedDbl.texts[2].text = numToString(this.offlineMoney * 2, "");
        this.earnedDbl.fadeIn();
        this.welcomeBack.fadeOut();
      }, false),
      new Button(CANVASWIDTH / 2 + 94, CANVASHEIGHT / 2 + 170, 61, 49, uiElem.exitBtn_1, null, true, () => {
        this.welcomeBack.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 202,
        "text": "Welcome Back !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 80,
        "text": "you have earned",
        "color": "rgb(50, 150, 200)",
        "size": 20,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 120,
        "text": "",
        "color": "Gold",
        "size": 40,
        "align": "center",
        "stroke": "#8e3e00",
        "lw": 2
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 151,
        "text": "jungle merge",
        "color": "rgb(50, 150, 200)",
        "size": 30,
        "align": "center"
      }
    ], false);

    this.welcomeBack.set(uiElem.giftCoinBonus);
    this.welcomeBack.spinCount = 10;
    this.welcomeBack.buttons[0].setText("Double it !", 0, 5, 22, "center", "#FFFFFF");

    this.earnedDbl = new GiftWindow([
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 170, 170, 51, uiElem.inviteBtntemp, null, true, () => {
        this.earnedDbl.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 202,
        "text": "Earned Double !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 80,
        "text": "your new earning is",
        "color": "rgb(50, 150, 200)",
        "size": 20,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 120,
        "text": "",
        "color": "Gold",
        "size": 40,
        "align": "center",
        "stroke": "#8e3e00",
        "lw": 2
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 151,
        "text": "jungle merge",
        "color": "rgb(50, 150, 200)",
        "size": 30,
        "align": "center"
      }
    ], false);

    this.earnedDbl.set(uiElem.giftCoinBonus);
    this.earnedDbl.spinCount = 10;
    this.earnedDbl.buttons[0].setText("Awesome !", 0, 5, 22, "center", "#FFFFFF");

    this.sorry = new _Window(uiElem.levelUpSorryWindow, [
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 50, 79, 56, uiElem.sorryBtn, null, true, () => {
        this.sorry.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 67,
        "text": "Sorry !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 5,
        "text": "Not enough land !",
        "color": "grey",
        "size": 20,
        "align": "center"
      }
    ]);

    this.hasInvited = new _Window(uiElem.levelUpSorryWindow, [
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 50, 79, 56, uiElem.sorryBtn, null, true, () => {
        this.hasInvited.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 67,
        "text": "Firend Invited !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 5,
        "text": "We have a gift for you too !",
        "color": "grey",
        "size": 20,
        "align": "center"
      }
    ]);

    this.hasGifted = new GiftWindow([
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 170, 170, 51, uiElem.inviteBtntemp, null, true, () => {
        this.hasGifted.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 202,
        "text": "Gift Recieved !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 80,
        "text": "you have a gift from",
        "color": "rgb(50, 150, 200)",
        "size": 20,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 120,
        "text": "",
        "color": "Gold",
        "size": 40,
        "align": "center",
        "stroke": "#8e3e00",
        "lw": 2
      }
    ], false);

    this.hasGifted.set(uiElem.gift);
    this.hasGifted.spinCount = 10;
    this.hasGifted.buttons[0].setText("Awesome !", 0, 5, 22, "center", "#FFFFFF");

    this.sureWindow = new _Window(uiElem.levelUpSorryWindow, [
      new Button(CANVASWIDTH / 2 - 50, CANVASHEIGHT / 2 + 50, 71, 51, uiElem.sorryBtn, null, true, () => {
        setUpData(() => {
          this.dataSaved = false;
          this.reload();
          this.dataSaved = false;
        });
      }, false),
      new Button(CANVASWIDTH / 2 + 50, CANVASHEIGHT / 2 + 50, 65, 47, uiElem.exitBtn_1, null, true, () => {
        this.sureWindow.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 67,
        "text": "Are you Sure ?",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 5,
        "text": "Clear All data ?",
        "color": "grey",
        "size": 20,
        "align": "center"
      }
    ]);

    this.levelUp = new GiftWindow([
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 170, 170, 51, uiElem.inviteBtntemp, null, true, () => {
        this.playGround.unlockNewTile();
        this.levelUp.fadeOut();
      }, false)
      // ,
      // new Button(CANVASWIDTH/2 + 94, CANVASHEIGHT/2+170, 61, 49, uiElem.exitBtn_1, null, true, ()=>{
      //     this.playGround.unlockNewTile(); this.levelUp.fadeOut(); logFbEvent(this.cityName+"_Level_Reached_"+this.level);
      // }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 202,
        "text": "Level up !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 80,
        "text": "you have unlocked",
        "color": "rgb(50, 150, 200)",
        "size": 20,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 120,
        "text": "more space",
        "color": "Gold",
        "size": 40,
        "align": "center",
        "stroke": "#8e3e00",
        "lw": 2
      }
    ], false);

    this.levelUp.set(uiElem.expStar);
    this.levelUp.s = 1;
    this.levelUp.spinCount = 10;
    this.levelUp.buttons[0].setText("Awesome !", 0, 5, 22, "center", "#FFFFFF");
    this.levelUp.spcTxt = {
      "x": CANVASWIDTH / 2,
      "y": CANVASHEIGHT / 2 - 35,
      "text": "19",
      "color": "#904401",
      "size": 25,
      "align": "center",
      "stroke": null,
      "lw": null
    };

    this.settings = new _Window(uiElem.settingsAndInviteWindow, [
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 - 32, 149, 45,
        uiElem.settingsAndInviteBtn2, null, true, () => {
          GAME_DATA[3].sound = GAME_DATA[3].sound == true ? false : true;
          if (GAME_DATA[3].sound) {
            this.settings.buttons[0].setText("Sound : On", 0, 5, 22, "center", "#FFFFFF");
          } else {
            this.settings.buttons[0].setText("Sound : Off", 0, 5, 22, "center", "#FFFFFF");
          }

        }, false),
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 24, 149, 45,
        uiElem.settingsAndInviteBtn2, null, true, () => {
          GAME_DATA[3].music = GAME_DATA[3].music == true ? false : true;
          if (GAME_DATA[3].music) {
            this.settings.buttons[1].setText("Music : On", 0, 5, 22, "center", "#FFFFFF");
            this.playMusic();
          } else {
            this.settings.buttons[1].setText("Music : Off", 0, 5, 22, "center", "#FFFFFF");
            this.pauseMusic();
          }
        }, false),
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 80, 149, 45,
        uiElem.settingsAndInviteBtn2, null, true, () => {
          this.sureWindow.fadeIn();
          this.settings.fadeOut();
        }, false),
      new Button(CANVASWIDTH / 2 + 150, CANVASHEIGHT / 2 - 125, 50, 40, uiElem.exitBtn_1, null, true, () => {
        this.settings.fadeOut();
      }, false)
    ], [{
      "x": CANVASWIDTH / 2,
      "y": CANVASHEIGHT / 2 - 87,
      "text": "Settings",
      "color": "#FFFFFF",
      "size": 30,
      "align": "center"
    }]);

    this.settings.buttons[2].setText("clear data", 0, 5, 22, "center", "#FFFFFF");

    if (GAME_DATA[3].sound) {
      this.settings.buttons[0].setText("Sound : On", 0, 5, 22, "center", "#FFFFFF");
    } else {
      this.settings.buttons[0].setText("Sound : Off", 0, 5, 22, "center", "#FFFFFF");
    }
    if (GAME_DATA[3].music) {
      this.settings.buttons[1].setText("Music : On", 0, 5, 22, "center", "#FFFFFF");
    } else {
      this.settings.buttons[1].setText("Music : Off", 0, 5, 22, "center", "#FFFFFF");
    }

    this.watchAd = new _Window(uiElem.settingsAndInviteWindow, [
      new Button(CANVASWIDTH / 2 - 60, CANVASHEIGHT / 2 + 65, 100, 40,
        uiElem.settingsAndInviteBtn1, null, true, () => {

          let em = this.shopWindow.btnTxtz[this.dueBNum];
          this.money += em;
          this.buildAdSuccess.texts[1].text = "you\'ve got " + numToString(em, "");
          this.buildAdSuccess.fadeIn();
          this.shopWindow.adForBuildShown = true;
          setTimeout(() => {
            this.shopWindow.adForBuildShown = false;
          }, 10000);
          this.watchAd.fadeOut();
        }, false),
      new Button(CANVASWIDTH / 2 + 60, CANVASHEIGHT / 2 + 65, 100, 40,
        uiElem.inviteBtntemp, null, true, () => {
          this.watchAd.fadeOut();
        }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 87,
        "text": "Not enough money !?",
        "color": "#FFFFFF",
        "size": 25,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 25,
        "text": "Watch an Ad. and",
        "color": "grey",
        "size": 25,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2 - 90,
        "y": CANVASHEIGHT / 2,
        "text": "get it for",
        "color": "grey",
        "size": 25,
        "align": "left"
      },
      {
        "x": CANVASWIDTH / 2 + 35,
        "y": CANVASHEIGHT / 2,
        "text": "Free",
        "color": "gold",
        "size": 25,
        "align": "left",
        "stroke": "#8e3e00",
        "lw": 3
      }
    ]);

    this.watchAd.buttons[0].setText("Sure", 0, 5, 22, "center", "#FFFFFF");
    this.watchAd.buttons[1].setText("Nope", 0, 5, 22, "center", "#FFFFFF");

    this.botwindow = new _Window(uiElem.settingsAndInviteWindow, [
      new Button(CANVASWIDTH / 2 + 60, CANVASHEIGHT / 2 + 65, 90, 40,
        uiElem.settingsAndInviteBtn1, null, true, () => {
          this.botReq = true;
          this.botwindow.fadeOut();
        }, false),
      new Button(CANVASWIDTH / 2 - 60, CANVASHEIGHT / 2 + 65, 90, 40,
        uiElem.inviteBtntemp, null, true, () => {
          this.botwindow.fadeOut();
        }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 87,
        "text": "No offline reward !!",
        "color": "#FFFFFF",
        "size": 28,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 25,
        "text": "subscribe and receive",
        "color": "grey",
        "size": 25,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 10,
        "text": "Double offline rewards.",
        "color": "grey",
        "size": 25,
        "align": "center"
      }
    ]);

    this.botwindow.buttons[0].setText("yes", 0, 5, 22, "center", "#FFFFFF");
    this.botwindow.buttons[1].setText("no", 0, 5, 22, "center", "#FFFFFF");

    this.buildAdSuccess = new _Window(uiElem.settingsAndInviteWindow, [
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 75, 79, 56, uiElem.sorryBtn, null, true, () => { // 85
        this.buildAdSuccess.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 87,
        "text": "Fee Earned !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 25,
        "text": "",
        "color": "grey",
        "size": 25,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 10,
        "text": "for desired pet !",
        "color": "grey",
        "size": 25,
        "align": "center"
      }
    ]);

    this.giftWindow = new GiftWindow([
      new Button(CANVASWIDTH / 2 - 38, CANVASHEIGHT / 2 + 170, 170, 51, uiElem.inviteBtntemp, null, false, () => {
        this.giftWindow.endCall = 0;
        this.giftWindow.fadeOut();

        GAME.currentState.generateEarnedCoins(CANVASWIDTH / 2, CANVASHEIGHT / 2 - 45, (GAME.currentState.moneyPerSec * 300) / 10);
        setTimeout(() => {
          GAME.currentState.generateEarnedCoins(CANVASWIDTH / 2, CANVASHEIGHT / 2 - 45, (GAME.currentState.moneyPerSec * 300) / 10);
        }, 500);

      }, false),
      new Button(CANVASWIDTH / 2 + 94, CANVASHEIGHT / 2 + 170, 61, 49, uiElem.exitBtn_1, null, true, () => {
        this.giftWindow.fadeOut();
      }, false),
      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 170, 170, 51, uiElem.inviteBtntemp, null, false, () => {
        this.giftWindow.fadeOut();
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 200,
        "text": "Get Rewarded !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 80,
        "text": "",
        "color": "rgb(50, 150, 200)",
        "size": 20,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 120,
        "text": "",
        "color": "gold",
        "size": 20,
        "align": "center",
        "stroke": "#8e3e00",
        "lw": 2
      }
    ], true);

    this.giftWindow.buttons[0].setText("get 2x more !", 0, 5, 22, "center", "#FFFFFF");
    this.giftWindow.buttons[2].setText("receive", 0, 5, 22, "center", "#FFFFFF");

    this.newBuilding = new SpecialWindow(uiElem.rewardWindow, {
      "x": CANVASWIDTH / 2,
      "y": CANVASHEIGHT / 2 - 45
    }, [

      new Button(CANVASWIDTH / 2, CANVASHEIGHT / 2 + 170, 170, 51, uiElem.inviteBtntemp, null, true, () => {
        this.newBuilding.fadeOut();
        if (this.playGBuildings === 1 && this.moneyPerSec === 4) this.generateEarnedCoins(CANVASWIDTH / 2, CANVASHEIGHT / 2 - 45, (10000) / 10);
      }, false)
    ], [{
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 - 200,
        "text": "Congratulations !",
        "color": "#FFFFFF",
        "size": 30,
        "align": "center"
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 115,
        "text": "",
        "size": 32,
        "align": "center",
        "color": "gold",
        "stroke": "#8e3e00",
        "lw": 2
      },
      {
        "x": CANVASWIDTH / 2,
        "y": CANVASHEIGHT / 2 + 80,
        "text": "new pet unlocked",
        "color": "rgb(50, 150, 200)",
        "size": 20,
        "align": "center"
      }
    ]);
    this.newBuilding.buttons[0].setText("Fantastic !", 0, 5, 22, "center", "#FFFFFF");

    this.messageWindows.push(this.welcomeBack, this.earnedDbl, this.settings, this.watchAd, this.botwindow, this.buildAdSuccess, this.sorry, this.hasInvited, this.hasGifted, this.sureWindow, this.levelUp, this.giftWindow, this.newBuilding);
  }

  greetUserWithEarning(fromPause) {
    if (this.moneyPerSec) {

      if (this.city === 0) {
        if (this.playGBuildings === 2 && (this.moneyPerSec === 2 || this.moneyPerSec === 4)) {
          this.showTapOrSwipe();
          return;
        } else if (this.playGBuildings === 1 && this.moneyPerSec === 4) {
          this.showBuild();
          return;
        }
      }

      let t = new Date().getTime() - this.lasttimeOfPlay;
      if (t >= 5 * 60 * 60 * 1000) t = 5 * 60 * 60 * 1000; // limit offline earnings to 5 hours
      let m = this.moneyPerSec * (t / 1000);

      if (!fromPause && this.entypointdata && this.entypointdata.bot_coin && Number(this.entypointdata.bot_coin) > 0) {
        m *= Number(this.entypointdata.bot_coin);
        this.entypointdata = null;
      }
      this.money += m;
      this.offlineMoney = m;

      if (t > 50000) {
        this.welcomeBack.texts[2].text = numToString(m, "");
        this.welcomeBack.fadeIn();
      }

      let loopCount = Math.floor(t / (NumberClicksToBuildHouse[this.city] * 750));
      for (let i = 0; i < loopCount; i++) {
        if (this.moneyPerSec > 4) this.generateNewBuilding();
      }
    } else {
      if (this.city === 0) {
        if (this.playGBuildings === 0) {
          this.generateNewBuilding(-2, 3);
          this.generateNewBuilding(-2, 4);
        }
        this.mascot.proceed = true;
        this.mascot.greetUser();
        this.showHandTut();


      } else {
        for (let i = 0; i < 6; i++) {
          this.generateNewBuilding();
        }
      }
    }

  }

  pauseMusic() {
    for (let i = 0; i < this.themes.length; i++) {
      this.themes[i].pause();
    }
  }

  reload() {

    onBlackScreenCompletion = States.MENU;
    blackScreenAlphaDec = false;
    blackScreenAlphaInc = true;

    this.pauseMusic();

    this.removeTimeout();

  }

  removeTimeout() {
    // Set a fake timeout to get the last timeout id
    var lastTimeoutID = setTimeout(";");
    // clear all timeouts with an id between 0 and last timeout id
    for (var i = 0; i < lastTimeoutID; i++) {
      clearTimeout(i);
    }
  }

  generateGameButtons() {

    let _this = this,

      giftButton = new Button(CANVASWIDTH / 2 - 130, 75 - this.btnYOffset, 42, 45, newWorldElem.gift,
        null, false, () => {
          if (this.playGround.tiles.length > this.playGBuildings) {
            this.giftCount = 0;
            this.gameButtonz["giftButton"].active = false;
            this.gameButtonz["giftButton"].animation = true;
            GAME_DATA[3].giftTut = true;

            this.extraGiftIndex = (this.extraGiftIndex === -1) ? 0 : ((this.extraGiftIndex === 0) ? 1 : 0);

            this.generateNewBuilding(-1);
            if (this.city === 0 && this.handPointer.x.val === this.gameButtonz["giftButton"].x && this.handPointer.y.val === this.gameButtonz["giftButton"].y) {
              this.handPointer.fadeOut(() => {
                this.handPointer.x.val = CANVASWIDTH / 2;
                this.handPointer.y.val = -CANVASHEIGHT / 2;
              });
            }

            if (this.subscribeAnimShow) {
              this.subscribeAnimShow = false;
              setTimeout(() => {
                this.botwindow.fadeIn();
              }, 2000);
            }


          } else {
            this.sorry.fadeIn();
            if (GAME_DATA[3].sound) landLessSound.play();
          }
        }, true, true),

      x2Button = new Button(CANVASWIDTH / 2 - 130, 75 - this.btnYOffset, 50, 42, uiElem.ad2xcoin,
        null, false, () => {
          this.rainOfCoin.respawn = true;
          this.gameButtonz["x2Button"].active = false;
          this.gameButtonz["x2Button"].animation = true;
          GAME_DATA[3].x2Tut = true;

          if (this.handPointer.x.val === this.gameButtonz["x2Button"].x && this.handPointer.y.val === this.gameButtonz["x2Button"].y) {
            this.handPointer.fadeOut(() => {
              this.handPointer.x.val = CANVASWIDTH / 2;
              this.handPointer.y.val = -CANVASHEIGHT / 2;
            });
          }
        }, true, true),

      spinButton = new Button(CANVASWIDTH / 2 - 130, 75 - this.btnYOffset, 45, 45, uiElem.wheel_icon,
        null, false, () => {
          this.fortuneWheel.fadeIn();
          this.gameButtonz["spinButton"].active = false;
          this.gameButtonz["spinButton"].animation = true;
          GAME_DATA[3].spinTut = true;
          if (this.handPointer.x.val === this.gameButtonz["spinButton"].x && this.handPointer.y.val === this.gameButtonz["spinButton"].y) {
            this.handPointer.fadeOut(() => {
              this.handPointer.x.val = CANVASWIDTH / 2;
              this.handPointer.y.val = -CANVASHEIGHT / 2;
            });
          }
        }, true, true),

      adGiftButton = new Button(CANVASWIDTH / 2 - 130, 75 - this.btnYOffset, 50, 42, uiElem.adsforgift,
        null, false, () => {
          if (this.playGround.tiles.length > this.playGBuildings) {

            this.gameButtonz["adGiftButton"].active = false;
            if (this.playGround.tiles.length > this.playGBuildings) {
              this.generateNewBuilding(-1);
            } else {
              this.sorry.fadeIn();
              this.giftCount = 4000;
              if (GAME_DATA[3].sound) landLessSound.play();
            }

          } else {
            this.sorry.fadeIn();
            if (GAME_DATA[3].sound) landLessSound.play();
          }
        }, true, true),

      socialBtn = new Button(40, CANVASHEIGHT - 110 + this.btnYOffset, 53, 54, uiElem.socialBtn,
        null, true, () => {
          /*_this.leaderboard.set([]); _this.leaderboard.fadeIn();*/
          setLeaderboard(GAME_DATA[0].moneyPerSec, () => {
            getLeaderboard(_this.leaderboard);
          });
        }, false),

      qShopBtn = new Button(CANVASWIDTH - 45, CANVASHEIGHT - 110 + this.btnYOffset, 44, 45, newWorldElem.ss,
        uiElem.quickshop_disable, true, () => {
          this.quickShop(this.shopWindow.setScrollval());
          if (this.city === 0 &&
            this.handPointer.a.val === 1 && this.handPointer.x.val === this.gameButtonz["qShopBtn"].x && this.handPointer.y.val === this.gameButtonz["qShopBtn"].y) {
            this.handPointer.fadeOut(() => {
              this.handPointer.x.val = CANVASWIDTH / 2;
              this.handPointer.y.val = -CANVASHEIGHT / 2;
            });
          }
        }, false),

      settingsBtn = new Button(40, CANVASHEIGHT - 50 + this.btnYOffset, 53, 54, uiElem.settingsBtn,
        null, true, () => {
          this.settings.fadeIn();
        }, false),

      storeBtn = new Button(CANVASWIDTH - 45, CANVASHEIGHT - 50 + this.btnYOffset, 64, 53, newWorldElem.shop,
        null, true, () => {
          _this.shopWindow.setScrollval();
          _this.shopWindow.fadeIn();
        }, false),

      buildBtn = new Button(CANVASWIDTH / 2, CANVASHEIGHT - 67 + this.btnYOffset, 97,
        84, uiElem.buildBtnBack_png1,
        uiElem.buildBtnBack_png2, true, () => {
          if (this.newBuildingVal > 0) this.newBuildingVal -= this.hexprogress.active === false ? 75 / (NumberClicksToBuildHouse[this.city] * 4) : 75 / (NumberClicksToBuildHouse[this.city] * 2);
          this.gameButtonz["buildBtn"].buttonSoundPlay = false;

          if (this.handPointer.a.val === 1 && this.handPointer.x.val === this.gameButtonz["buildBtn"].x && this.handPointer.y.val === this.gameButtonz["buildBtn"].y) {
            this.handPointer.fadeOut(() => {
              this.handPointer.x.val = CANVASWIDTH / 2;
              this.handPointer.y.val = -CANVASHEIGHT / 2;
            });
          }

          this.extraTutText1 = "";
          this.extraTutText2 = "";
        }, false);
    buildBtn.keepPressed = true;

    this.gameButtonz["giftButton"] = giftButton;
    this.gameButtonz["x2Button"] = x2Button;
    this.gameButtonz["adGiftButton"] = adGiftButton;
    this.gameButtonz["spinButton"] = spinButton;
    this.gameButtonz["socialBtn"] = socialBtn;
    this.gameButtonz["settingsBtn"] = settingsBtn;
    this.gameButtonz["storeBtn"] = storeBtn;
    this.gameButtonz["qShopBtn"] = qShopBtn;
    this.gameButtonz["buildBtn"] = buildBtn;

  }

  generateParticlePool(n) {
    for (let i = 0; i < n; i++) {
      this.particlePool.push(new Particle());
    }

  }

  generateAniNumPool(n) {
    for (let i = 0; i < n; i++) {
      this.aniNumPool.push(new AnimateNum());
    }
  }

  generateNewBuilding(n, _i) {
    let v = n ? n : -2;

    if (this.playGround.tiles.length > this.playGBuildings) {
      let randTile = _i ? _i : Math.floor(Math.random() * this.playGround.tiles.length);
      if (this.playGround.tiles[randTile].val === -3) {
        // create building at this tile's position
        let t = this.playGround.tiles[randTile],
          x = t.x,
          y = t.y,
          b = new Building(x, y);
        t.val = v;
        t.building = b;
        this.playGBuildings++;
        if (GAME_DATA[3].sound) showboxSound.play();
      } else {
        this.generateNewBuilding(v, _i);
      }
    }
  }

  showHandTut() {
    if (this.moneyPerSec === 0) {
      this.handPointer.fadeIn();
      let _x = this.playGround.tiles[4].val < 0 ? this.playGround.tiles[4].x : this.playGround.tiles[3].x;
      this.handPointer.showTapIndicator(_x, this.playGround.tiles[4].y);
    } else if (this.moneyPerSec === 2) {
      this.handPointer.fadeIn();
      let _x = this.playGround.tiles[3].val < 0 ? this.playGround.tiles[3].x : this.playGround.tiles[4].x;
      this.handPointer.showTapIndicator(_x, this.playGround.tiles[3].y);
    }

    this.extraTutText1 = "Tap on the box to";
    this.extraTutText2 = "uncover the pet";
  }

  isGridFull() {
    if (this.playGround.tiles.length > this.playGBuildings) {
      return false;
    }

    return true;
  }

  handleInputs(input) {

    this.screenPressed = input.isPressed("enter");
    this.screenLeft = input.isPressed("spaceBar");
    if (this.shopWindow.active) this.shopWindow.handleInputs(input);
    if (this.leaderboard.active) this.leaderboard.handleInputs(input);

    if (this.screenLeft && this.mascot.alpha.val === 1 && this.mascot.tapToSkipAplha.val === 1) {
      this.mascot.proceed = false;
      this.mascot.getRidOf();
    }

    if (this.city === 0) {
      if (this.screenLeft && !GAME_DATA[3].swipeTut) {
        this.showTapOrSwipe();
      }

      if (this.playGBuildings === 1 && this.moneyPerSec === 4 && !GAME_DATA[3].swipeTut) {
        this.showBuild();

      }
    }

    if (this.screenPressed && this.paused) {
      myFocusFunction();
    }

    if (this.gameButtonz["buildBtn"].active && this.gameButtonz["buildBtn"].responsive && this.gameButtonz["buildBtn"].isClicked()) {
      if (this.screenPressed) {
        if (GAME_DATA[3].sound) buildSound.play();
      }
    }

  }

  showTapOrSwipe() {
    if (this.playGBuildings === 2) {
      if (this.moneyPerSec === 2) {
        this.handPointer.fadeOut(() => {
          this.showHandTut();
        });
      } else if (this.moneyPerSec === 4) {

        this.handPointer.sTween.stop();
        this.handPointer.swipe(this.playGround.tiles[3].x, this.playGround.tiles[4].x);
        this.extraTutText1 = "Drag and release";
        this.extraTutText2 = "merge two identical pets";
      }
    }
  }

  showBuild() {
    this.handPointer.stopSwipe = true;
    this.handPointer.xTween.stop();
    this.handPointer.aTween.stop();
    this.handPointer.a.val = 0;
    GAME_DATA[3].swipeTut = true;
    this.handPointer.fadeIn(() => {
      this.handPointer.showTapIndicator(this.gameButtonz["buildBtn"].x, this.gameButtonz["buildBtn"].y);
    });
    this.extraTutText1 = "Tap and hold to";
    this.extraTutText2 = "get a free pet";
  }

  quickShop(index) {

    if (this.money >= Number(this.shopWindow.btnTxtz[index])) {
      if (this.playGround.tiles.length > this.playGBuildings) {
        this.money -= this.shopWindow.btnTxtz[index];
        this.generateNewBuilding(index);
        this.shopWindow.btnTxtz[index] *= 1.15;

        this.shopWindow.saveStoreData();
        if (this.aniNumPool.length > 0) {
          let a = this.aniNumPool.pop();
          a.set(this.gameButtonz["qShopBtn"].x, this.gameButtonz["qShopBtn"].y - 25, "-" + numToString(this.shopWindow.btnTxtz[index], 0, 1), .01, -7, 15);
          this.aniNum.push(a);
        }
      } else {
        this.sorry.fadeIn();
        if (GAME_DATA[3].sound) landLessSound.play();
      }
      this.gameButtonz["qShopBtn"].responsive = true;
    } else {
      if (index > 1 && (this.shopWindow.btnTxtz[index] && index > this.shopWindow.lastUnlockedNum - 3)) {
        this.gameButtonz["qShopBtn"].responsive = false;
        this.quickShop((index - 1));
      } else {
        this.gameButtonz["qShopBtn"].responsive = true;
        this.shopWindow.fadeIn();
      }


    }

  }

  saveData() {
    let city = this.city;
    this.dataSaved = false;
    GAME_DATA[city].money = this.money;
    GAME_DATA[city].moneyPerSec = this.moneyPerSec;
    GAME_DATA[city].currentExp = this.currentExp;
    GAME_DATA[city].level = this.level;
    GAME_DATA[city].newB_Unlocked = this.newB_Unlocked.slice(0);
    GAME_DATA[city].shopB_Unlocked = this.shopB_Unlocked.slice(0);
    GAME_DATA[city].giftCount = this.giftCount;
    GAME_DATA[city].lastPlay = new Date().getTime();

    this.playGround.setTileData(city);
  }

  update(dt, frame) {

    frames++;

    if (frames > 0 && frames <= 50 && frames % 50 === 0) this.greetUserWithEarning();

    if (this.giftCount >= 4000) {
      this.gameButtonz["x2Button"].active = false;
      this.gameButtonz["adGiftButton"].active = false;

      this.gameButtonz["giftButton"].active = true;
      this.gameButtonz["giftButton"].responsive = true;

      this.gameButtonz["spinButton"].active = false;
      this.gameButtonz["spinButton"].responsive = false;

      if (this.city === 0 && !GAME_DATA[3].giftTut && this.playGround.tiles.length <= 7 && GAME_DATA[3].swipeTut) {
        this.mascot.proceed = true;
        this.mascot.announceGift();
        this.handPointer.fadeIn();
        this.handPointer.showTapIndicator(this.gameButtonz["giftButton"].x, this.gameButtonz["giftButton"].y);
        GAME_DATA[3].giftTut = true;
        this.gameButtonz["giftButton"].animation = false;
      } else {
        if (GAME_DATA[3].giftTut && this.gameButtonz["giftButton"].animation && this.handPointer.a.val === 1 && this.handPointer.x.val === this.gameButtonz["x2Button"].x && this.handPointer.y.val === this.gameButtonz["x2Button"].y) {
          this.handPointer.fadeOut(() => {
            this.handPointer.x.val = CANVASWIDTH / 2;
            this.handPointer.y.val = -CANVASHEIGHT / 2;
          });
        }
      }

    } else {
      if (this.city === 0 && GAME_DATA[3].shopTut) {
        if (!GAME_DATA[3].giftTut) {
          this.giftCount += 2;
        } else {
          this.giftCount += .5;
        }
      } else if (this.city > 0) {
        this.giftCount += .5;
      }
    }

    if (this.giftCount === 1000) {
      if (this.extraGiftIndex === 0) {
        this.gameButtonz["spinButton"].active = true;
        this.gameButtonz["spinButton"].responsive = true;

        if (this.city === 0 && !GAME_DATA[3].spinTut && GAME_DATA[3].giftTut && this.mascot.alpha.val === 0) {
          this.mascot.proceed = true;
          this.mascot.announceSpin();
          this.handPointer.fadeIn();
          this.handPointer.showTapIndicator(this.gameButtonz["spinButton"].x, this.gameButtonz["spinButton"].y);
          GAME_DATA[3].spinTut = true;
          this.gameButtonz["spinButton"].animation = false;
        }
      } else if (this.extraGiftIndex === 1) {
        // if(!this.wasGifted){
        //    this.wasGifted = true;
        //    this.gameButtonz["adGiftButton"].active = true;
        //    this.gameButtonz["adGiftButton"].responsive = true;
        // }else{
        // this.wasGifted = false;
        this.gameButtonz["x2Button"].active = true;
        this.gameButtonz["x2Button"].responsive = true;

        if (this.city === 0 && !GAME_DATA[3].x2Tut && GAME_DATA[3].giftTut && this.mascot.alpha.val === 0) {
          this.mascot.proceed = true;
          this.mascot.announceX2();
          this.handPointer.fadeIn();
          this.handPointer.showTapIndicator(this.gameButtonz["x2Button"].x, this.gameButtonz["x2Button"].y);
          GAME_DATA[3].x2Tut = true;
          this.gameButtonz["x2Button"].animation = false;
        }
        // }
      }
    }

    if (!this.isGridFull()) {
      if (this.newBuildingVal <= 0) {
        this.newBuildingVal = 75;
        if (this.hexprogress.active) {
          this.generateNewBuilding(-2.5);
        } else {
          this.generateNewBuilding();
        }

      } else {
        // if(this.gameButtonz["buildBtn"].responsive) this.newBuildingVal -= this.hexprogress.active === false ? 75/(NumberClicksToBuildHouse[this.city]*50) : 75/(NumberClicksToBuildHouse[this.city]*50 / 2);
      }

      this.gameButtonz["buildBtn"].active = true;
      if ((this.moneyPerSec === 4 && this.playGBuildings === 1) || this.moneyPerSec > 4) {
        this.gameButtonz["buildBtn"].responsive = true;
      } else {
        if (!GAME_DATA[3].swipeTut) this.gameButtonz["buildBtn"].responsive = false;
      }
      this.showResell = false;
    } else {
      this.gameButtonz["buildBtn"].active = false;
      if (this.playGround.checkVal < 0 && !this.playGround.hasBox) {
        this.showResell = true;
      } else {
        this.showResell = false;
      }
    }

    this.unlockLandVal = map(this.currentExp, 0, this.levelExpArray[this.level - 1], 0, 153);

    if (this.handPointer.x.val === this.gameButtonz["giftButton"].x && this.handPointer.y.val === this.gameButtonz["giftButton"].y) {
      if (((this.isGridFull() || this.slidePanel.active) && this.handPointer.a.val === 1) ||
        (this.handPointer.a.val === 1 && !this.gameButtonz["giftButton"].active && !this.gameButtonz["x2Button"].active && !this.gameButtonz["spinButton"].active)) {
        this.handPointer.fadeOut(() => {
          this.handPointer.x.val = CANVASWIDTH / 2;
          this.handPointer.y.val = -CANVASHEIGHT / 2;
        });
      } else if (!this.isGridFull() && this.handPointer.a.val === 0) {
        if ((this.giftCount >= 4000 && this.gameButtonz["giftButton"].active && !this.gameButtonz["giftButton"].animation) ||
          (this.giftCount < 4000 && this.gameButtonz["x2Button"].active && !this.gameButtonz["x2Button"].animation) ||
          (this.giftCount < 4000 && this.gameButtonz["spinButton"].active && !this.gameButtonz["spinButton"].animation)) {
          this.handPointer.fadeIn();
          this.handPointer.showTapIndicator(this.gameButtonz["giftButton"].x, this.gameButtonz["giftButton"].y);
        }
      }
    }

    if (this.currentExp >= this.levelExpArray[this.level - 1] && this.level < this.maxLevel) { // && this.level < lastlevel
      this.currentExp = 0;
      this.level++;
      this.levelUp.fadeIn();
      this.levelUp.buttons[0].active = true;
      this.levelUp.buttons[0].responsive = true;
      this.levelUp.spcTxt.text = this.level;

      if (GAME_DATA[3].sound) newLevelSound.play();
    }

    if (frames % 60 === 0) this.money += this.moneyPerSec * this.incomeFactor;

    this.disableButtons = this.shopWindow.active || this.leaderboard.active || this.msgWindowActive || this.slidePanel.active || this.mascot.active || this.fortuneWheel.active;
    this.playGround.responsive = !this.disableButtons;
    this.slidePanel.responsive = !this.msgWindowActive && !this.shopWindow.active && !this.leaderboard.active && !this.mascot.active && !this.fortuneWheel.active;

    if (frames % 300 === 0) this.gameButtonz["storeBtn"].rotAnim();

    if (frames % 120 === 0 && this.dataSaved) this.saveData();

    if (this.rainOfCoin.respawn === true) {
      this.incomeFactor = 2;
      if (this.money2xtimer > 0) {
        if (frames % 60 === 0) this.money2xtimer -= 1;
      } else {
        this.rainOfCoin.respawn = false;
        if (this.money2xtimerReq < 180) this.money2xtimerReq += 5;
        this.money2xtimer = this.money2xtimerReq;
        this.incomeFactor = 1;
      }
    }

    if (this.money >= Number(this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum]) ||
      (this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 1] && this.money >= Number(this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 1])) ||
      (this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 2] && this.money >= Number(this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 2]))) { // 1 initially
      // this.gameButtonz["qShopBtn"].active = true;
      // this.gameButtonz["qShopBtn"].responsive = true;
    } else {
      // this.gameButtonz["qShopBtn"].active = false;
      if (this.handPointer.a.val === 1 && this.handPointer.x.val === this.gameButtonz["qShopBtn"].x && this.handPointer.y.val === this.gameButtonz["qShopBtn"].y) this.handPointer.fadeOut();
    }

    if (frames % 300 === 0 && !this.isGridFull() && this.handPointer.a.val === 0) {
      if (this.money >= Number(this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum]) ||
        (this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 1] && this.money >= Number(this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 1])) ||
        (this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 2] && this.money >= Number(this.shopWindow.btnTxtz[this.shopWindow.lastUnlockedNum - 2]))) { // 1 initially

        this.handPointer.fadeIn();
        this.handPointer.showTapIndicator(this.gameButtonz["qShopBtn"].x, this.gameButtonz["qShopBtn"].y);
      } else if (this.gameButtonz["buildBtn"].responsive) {
        this.handPointer.fadeIn();
        this.handPointer.showTapIndicator(this.gameButtonz["buildBtn"].x, this.gameButtonz["buildBtn"].y);
        if (!GAME_DATA[3].buildTut) {
          this.showBuild();
          GAME_DATA[3].buildTut = true;
        }
      }
    } else if (this.isGridFull() || this.slidePanel.active) {
      if (this.handPointer.a.val === 1 && this.handPointer.x.val === this.gameButtonz["buildBtn"].x && this.handPointer.y.val === this.gameButtonz["buildBtn"].y) this.handPointer.fadeOut();
      if (this.handPointer.a.val === 1 && this.handPointer.x.val === this.gameButtonz["qShopBtn"].x && this.handPointer.y.val === this.gameButtonz["qShopBtn"].y) this.handPointer.fadeOut();
    }

    if (this.city === 0 && GAME_DATA[3].swipeTut && this.money >= 1000 && !GAME_DATA[3].shopTut) {
      this.mascot.proceed = true;
      this.mascot.announceShop();
      this.handPointer.fadeIn();
      this.handPointer.showTapIndicator(this.gameButtonz["qShopBtn"].x, this.gameButtonz["qShopBtn"].y);
      GAME_DATA[3].shopTut = true;
      this.extraTutText1 = "";
      this.extraTutText2 = "";
    }

  }

  render(ctx) {

    ctx.drawBackground(gameBG);

    let _yOff1 = accordingToWidth == true ? -moveAmt : 0;
    let _yOff2 = accordingToWidth == true ? CANVASHEIGHT + moveAmt : CANVASHEIGHT;

    newWorldElem.vinestop.draw(ctx, -moveAmt, _yOff1, null, CANVASWIDTH + 2 * moveAmt);
    newWorldElem.leafbottem.draw(ctx, -moveAmt, _yOff2 - newWorldElem.leafbottem.height / newWorldElem.leafbottem.scale, null, CANVASWIDTH + 2 * moveAmt);

    ctx.drawText("#FFFFFF", 22, "center", this.extraTutText1, CANVASWIDTH / 2, this.gameButtonz["buildBtn"].y - 120);
    ctx.drawText("#FFFFFF", 22, "center", this.extraTutText2, CANVASWIDTH / 2, this.gameButtonz["buildBtn"].y - 90);

    for (let btn in this.gameButtonz) {
      if (!this.disableButtons) this.gameButtonz[btn].update();
      this.gameButtonz[btn].draw(ctx);
    }

    if (this.showResell) {
      ctx.fillStyle = "rgba(0,0,0,.92)";
      ctx.fillRect(-moveAmt, this.gameButtonz["storeBtn"].y - 100, CANVASWIDTH + 2 * moveAmt, 150 + 2 * moveAmt);
      ctx.drawText("#FFFFFF", 20, "center", "Drag and drop a pet on the shop", CANVASWIDTH / 2, this.gameButtonz["storeBtn"].y - 40);
      ctx.drawText("#FFFFFF", 20, "center", "to sell the pet ...", CANVASWIDTH / 2, this.gameButtonz["storeBtn"].y - 5);
      this.gameButtonz["storeBtn"].draw(ctx);
    }

    this.playGround.draw(ctx);

    uiElem.moneyBack.draw(ctx, CANVASWIDTH / 2 - 150, 20 - this.btnYOffset, null, 145);

    uiElem.moneyPerMinBack.draw(ctx, CANVASWIDTH / 2 + 5, 20 - this.btnYOffset, null, 145);

    ctx.drawText("#555555", 22, "center", numToString(this.money, 2), CANVASWIDTH / 2 - 67, 42 - this.btnYOffset);
    ctx.drawText("#555555", 22, "center", numToString(this.moneyPerSec * this.incomeFactor, 2), CANVASWIDTH / 2 + 89, 42 - this.btnYOffset);

    if (this.rainOfCoin.respawn) ctx.drawText("yellow", 14, "center", "2x for " + Math.floor(this.money2xtimer / 60) + " m. " + Math.floor(this.money2xtimer % 60) + " s.", CANVASWIDTH / 2 + 78, 63 - this.btnYOffset, null, "#555555", 2);

    uiElem.expBack.draw(ctx, (CANVASWIDTH - 200) / 2, 55 - this.btnYOffset, null, 200);

    ctx.save();
    ctx.beginPath();
    ctx.rect((CANVASWIDTH - 152) / 2 + 18, 69 - this.btnYOffset, this.unlockLandVal, 18);
    ctx.closePath();
    ctx.clip();
    uiElem.expFgpng.draw(ctx, (CANVASWIDTH - 152) / 2 + 18, 69 - this.btnYOffset, null, 152, 18);
    ctx.restore();

    let extTxt = this.currentExp + "/" + this.levelExpArray[this.level - 1];

    ctx.drawText("#ffffff", 14, "center", extTxt, CANVASWIDTH / 2 + 10, 82 - this.btnYOffset);

    ctx.save();
    ctx.translate(CANVASWIDTH / 2 - 100 + 20, 55 - this.btnYOffset + 20);
    ctx.scale(this.starScale.val, this.starScale.val);
    uiElem.expStar.draw(ctx, -20, -20, null, 40, 40);
    ctx.drawText("#904401", 14, "center", this.level, 0, 6);
    ctx.restore();

    this.rainOfCoin.draw(ctx);

    // for(let btn in this.gameButtonz){
    //     if(!this.disableButtons) this.gameButtonz[btn].update();
    //     this.gameButtonz[btn].draw(ctx);
    // }

    let buildBtn = this.gameButtonz["buildBtn"];

    ctx.save();
    ctx.translate(buildBtn.x, buildBtn.y);
    ctx.scale(buildBtn.s, buildBtn.s);
    this.hexprogress.draw(ctx);
    ctx.beginPath();
    ctx.rect(-100 / 2, -75 / 2 + this.newBuildingVal, 100, 75);
    ctx.closePath();
    ctx.clip();
    let bbtn = this.hexprogress.active === false ? newWorldElem.buildbtn : newWorldElem.buildbtncopy;
    if (buildBtn.active) {
      bbtn.draw(ctx, -92 / 2, -80 / 2, null, 92);
    }
    ctx.restore();

    for (let i = 0, len = this.aniNum.length; i < len; i++) {
      if (this.aniNum[i].active) {
        this.aniNum[i].draw(ctx);
      } else {
        let __a = this.aniNum.splice(i, 1);
        this.aniNumPool.push(__a[0]);
        len--;
        i--;
        //  break;
      }
    }

    for (let i = 0, len = this.particle.length; i < len; i++) {
      if (this.particle[i].active) {
        this.particle[i].update();
        this.particle[i].draw(ctx);
      } else {
        let __p = this.particle.splice(i, 1);
        this.particlePool.push(__p[0]);
        len--;
        i--;
        //  break;
      }
    }

    for (let i = 0; i < this.earnedCoins.length; i++) {
      let ec = this.earnedCoins[i];
      ec.draw(ctx);

      if (ec.done) {
        TWEEN.remove(ec.posTween);
        this.earnedCoins.splice(i, 1);
      }
    }

    for (let i = 0; i < this.magicParticles.length; i++) {
      let mgkP = this.magicParticles[i];
      mgkP.draw(ctx);

      if (mgkP.done) {
        TWEEN.remove(mgkP.posTween);
        this.magicParticles.splice(i, 1);
      }
    }

    this.slidePanel.draw(ctx);

    this.handPointer.draw(ctx);

    this.shopWindow.update();
    this.shopWindow.draw(ctx);

    this.leaderboard.update();
    this.leaderboard.draw(ctx);

    this.fortuneWheel.draw(ctx);

    this.messageWindows.sort(this.tSort);

    for (let i = 0; i < this.messageWindows.length; i++) {

      this.messageWindows[i].draw(ctx);

      if (i === this.messageWindows.length - 1) {
        this.messageWindows[i].responsive = true;
      } else {
        this.messageWindows[i].responsive = false;
      }

      this.msgWindowActive = this.messageWindows[i].active;
    }

    if (this.botwindow.alpha.val > 0) {
      ctx.save();
      ctx.globalAlpha = this.botwindow.alpha.val;

      ctx.save();
      ctx.translate(this.botwindow.buttons[0].x + 20, this.botwindow.buttons[0].y);
      let _s = animate(.1, 700, 1, Math.PI / 2, 0);
      ctx.scale(_s, _s);
      uiElem.arm.draw(ctx, 0, 0, 2);
      ctx.restore();

      let _y = accordingToWidth == true ? CANVASHEIGHT + moveAmt : CANVASHEIGHT;
      ctx.translate(190, _y);
      ctx.scale(1, 1);
      ctx.drawImage(mascotImg, -1.9 * (mascotImg.width / 8.5), -.75 * (mascotImg.height / 8.5), mascotImg.width / 8.5, mascotImg.height / 8.5);

      ctx.restore();
    }

    this.mascot.draw(ctx);

    ctx.drawAnimatedBlackScreen(onBlackScreenCompletion);

  }

}
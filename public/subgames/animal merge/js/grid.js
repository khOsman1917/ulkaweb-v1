// "use strict";

class Grid {
  constructor(city, bTile, aTile) {
    this.x = CANVASWIDTH / 2;
    this.y = CANVASHEIGHT / 2 - 30;

    this.city = city;

    this.gridLeft = null;
    this.gridRight = null;
    this.gridTop = null;
    this.gridBottom = null;

    this.cellDimen = 80;

    // initial map
    this.BASE_TILE = bTile;

    // gradual development of the map at each new level
    this.ADD_TILE_PATH = aTile;

    this.tiles = [];

    /*
       VALUE MEANING
       --------------
       -3 = EMPTY Tile, -2 = Has BOX, -1 = Has GIFT, [0 - 39] = Has BUILDING indexed 0 - 39
    */

    this.responsive = true;
    this.selectedVal = -5;
    this.selected = -5;
    this.next = -5;

    this.checkVal = -1;
    this.resell = false;
    this.hasBox = false;

    this.lbCount = 0;

    this.particle = [];

    this.generateBaseTiles();

  }

  setBuildingToTile() {
    let tileData = GAME_DATA[this.city].tiledata;
    if (tileData[0]) this.cellDimen = tileData[0].w;
    for (let i = 0; i < tileData.length; i++) {
      let t = this.tiles[tileData[i].i];
      t.set(tileData[i].x, tileData[i].y, tileData[i].w);
      // t.x = tileData[i].x; t.y = tileData[i].y;
      t.val = tileData[i].val;
      if (tileData[i].val > -3) t.building = new Building(t.x, t.y);
    }
  }

  generateBaseTiles() {
    for (let i = 0; i < this.BASE_TILE.length; i++) {
      this.tiles.unshift(new Tile(-3));
      // this.tiles.push(new Tile(-3));
      if (i === this.BASE_TILE.length - 1) this.setBuildingToTile();
    }

  }

  checkNewTile(newT, oldT) {
    if (newT[0] === oldT[0] && newT[1] === oldT[1]) {
      return true;
    }
    return false;
  }

  setTileData(city) {
    if (this.city === city) {
      let tile = [];
      for (let i = 0; i < this.tiles.length; i++) {
        let tdata = {
          "i": i,
          "x": this.tiles[i].x,
          "y": this.tiles[i].y,
          "val": this.tiles[i].val,
          "w": this.cellDimen
        };

        tile.push(tdata);
      }

      GAME_DATA[this.city].buildingnum = GAME.currentState.playGBuildings;
      GAME_DATA[this.city].bTile = this.BASE_TILE.slice(0);
      GAME_DATA[this.city].aTile = this.ADD_TILE_PATH.slice(0);
      GAME_DATA[this.city].tiledata = tile.slice(0);

      window.localStorage.setItem("JungleMergeGameData", JSON.stringify(GAME_DATA));
      GAME.currentState.dataSaved = true;

    }
  }

  unlockNewTile() {
    if (this.ADD_TILE_PATH.length > 0) {
      let newTile = this.ADD_TILE_PATH.splice(0, 1);

      if (this.BASE_TILE.length >= 15 && this.BASE_TILE.length <= 24) {
        this.BASE_TILE.unshift(newTile[0]);
        this.tiles.unshift(new Tile(-3));
      } else {
        this.BASE_TILE.push(newTile[0]);
        this.tiles.push(new Tile(-3));
      }

      if (this.checkNewTile(newTile[0], [0, -1]) || this.checkNewTile(newTile[0], [0, 2]) || this.checkNewTile(newTile[0], [0, -2]) || this.checkNewTile(newTile[0], [2, 0]) ||
        this.checkNewTile(newTile[0], [-2, 0]) || this.checkNewTile(newTile[0], [0, 3]) || this.checkNewTile(newTile[0], [0, -3]) || this.checkNewTile(newTile[0], [0, 4])) {

        this.cellDimen = map(this.BASE_TILE.length, 6, 36, 80, 50);
      }

      let sbuI = this.BASE_TILE.length - 5;

      GAME.currentState.shopB_Unlocked[sbuI] = true;

    }
  }

  setGridToCenter(x1, x2, y1, y2) {
    let w = (x2 - x1),
      h = (y2 - y1),

      xOff = (this.BASE_TILE.length >= 16 && this.BASE_TILE.length <= 20) ? this.cellDimen / 3 : /*(this.BASE_TILE.length > 20) ? 0 :*/ 0,

      diffX = x1 - (CANVASWIDTH - w) / 2 + (xOff * 1.5),
      diffY = y1 - (CANVASHEIGHT - h) / 2 + this.cellDimen;

    this.x = Math.floor(CANVASWIDTH / 2 - diffX);
    this.y = Math.floor(CANVASHEIGHT / 2 - diffY);
  }

  createFirelyParticle(b, c1, c2) {
    for (let i = 0; i < 30; i++) {
      if (GAME.currentState.particlePool.length > 0) {
        let state = GAME.currentState,
          __p = state.particlePool.pop(),
          w = b.w / 1.4,
          c = Math.random() > .5 ? c1 : c2;
        __p.set(b.x + Math.random() * w - w / 2, b.y + Math.random() * w / 2 - w / 3, 0, -Math.random() * w / 30 - w / 40, Math.random() * (w / 8) + w / 10, c + "1)", 200, true, false, .3, true, true, "rgba(255,255,255,.05)", w / 3, null, 0);
        state.particle.push(__p);
      }
    }
  }

  createBursParticle(b, c1, c2) {
    for (let i = 0; i < 10; i++) {
      if (GAME.currentState.particlePool.length > 0) {
        let state = GAME.currentState,
          __p = state.particlePool.pop(),
          w = b.w / 1.4,
          c = Math.random() > .5 ? c1 : c2;
        __p.set(b.x, b.y - w / 3, Math.random() * w / 15 - w / 30, Math.random() * w / 15 - w / 30, Math.random() * (w / 7) + w / 6, c + "1)", 200, true, true, .5, false, false, null, null, null, 0);
        state.particle.push(__p);
      }
    }
  }

  draw(ctx) {

    for (let i = 0, len = this.tiles.length; i < len; i++) {
      let xOff = this.BASE_TILE[i][0],
        yOff = this.BASE_TILE[i][1],
        x = this.x + this.cellDimen * xOff,
        y = this.y + this.cellDimen * yOff;

      // Calculate Grid's left, right, top, bootm to get the center value...

      if (!this.gridLeft || this.gridLeft > x - this.cellDimen / 2) {
        this.gridLeft = x - this.cellDimen / 2;
      }
      if (!this.gridRight || this.gridRight < x + this.cellDimen / 2) {
        this.gridRight = x + this.cellDimen / 2;
      }
      if (!this.gridTop || this.gridTop > y - this.cellDimen / 2) {
        this.gridTop = y - this.cellDimen / 2;
      }
      if (!this.gridBottom || this.gridBottom < y + this.cellDimen / 2) {
        this.gridBottom = y + this.cellDimen / 2;
      }

      if (this.tiles[i]) {
        this.tiles[i].set(x, y, this.cellDimen);

        let left = false,
          right = false,
          up = false,
          down = false;

        for (let j = 0; j < len; j++) {
          if (i !== j) {
            let x1 = this.tiles[i].x,
              y1 = this.tiles[i].y,
              x2 = this.tiles[j].x,
              y2 = this.tiles[j].y;

            if (distance(x1, x2, y1, y2) <= this.cellDimen) {
              if (x1 - x2 >= this.cellDimen) {
                left = true;
              }
              if (x1 - x2 <= -this.cellDimen) {
                right = true;
              }
              if (y1 - y2 >= this.cellDimen) {
                up = true;
              }
              if (y1 - y2 <= -this.cellDimen) {
                down = true;
              }
            }
          }
        }

        // draw the borders properly ... the assets are unhelpfull ...
        // /*if(GAME.currentState.city === 2)*/ this.drawBorder(x, y, left, right, up, down, ctx);

      }

    }
    // Calculate the current number of tiles and set everything to center ...
    this.setGridToCenter(this.gridLeft, this.gridRight, this.gridTop, this.gridBottom);

    let minCheck = [],
      __hasBox = false;
    // Draw the tiles separately, to avoid overlapping of the borders ...
    for (let i = 0, len = this.tiles.length; i < len; i++) {
      let tile = this.tiles[i];
      tile.draw(ctx); // UNEFFICIENT ... but works for now ..... :|

      if (tile.val >= 0) {
        minCheck.push(tile.val);
      } else if (tile.val === -2 || tile.val === -2.5 || tile.val === -1) {
        __hasBox = true;
      }

      if (this.responsive && tile.isClicked()) {
        if (GAME.currentState.screenPressed) {

          switch (tile.val) {
            case -2:
              tile.val = 0;
              this.createFirelyParticle(tile, "rgba(222, 140, 0,", "rgba(253, 229, 11,");
              if (GAME_DATA[3].sound) unboxSound.play();
              break;
            case -2.5:
              tile.val = 1;
              this.createFirelyParticle(tile, "rgba(222, 140, 0,", "rgba(253, 229, 11,");
              if (GAME_DATA[3].sound) unboxSound.play();
              break;
            case -1:
              let r = Math.random();
              if (r < .3) {
                this.generateX2reward(tile);
              } else if (r >= .3 && r < .7) {
                this.generateRandomGiftBuilding(tile);
              } else if (r >= .7) {
                this.generateCoinsreward(tile);
              }
              this.createFirelyParticle(tile, "rgba(190, 18, 135,", "rgba(255, 100, 200,");
              if (GAME_DATA[3].sound) unboxSound.play();
              break;
            default:
              if (tile.val >= 0 && this.selectedVal === -5 && this.selected === -1) {
                this.selectedVal = tile.val;
                tile.selected = true;
                this.selected = i;
              }
          }
        }
      }

      this.handleInputs(GAME.input, tile, i);
      // Not so unefficient anymore, is it ? ...

    }

    this.minMatchCheck(minCheck);

    this.hasBox = __hasBox;

    for (let i = 0, len = this.particle.length; i < len; i++) {
      if (this.particle[i].active) {
        this.particle[i].update();
        this.particle[i].draw(ctx);
      } else {
        let __p = this.particle.splice(i, 1);
        GAME.currentState.particlePool.push(__p[0]);
        len--;
        i--;
        //  break;
      }
    }
    // Draw the buildings separately, to avoid overlapping ...
    let moneyPerSec = 0;
    for (let i = 0, len = this.tiles.length; i < len; i++) {
      let bldn = this.tiles[i].building;
      if (bldn && !this.tiles[i].selected) bldn.draw(ctx);
      if (bldn && bldn.val >= 0) moneyPerSec += MoneyIncomes[this.city][bldn.val + 1];
    }
    GAME.currentState.moneyPerSec = moneyPerSec;

    // Show the selected Building image on drag ...
    if (this.selectedVal >= 0 && this.tiles[this.selected].building) this.tiles[this.selected].building.drawDrag(ctx, xDown, yDown);
  }

  minMatchCheck(minCheck) {
    this.checkVal = Math.min(...minCheck);

    if (minCheck.lastIndexOf(this.checkVal) === minCheck.indexOf(this.checkVal)) {
      let indx = minCheck.lastIndexOf(this.checkVal);
      minCheck.splice(indx, 1);
      this.checkVal = -1;
      if (minCheck.length > 1) {
        this.minMatchCheck(minCheck);
      } else {
        return;
      }
    } else {
      return;
    }
  }

  generateRandomGiftBuilding(tile) {
    let b = Math.floor(Math.random() * GAME.currentState.shopB_Unlocked.length);

    if (GAME.currentState.shopB_Unlocked[b] === true) {
      tile.val = b;
      GAME.currentState.giftWindow.set(GAME.currentState.buildings.Images[b][0]);
      GAME.currentState.giftWindow.func = function() {

        GAME.currentState.giftWindow.texts[1].text = "Free pet !";
        GAME.currentState.giftWindow.texts[1].y = CANVASHEIGHT / 2 + 80;
        GAME.currentState.giftWindow.texts[1].color = "rgb(50, 150, 200)";
        GAME.currentState.giftWindow.texts[1].size = 22;

        GAME.currentState.giftWindow.texts[2].text = GAME.currentState.buildings.Names[b];
        GAME.currentState.giftWindow.texts[2].size = GAME.currentState.buildings.Names[b].length > 15 ? 27 : 31;
        GAME.currentState.giftWindow.texts[2].y = CANVASHEIGHT / 2 + 120;
        GAME.currentState.giftWindow.texts[2].color = "gold";
        GAME.currentState.giftWindow.texts[2].stroke = "#8e3e00";
        GAME.currentState.giftWindow.texts[2].lw = 2;

        GAME.currentState.giftWindow.buttons[2].active = true;
        GAME.currentState.giftWindow.buttons[2].responsive = true;
      }

      GAME.currentState.giftWindow.buttons[0].active = false;
      GAME.currentState.giftWindow.buttons[1].active = false;

      GAME.currentState.giftWindow.fadeIn();
    } else {
      this.generateRandomGiftBuilding(tile);
    }
  }

  generateX2reward(tile) {
    tile.val = -3;
    tile.building.removeTweens();
    tile.building = null;

    GAME.currentState.playGBuildings--;
    GAME.currentState.giftWindow.set(uiElem.giftBonusX2);
    GAME.currentState.giftWindow.func = function() {
      GAME.currentState.giftWindow.texts[1].text = "Accelaration of pet";
      GAME.currentState.giftWindow.texts[1].y = CANVASHEIGHT / 2 + 80;
      GAME.currentState.giftWindow.texts[1].size = 22;
      GAME.currentState.giftWindow.texts[1].color = "rgb(50, 150, 200)";

      GAME.currentState.giftWindow.texts[2].text = "Speed X 2";
      GAME.currentState.giftWindow.texts[2].y = CANVASHEIGHT / 2 + 120;
      GAME.currentState.giftWindow.texts[2].size = 40;
      GAME.currentState.giftWindow.texts[2].color = "gold";
      GAME.currentState.giftWindow.texts[2].stroke = "#8e3e00";
      GAME.currentState.giftWindow.texts[2].lw = 2;

      GAME.currentState.giftWindow.buttons[2].active = true;
      GAME.currentState.giftWindow.buttons[2].responsive = true;
    }
    GAME.currentState.giftWindow.buttons[0].active = false;
    GAME.currentState.giftWindow.buttons[1].active = false;

    GAME.currentState.giftWindow.endCall = 1;
    GAME.currentState.giftWindow.fadeIn();

  }

  generateCoinsreward(tile) {
    tile.val = -3;
    tile.building.removeTweens();
    tile.building = null;

    GAME.currentState.playGBuildings--;
    GAME.currentState.giftWindow.set(uiElem.giftCoinBonus);
    GAME.currentState.giftWindow.func = function() {
      GAME.currentState.giftWindow.texts[1].text = "Bonus 5 minutes, during which";
      GAME.currentState.giftWindow.texts[1].y = CANVASHEIGHT / 2 + 90;
      GAME.currentState.giftWindow.texts[1].color = "grey";
      GAME.currentState.giftWindow.texts[1].size = 20;
      let m = GAME.currentState.moneyPerSec * 300;
      GAME.currentState.giftWindow.texts[2].text = "your income is " + numToString(m, "") + " coins.";
      GAME.currentState.giftWindow.texts[2].color = "grey";
      GAME.currentState.giftWindow.texts[2].y = CANVASHEIGHT / 2 + 115;
      GAME.currentState.giftWindow.texts[2].size = 20;
      GAME.currentState.giftWindow.texts[2].stroke = null;
      GAME.currentState.giftWindow.texts[2].lw = null;

      GAME.currentState.giftWindow.buttons[2].active = false;
      GAME.currentState.giftWindow.buttons[0].active = true;
      GAME.currentState.giftWindow.buttons[0].responsive = true;
      GAME.currentState.giftWindow.buttons[1].active = true;
      GAME.currentState.giftWindow.buttons[1].responsive = true;
      GAME.currentState.giftWindow.buttons[1].x = CANVASWIDTH / 2 + 94;
    }
    GAME.currentState.giftWindow.endCall = 2;
    GAME.currentState.giftWindow.fadeIn();

  }

  _swap() {
    this.tiles[this.selected].val = this.tiles[this.selected].val + this.tiles[this.next].val;
    this.tiles[this.next].val = this.tiles[this.selected].val - this.tiles[this.next].val;
    this.tiles[this.selected].val = this.tiles[this.selected].val - this.tiles[this.next].val;
    if (GAME_DATA[3].sound) swapSound.play();
  }

  handleInputs(input, tile, i) {
    if (input.isDown("enter")) {
      // Check for continious screen touch and keep track of next tile ...
      if (xDown >= tile.x - tile.w / 2 && xDown <= tile.x + tile.w / 2 &&
        yDown >= tile.y - tile.w / 2 && yDown <= tile.y + tile.w / 2 && !tile.selected) {
        tile.next = true;
        this.next = i;
        this.resell = false;
      } else {
        tile.next = false;
        if (GAME.currentState.gameButtonz["storeBtn"].isClicked()) {
          this.resell = true;
        }
      }

      // For helper indication only ...
      if (tile.val === this.selectedVal) {
        tile.isSame = true;
      } else {
        tile.isSame = false;
      }

      // this.checkVal = -1;
    } else {
      if (this.particle.length < 1) {
        if (this.checkVal >= 0 && tile.val === this.checkVal) {
          tile.isSame = true;
        } else {
          tile.isSame = false;
        }
      }
    }

    if (GAME.currentState.screenLeft) {
      if (this.selected >= 0 && this.next >= 0 && !this.resell) {
        if (this.tiles[this.next].val === this.tiles[this.selected].val && this.tiles[this.next].val < 36) {
          // Merge, subtract Building Count ...
          this.tiles[this.next].val++;
          this.tiles[this.next].building.mergeAnim();

          if (GAME.currentState.newB_Unlocked[this.tiles[this.next].val] === false) {
            GAME.currentState.newB_Unlocked[this.tiles[this.next].val] = true;
            GAME.currentState.newBuilding.set(GAME.currentState.buildings.Images[this.tiles[this.next].val][0]);
            GAME.currentState.newBuilding.texts[1].text = GAME.currentState.buildings.Names[this.tiles[this.next].val];
            GAME.currentState.newBuilding.fadeIn();
            if (GAME_DATA[3].sound) newBuildingSound.play();
          }
          // this.tiles[this.selected].val = -3;
          // this.tiles[this.selected].building.removeTweens();
          // this.tiles[this.selected].building = null;
          //
          // GAME.currentState.playGBuildings--;

          this.removeAsset(this.selected);

          if (GAME_DATA[3].sound) mergeSound.play();

        } else if (this.tiles[this.next].val === -3 && this.tiles[this.selected].val > -3) {
          // Swap, take care of null value ...
          this._swap();
          this.tiles[this.next].building = this.tiles[this.selected].building;
          this.tiles[this.selected].building = null;
        } else {
          // just swap ...
          this._swap();
          // and then also swap the pets ...|:(
          let b = this.tiles[this.next].building;
          this.tiles[this.next].building = this.tiles[this.selected].building;
          this.tiles[this.selected].building = b;
        }

      } else if (this.resell && this.selected >= 0) {
        let money = GAME.currentState.shopWindow.btnTxtz[this.tiles[this.selected].val] / 1.15,
          btnPos = GAME.currentState.gameButtonz["storeBtn"];
        GAME.currentState.generateEarnedCoins(btnPos.x, btnPos.y, money / 10);
        this.removeAsset(this.selected);
        if (GAME.currentState.aniNumPool.length > 0) {
          let a = GAME.currentState.aniNumPool.pop();
          a.set(btnPos.x, btnPos.y - 25, "+ " + numToString(money, 0, 1), .01, -7, 15);
          GAME.currentState.aniNum.push(a);
        }
      }
      // Reset everything after screen is untouched ...
      this.selectedVal = -5;
      tile.selected = false;
      tile.next = false;
      tile.isSame = false;
      this.selected = -1;
      this.next = -1;
      this.resell = false;
    }
  }

  removeAsset(index) {
    this.tiles[index].val = -3;
    this.tiles[index].building.removeTweens();
    this.tiles[index].building = null;

    GAME.currentState.playGBuildings--;
  }
}
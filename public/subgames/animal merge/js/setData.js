// "use strict";

function setUpData(func) {

  let newB_Unlocked = [true];
  for (let i = 1; i < 40; i++) {
    newB_Unlocked.push(false);
  }
  let shopB_Unlocked = [true, true];
  for (let i = 2; i < 40; i++) {
    shopB_Unlocked.push(false);
  }
  let bTile = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, 1],
      [-1, 1],
      [1, 1]
    ],

    aTile = [
      [0, -1],
      [-1, -1],
      [1, -1],
      [0, 2],
      [-1, 2],
      [1, 2],
      [0, -2],
      [-1, -2],
      [1, -2],
      [2, 0],
      [2, -1],
      [2, -2],
      [2, 1],
      [2, 2],
      [-2, 0],
      [-2, -1],
      [-2, -2],
      [-2, 1],
      [-2, 2],
      [0, 3],
      [-1, 3],
      [-2, 3],
      [1, 3],
      [2, 3],
      [0, -3],
      [-1, -3],
      [-2, -3],
      [1, -3],
      [2, -3],
      [0, 4],
      [-1, 4]

    ], //, [-2,  4], [ 1,  4], [ 2,  4]

    lp = new Date().getTime();

  let gData = [ // this will be saved in memory ...
    {
      "money": 0,
      "moneyPerSec": 0,
      "currentExp": 0,
      "level": 1,
      "buildingnum": 0,
      "newB_Unlocked": newB_Unlocked.slice(0),
      "shopB_Unlocked": shopB_Unlocked.slice(0),
      "storePrice": StorePrices[0].slice(0),
      "bTile": bTile.slice(0),
      "aTile": aTile.slice(0),
      "tiledata": [],
      "giftCount": 0,
      "lastPlay": lp
    },
    {
      "money": 0,
      "moneyPerSec": 0,
      "currentExp": 0,
      "level": 1,
      "buildingnum": 0,
      "newB_Unlocked": newB_Unlocked.slice(0),
      "shopB_Unlocked": shopB_Unlocked.slice(0),
      "storePrice": StorePrices[1].slice(0),
      "bTile": bTile.slice(0),
      "aTile": aTile.slice(0),
      "tiledata": [],
      "giftCount": 0,
      "lastPlay": lp
    },
    {
      "money": 0,
      "moneyPerSec": 0,
      "currentExp": 0,
      "level": 1,
      "buildingnum": 0,
      "newB_Unlocked": newB_Unlocked.slice(0),
      "shopB_Unlocked": shopB_Unlocked.slice(0),
      "storePrice": StorePrices[2].slice(0),
      "bTile": bTile.slice(0),
      "aTile": aTile.slice(0),
      "tiledata": [],
      "giftCount": 0,
      "lastPlay": lp
    },
    {
      "currentCity": 0,
      "sound": true,
      "music": true,
      "spinTkt": 0,
      "unboxTut": false,
      "swipeTut": false,
      "buildTut": false,
      "shopTut": false,
      "giftTut": false,
      "x2Tut": false,
      "spinTut": false
    }
  ];

  GAME_DATA = gData;

  window.localStorage.setItem("JungleMergeGameData", JSON.stringify(GAME_DATA));
  if (!GAME) initGame();

}
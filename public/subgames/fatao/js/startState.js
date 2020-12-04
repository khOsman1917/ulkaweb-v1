"use strict";

class StartState extends State {

  constructor(game) {
    super(game);

    if (window.localStorage.getItem("fatao_music")) {
      sfxValue = Number(window.localStorage.getItem("fatao_music"));
    } else {
      sfxValue = 1;
      window.localStorage.setItem("fatao_music", sfxValue);
    }

    if (window.localStorage.getItem("fatao_coins")) {
      totalCoins = Number(window.localStorage.getItem("fatao_coins"));
    } else {
      totalCoins = 0;
      window.localStorage.setItem("fatao_coins", totalCoins);
    }

    if (window.localStorage.getItem("fatao_best")) {
      bestScore = Number(window.localStorage.getItem("fatao_best"));
    } else {
      bestScore = 0;
      window.localStorage.setItem("fatao_best", bestScore);
    }

  }

  update() {}

  render(ctx) {
    ctx.drawBackground2("#000000");
  }

}
"use strict";

let PLAYER = {
    "name": null,
    "img": new Image(),
    "id": "",
    "score": 0
  },
  NEXTTARGET = {
    "name": null,
    "img": new Image(),
    "id": "",
    "score": 0
  },
  ENTRIES = [],
  OPPONENT = {
    "img": new Image(),
    "score": null
  };

PLAYER.img.crossOrigin = "anonymous";
NEXTTARGET.img.crossOrigin = "anonymous";
OPPONENT.img.crossOrigin = "anonymous";

function facebookShare(_url) {
  let url = "https://www.facebook.com/sharer/sharer.php?u=" + _url;
  let newWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
  window.open(url, "ULKA_WINDOW", newWindowFeatures);
}

function drawTxt(ctx, txt, x, y) {
  ctx.fillStyle = "#FFFFFF";
  ctx.strokeStyle = "#ed1e79";

  ctx.lineWidth = 10;
  ctx.miterLimit = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.font = "120px 'Billo'";

  ctx.textAlign = "center";
  ctx.strokeText(txt, x, y);

  ctx.fillText(txt, x, y);
}

function generateBaseImage(userImg1, userImg2, userScore1, userScore2, callBack) {

  let img = new Image();
  img.crossOrigin = "anonymous";
  img.src = BASE64IMAGE;

  img.onload = () => {
    let offCanvas = document.getElementById("offscreenCanvas");
    offCanvas.style.width = 1702 + "px";
    offCanvas.style.height = 830 + "px";
    offCanvas.width = 1702;
    offCanvas.height = 830;
    let context = offCanvas.getContext("2d");

    if (img.width > 0) context.drawImage(img, -180, 0, offCanvas.width + 400, offCanvas.height);
    drawRoundImage(context, userImg1, 300, offCanvas.width / 2 - 550, offCanvas.height / 2 - 10);
    drawRoundImage(context, userImg2, 300, offCanvas.width / 2 + 550, offCanvas.height / 2 - 10);

    drawTxt(context, userScore1, offCanvas.width / 2 - 550, offCanvas.height / 2 + 250);
    drawTxt(context, userScore2, offCanvas.width / 2 + 550, offCanvas.height / 2 + 250);

    callBack(offCanvas.toDataURL("image/png"));
  };

}
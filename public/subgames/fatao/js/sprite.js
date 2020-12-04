"use strict";

function Sprite(img, x, y, width, height) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

Sprite.prototype.draw = function(ctx, x, y, n, w, h) {

  if (w && h && this.img.width > 0) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, w, h);
    return;
  }
  if (!n) {
    var n = 1;
  }
  if (this.img.width > 0) ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width / n, this.height / n);
};

function extractAssets(img, _callback) {

  _btnPause = new Sprite(img, 822 * 2, 196 * 2, 74 * 2, 84 * 2);

  _coin = new Sprite(img, 676 * 2, 212 * 2, 54 * 2, 54 * 2);

  _chars = [
    new Sprite(img, 160 * 2, 1098 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 780 * 2, 1098 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 6 * 2, 1098 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 316 * 2, 1098 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 470 * 2, 1098 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 626 * 2, 1098 * 2, 156 * 2, 148 * 2),

    new Sprite(img, 160 * 2, 945 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 780 * 2, 945 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 6 * 2, 945 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 316 * 2, 945 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 470 * 2, 945 * 2, 156 * 2, 148 * 2),
    new Sprite(img, 626 * 2, 945 * 2, 156 * 2, 148 * 2)
  ];

  pUpLogos = [
    new Sprite(img, 52 * 2, 204 * 2, 66 * 2, 66 * 2),
    new Sprite(img, 206 * 2, 204 * 2, 66 * 2, 66 * 2),
    new Sprite(img, 360 * 2, 204 * 2, 66 * 2, 66 * 2),
    new Sprite(img, 514 * 2, 204 * 2, 66 * 2, 66 * 2)
  ];

  pUpIcons = [
    new Sprite(img, 364 * 2, 354 * 2, 58 * 2, 74 * 2),
    new Sprite(img, 518 * 2, 354 * 2, 58 * 2, 74 * 2),
    new Sprite(img, 673 * 2, 354 * 2, 58 * 2, 74 * 2),
    new Sprite(img, 828 * 2, 354 * 2, 58 * 2, 74 * 2),
    new Sprite(img, 53 * 2, 508 * 2, 58 * 2, 74 * 2)
  ];

  _circles = [
    new Sprite(img, 45 * 2, 46 * 2, 76 * 2, 76 * 2),
    new Sprite(img, 200 * 2, 46 * 2, 76 * 2, 76 * 2),
    new Sprite(img, 354 * 2, 46 * 2, 76 * 2, 76 * 2),
    new Sprite(img, 510 * 2, 46 * 2, 76 * 2, 76 * 2),
    new Sprite(img, 664 * 2, 46 * 2, 76 * 2, 76 * 2),
    new Sprite(img, 820 * 2, 46 * 2, 76 * 2, 76 * 2)
  ];

  _tutHand = new Sprite(img, 202 * 2, 344 * 2, 74 * 2, 98 * 2);
  _bullet = new Sprite(img, 980 * 2, 40 * 2, 74 * 2, 90 * 2);
  // _bullet = new Sprite(img, 980*2, 497*2, 74*2, 90*2);

  _callback();

}

function extractAssetsTwo(img, _callback) {
  _bgs = [
    new Sprite(img, 24, 28, 644, 1148),
    new Sprite(img, 740, 28, 644, 1148),
    new Sprite(img, 1456, 28, 644, 1148),
    new Sprite(img, 2168, 28, 644, 1148)
  ];

  _callback();
}
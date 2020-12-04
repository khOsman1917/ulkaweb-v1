"use strict";

var _game, animation = true, width = window.innerWidth,
    height = window.innerHeight, s = 1, scale = 1, PIXELRATIO = window.devicePixelRatio || 1,
    canvas, canvasWidth = 360, canvasHeight = 640, mainHeight = 0, accordingToWidth = true,
    backgroundY = 0, screenX = null, screenY = null, bestScore = 0,
    frames = 0, picsToLoad = 0, downAmt = 0, moveAmt = 0, totalCoins = 0,
    startTime = 0, translateX = 0, translateY = 0, tutorialShown = 0, gamePaused = false,
	  playerEmail, playerName, playerImage = new Image(), p1 = new Image(), p2 = new Image(),
	  p3 = new Image(), p4 = new Image(), p5 = new Image(), vibrateCon = 1, underChallange = false,
	  bgIndex = 0, bgIndexPrev = 0, gameBGalpha = -1, bgAlphaDec = 1, sfxValue = 1, newChallange = false,
    blackScreenAlphaDec = true, blackScreenAlpha = 1, blackScreenAlphaInc = false, onBlackScreenCompletion = null,
    entryPointCheck = false;

var	currentstate = 0, TIMES = [], FPS;

var _btnPause, _coin, _chars = [],
  pUpLogos = [],
  pUpIcons = [],
  _circles = [],
  _tutHand, _bullet, _bgs = [];

var Engine, World, Bodies, Body, Common,
    _engine, _world;

var States = {
    NO_CHANGE: 0,
  	START: 1,
  	MENU: 2,
  	GAME: 3
};

var shootM, shootM2, hitM, coinM, bossEnd, multi;

function norm(value, min, max){
   return (value - min) / (max - min);
}

function lerp(norm, min, max){
   return (max - min) * norm + min;
}

function map(value, sourceMin, sourceMax, destMin, destMax){
   return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

function animate(amplitude, period, center, phase) {
   return amplitude * Math.sin(((new Date()).getTime() - startTime) * 2 * Math.PI / period + phase) + center;
}

function rangeIntersect(min0, max0, min1, max1){
   return Math.max(min0, max0) >= Math.min(min1, max1) &&
          Math.min(min0, max0) <= Math.max(min1, max1);
}

function rectIntersect(r0, r1){
   return rangeIntersect(r0.x, r0.x+r0.w, r1.x, r1.x+r1.w) &&
          rangeIntersect(r0.y, r0.y+r0.h, r1.y, r1.y+r1.h);
}

function distance(x1, x2, y1, y2){
    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

function numToString(num){
    let str = "";
    if(num < 1000) str = num;
    if(num >= 1000 && num < 1000000) str = (num / 1000).toFixed(2)+" K";
    if(num >= 1000000 && num < 1000000000) str = (num / 1000000).toFixed(2)+" M";
    if(num >= 1000000000) str = (num / 1000000000).toFixed(2)+" B";

    return str;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function drawRoundImage(ctx, image, size, x, y){
   ctx.save();
   ctx.beginPath();
   ctx.arc(x, y, size/2, 0, 2*Math.PI);
   ctx.clip();
   if(image.width > 0) ctx.drawImage(image, x - size/2, y - size/2, size, size);
   ctx.restore();
}
